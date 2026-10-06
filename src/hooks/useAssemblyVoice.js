import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import { getAssemblyToken } from "../api/assemblyAI.js";

const SAMPLE_RATE = 16000;
const CHUNK_SIZE_MS = 100;

const ASSEMBLY_URL =
    "wss://streaming.assemblyai.com/v3/ws";

export default function useAssemblyVoice({
    isListening,
    onPartialTranscript,
    onFinalTranscript,
    onError,
}) {
    const assemblySocketRef = useRef(null);

    const mediaStreamRef = useRef(null);
    const audioContextRef = useRef(null);
    const sourceRef = useRef(null);
    const processorRef = useRef(null);
    const silentGainRef = useRef(null);

    const hasAudioSinceEndpointRef = useRef(false);

    const callbacksRef = useRef({
        onPartialTranscript,
        onFinalTranscript,
        onError,
    });

    const pendingFlushRef = useRef(null);

    useEffect(() => {
        callbacksRef.current = {
            onPartialTranscript,
            onFinalTranscript,
            onError,
        };
    }, [
        onPartialTranscript,
        onFinalTranscript,
        onError,
    ]);

    const resolvePendingFlush = useCallback(() => {
        const pending = pendingFlushRef.current;

        if (!pending) {
            return;
        }

        clearTimeout(pending.timeout);

        pending.resolve();

        pendingFlushRef.current = null;
    }, []);

    const createAssemblyConnection = useCallback(
        async () => {
            if (
                assemblySocketRef.current &&
                (
                    assemblySocketRef.current.readyState ===
                        WebSocket.OPEN ||
                    assemblySocketRef.current.readyState ===
                        WebSocket.CONNECTING
                )
            ) {
                if (
                    assemblySocketRef.current.readyState ===
                    WebSocket.CONNECTING
                ) {
                    await new Promise((resolve, reject) => {
                        const ws =
                            assemblySocketRef.current;

                        const previousOpen =
                            ws.onopen;

                        const previousError =
                            ws.onerror;

                        ws.addEventListener(
                            "open",
                            () => resolve(),
                            { once: true }
                        );

                        ws.addEventListener(
                            "error",
                            (error) =>
                                reject(error),
                            { once: true }
                        );
                    });
                }

                return assemblySocketRef.current;
            }

            const token =
                await getAssemblyToken();

            const url =
                `${ASSEMBLY_URL}` +
                `?sample_rate=${SAMPLE_RATE}` +
                `&encoding=pcm_s16le` +
                `&speech_model=universal-3-6-pro` +
                `&format_turns=true` +
                `&continuous_partials=true` +
                `&token=${encodeURIComponent(token)}`;

            const ws = new WebSocket(url);

            assemblySocketRef.current = ws;

            await new Promise((resolve, reject) => {
                ws.onopen = () => {
                    console.log(
                        "AssemblyAI connected"
                    );

                    resolve();
                };

                ws.onerror = (error) => {
                    console.error(
                        "AssemblyAI error:",
                        error
                    );

                    callbacksRef.current
                        .onError?.(
                            "Unable to connect to AssemblyAI."
                        );

                    reject(error);
                };
            });

            ws.onmessage = (event) => {
                try {
                    const data =
                        JSON.parse(event.data);

                    if (data.type === "Begin") {
                        console.log(
                            "AssemblyAI session:",
                            data.id
                        );

                        return;
                    }

                    if (data.type !== "Turn") {
                        return;
                    }

                    const transcript =
                        data.transcript?.trim();

                    if (!transcript) {
                        return;
                    }

                    if (!data.end_of_turn) {
                        callbacksRef.current
                            .onPartialTranscript?.(
                                transcript
                            );

                        return;
                    }

                    callbacksRef.current
                        .onFinalTranscript?.(
                            transcript
                        );

                    hasAudioSinceEndpointRef.current =
                        false;

                    resolvePendingFlush();

                } catch (error) {
                    console.error(
                        "Invalid AssemblyAI message:",
                        error
                    );
                }
            };

            ws.onerror = (error) => {
                console.error(
                    "AssemblyAI WebSocket error:",
                    error
                );

                callbacksRef.current
                    .onError?.(
                        "AssemblyAI connection error."
                    );
            };

            ws.onclose = (event) => {
                console.log(
                    "AssemblyAI closed:",
                    event.code,
                    event.reason
                );

                assemblySocketRef.current = null;

                resolvePendingFlush();
            };

            return ws;
        },
        [resolvePendingFlush]
    );

    const startMicrophone = useCallback(
        async () => {
            if (mediaStreamRef.current) {
                return;
            }

            try {
                await createAssemblyConnection();

                const stream =
                    await navigator.mediaDevices
                        .getUserMedia({
                            audio: {
                                channelCount: 1,
                                echoCancellation: true,
                                noiseSuppression: true,
                                autoGainControl: true,
                            },
                        });

                mediaStreamRef.current = stream;

                /*
                 * Ask the browser for a 16 kHz context.
                 * The AudioWorklet also explicitly resamples
                 * if the browser chooses another context rate.
                 */
                const audioContext =
                    new AudioContext({
                        sampleRate: SAMPLE_RATE,
                    });

                audioContextRef.current =
                    audioContext;

                console.log(
                    "AudioContext sample rate:",
                    audioContext.sampleRate
                );

                if (
                    audioContext.state ===
                    "suspended"
                ) {
                    await audioContext.resume();
                }

                await audioContext.audioWorklet.addModule(
                    "/audio-processor.js"
                );

                const source =
                    audioContext.createMediaStreamSource(
                        stream
                    );

                sourceRef.current = source;

                const processor =
                    new AudioWorkletNode(
                        audioContext,
                        "pcm-processor"
                    );

                processorRef.current =
                    processor;

                processor.port.onmessage = (
                    event
                ) => {
                    const ws =
                        assemblySocketRef.current;

                    if (
                        !ws ||
                        ws.readyState !==
                            WebSocket.OPEN
                    ) {
                        return;
                    }

                    hasAudioSinceEndpointRef.current =
                        true;

                    ws.send(event.data);
                };

                /*
                 * Keep the AudioWorklet alive without
                 * playing microphone audio to the user.
                 */
                const silentGain =
                    audioContext.createGain();

                silentGain.gain.value = 0;

                silentGainRef.current =
                    silentGain;

                source.connect(processor);
                processor.connect(silentGain);
                silentGain.connect(
                    audioContext.destination
                );

                console.log(
                    "Microphone started"
                );
            } catch (error) {
                console.error(
                    "Unable to start microphone:",
                    error
                );

                callbacksRef.current
                    .onError?.(
                        error?.message ||
                            "Microphone permission was denied or unavailable."
                    );

                /*
                 * Clean up if microphone setup failed.
                 */
                stopMicrophone();
            }
        },
        [createAssemblyConnection]
    );

    const forceEndpoint = useCallback(() => {
        const ws =
            assemblySocketRef.current;

        if (
            !ws ||
            ws.readyState !== WebSocket.OPEN
        ) {
            return Promise.resolve();
        }

        if (
            !hasAudioSinceEndpointRef.current
        ) {
            return Promise.resolve();
        }

        if (pendingFlushRef.current) {
            return pendingFlushRef.current.promise;
        }

        const promise = new Promise(
            (resolve) => {
                const timeout =
                    setTimeout(() => {
                        pendingFlushRef.current =
                            null;

                        resolve();
                    }, 2000);

                pendingFlushRef.current = {
                    resolve,
                    timeout,
                };
            }
        );

        ws.send(
            JSON.stringify({
                type: "ForceEndpoint",
            })
        );

        return promise;
    }, []);

    const stopMicrophone = useCallback(
        async () => {
            /*
             * Stop capturing new audio first.
             */
            if (processorRef.current) {
                processorRef.current.port.onmessage =
                    null;

                processorRef.current.disconnect();

                processorRef.current = null;
            }

            if (sourceRef.current) {
                sourceRef.current.disconnect();

                sourceRef.current = null;
            }

            if (silentGainRef.current) {
                silentGainRef.current.disconnect();

                silentGainRef.current = null;
            }

            if (mediaStreamRef.current) {
                mediaStreamRef.current
                    .getTracks()
                    .forEach((track) =>
                        track.stop()
                    );

                mediaStreamRef.current = null;
            }

            if (audioContextRef.current) {
                try {
                    await audioContextRef.current
                        .close();
                } catch {
                    // Already closed.
                }

                audioContextRef.current =
                    null;
            }

            /*
             * Important:
             *
             * Do NOT close AssemblyAI here.
             *
             * Force the current speech turn to finalize,
             * then keep the WebSocket alive so the user can
             * turn the microphone on again.
             */
            await forceEndpoint();

            console.log(
                "Microphone stopped; AssemblyAI session remains open."
            );
        },
        [forceEndpoint]
    );

    const closeVoiceSession =
        useCallback(async () => {
            await stopMicrophone();

            const ws =
                assemblySocketRef.current;

            if (!ws) {
                return;
            }

            if (
                ws.readyState ===
                WebSocket.OPEN
            ) {
                /*
                 * AssemblyAI requires Terminate when
                 * the streaming session is actually done.
                 */
                ws.send(
                    JSON.stringify({
                        type: "Terminate",
                    })
                );
            }

            ws.close();

            assemblySocketRef.current = null;

            resolvePendingFlush();

            console.log(
                "AssemblyAI voice session closed."
            );
        }, [
            stopMicrophone,
            resolvePendingFlush,
        ]);

    /*
     * Redux controls only microphone capture.
     *
     * The AssemblyAI WebSocket is intentionally kept
     * alive when isListening becomes false.
     */
    useEffect(() => {
        if (isListening) {
            startMicrophone();
        } else {
            stopMicrophone();
        }

        return undefined;
    }, [
        isListening,
        startMicrophone,
        stopMicrophone,
    ]);

    /*
     * Clean up everything when Interview unmounts.
     */
    useEffect(() => {
        return () => {
            /*
             * Do not await in React cleanup.
             */
            closeVoiceSession();
        };
    }, [closeVoiceSession]);

    return {
        closeVoiceSession,
        forceEndpoint,
        stopMicrophone,
    };
}
