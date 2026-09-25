import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";


// SOCKET.IO


const socket = io("http://localhost:3100", {
    withCredentials: true,
    autoConnect: false,
});


// SPEECH RECOGNITION


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


function MockInterview3() {

    const navigate = useNavigate();

    const { id } = useParams();
    console.log(id)



    // STATES

    // Internet
    const [internetStatus, setInternetStatus] = useState(navigator.onLine);


    // Backend / Socket
    const [serverStatus, setServerStatus] = useState("checking");


    // Microphone
    const [microphoneStatus, setMicrophoneStatus] = useState("not-checked");

    const [microphoneMessage, setMicrophoneMessage] = useState("");


    // Voice test
    const [voiceTestStatus, setVoiceTestStatus] = useState("not-started");

    const [transcript, setTranscript] =  useState("");

    const [voiceMessage, setVoiceMessage] =   useState("");


    // Starting interview
    const [starting, setStarting] = useState(false);



    // REFS


    // Microphone MediaStream
    const microphoneStream = useRef(null);


    // SpeechRecognition instance
    const recognitionRef = useRef(null);


    // INTERNET CONNECTION CHECK

    useEffect(() => {

        const handleOnline = () => {

            console.log("Internet connected" );

            setInternetStatus(true);
        };


        const handleOffline = () => {

            console.log("Internet disconnected" );

            setInternetStatus(false);
        };


        window.addEventListener("online", handleOnline);

        window.addEventListener("offline",handleOffline);


        return () => {

            window.removeEventListener("online",handleOnline);

            window.removeEventListener( "offline",handleOffline);
        };

    }, []);

    // SOCKET.IO / BACKEND CONNECTION

    useEffect(() => {

        setServerStatus("checking");

        socket.connect();


        const handleConnect = () => {

            console.log("Socket connected:",socket.id );

            setServerStatus("connected");
        };


        const handleDisconnect = () => {

            console.log("Socket disconnected");

            setServerStatus("disconnected");
        };


        const handleConnectError = (error) => {

            console.error("Socket connection error:",error);

            setServerStatus("error");
        };


        socket.on(
            "connect",
            handleConnect
        );

        socket.on(
            "disconnect",
            handleDisconnect
        );

        socket.on(
            "connect_error",
            handleConnectError
        );


        // Socket may already be connected
        if (socket.connected) {

            setServerStatus(
                "connected"
            );
        }


        return () => {

            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "disconnect",
                handleDisconnect
            );

            socket.off(
                "connect_error",
                handleConnectError
            );

            socket.disconnect();
        };

    }, []);


    // STOP MICROPHONE

    const stopMicrophone = () => {

        if (microphoneStream.current) {

            microphoneStream.current
                .getTracks()
                .forEach((track) => {

                    track.stop();

                });

            microphoneStream.current = null;
        }
    };


    // STOP SPEECH RECOGNITION


    const stopSpeechRecognition = () => {

        if (recognitionRef.current) {

            try {

                recognitionRef.current.stop();

            } catch (error) {

                console.log(
                    "Speech recognition already stopped."
                );
            }

            recognitionRef.current = null;
        }
    };


    // MICROPHONE CHECK
  

    const checkMicrophone = async () => {

        try {

            // Reset voice test because microphone
            // is being tested again
            setVoiceTestStatus(
                "not-started"
            );

            setTranscript("");

            setVoiceMessage("");


            setMicrophoneStatus(
                "checking"
            );

            setMicrophoneMessage(
                "Requesting microphone permission..."
            );


            // Check browser support


            if (!navigator.mediaDevices ||!navigator.mediaDevices.getUserMedia) {

                throw new Error(
                    "Microphone access is not supported by this browser."
                );
            }

            // Stop previous microphone
          

            stopMicrophone();

            // Request microphone
           

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });


            // Save stream
            microphoneStream.current = stream;


          
            // Check audio tracks

            const audioTracks = stream.getAudioTracks();


            if (audioTracks.length === 0) {

                throw new Error(
                    "No microphone was detected."
                );
            }


            const microphone = audioTracks[0];


            console.log("Microphone:",microphone.label);


            // Success

            setMicrophoneStatus("connected");

            setMicrophoneMessage(`Microphone is ready: ${microphone.label}` );


        } catch (error) {

            console.error("Microphone check failed:",error );


            setMicrophoneStatus("error");


            if (error.name === "NotAllowedError" ) {

                setMicrophoneMessage(
                    "Microphone permission was denied. Please allow microphone access in your browser."
                );

            } else if (error.name === "NotFoundError" ) {

                setMicrophoneMessage(
                    "No microphone was found on this device."
                );

            } else if (error.name === "NotReadableError") {

                setMicrophoneMessage(
                    "The microphone is already being used by another application."
                );

            } else {

                setMicrophoneMessage(error.message ||"Unable to access microphone." );
            }


            stopMicrophone();
        }
    };


    // TEST VOICE


    const testVoice = () => {

        // Check browser support
   
        if (!SpeechRecognition) {

            setVoiceTestStatus( "error" );

            setVoiceMessage( "Speech recognition is not supported in this browser. Please use Google Chrome." );

            return;
        }

        // Check microphone

        if ( microphoneStatus !== "connected") {

            setVoiceTestStatus( "error");

            setVoiceMessage("Please test your microphone first.");

            return;
        }


        // Stop previous recognition
        
        stopSpeechRecognition();


     
        // Create recognition
       

        const recognition = new SpeechRecognition();


        recognitionRef.current = recognition;


     
        // Configuration
     

        recognition.continuous = false;

        recognition.interimResults = true;

        recognition.lang = "en-US";


      
        // Reset UI
        
        setTranscript("");

        setVoiceTestStatus( "listening");

        setVoiceMessage('Listening... Say: "Hello, this is a microphone test."');


        // Recognition started
    

        recognition.onstart = () => {

            console.log("Speech recognition started" );

            setVoiceTestStatus("listening" );
        };


     
        // Speech result

        recognition.onresult = (event) => {

            let finalTranscript = "";

            let interimTranscript = "";


            for ( let i = event.resultIndex;i < event.results.length; i++ ) {

                const text = event.results[i][0].transcript;


                if ( event.results[i].isFinal ) {

                    finalTranscript +=text;

                } else {
                     interimTranscript += text;
                }
            }


            const currentTranscript = finalTranscript || interimTranscript;


            setTranscript( currentTranscript);


            // Final speech received
          
            if (finalTranscript.trim()) {

                console.log( "Detected speech:",finalTranscript);


                setVoiceTestStatus("success");

                setVoiceMessage( "✓ Voice input is working correctly.");
            }
        };


        // Recognition error

        recognition.onerror = (event) => {

            console.error("Speech recognition error:", event.error);


            setVoiceTestStatus("error" );


            if ( event.error === "not-allowed" ) {

                setVoiceMessage("Speech recognition permission was denied.");

            } else if (event.error ===  "no-speech") {

                setVoiceMessage(  "No speech detected. Please try again.");

            } else if (  event.error ==="audio-capture" ) {

                setVoiceMessage( "Unable to capture audio from the microphone.");

            } else {

                setVoiceMessage(`Speech recognition error: ${event.error}` );
            }
        };

        // Recognition ended

        recognition.onend = () => {

            console.log("Speech recognition ended");

            recognitionRef.current = null;
        };


       
        // Start recognition

        try {

            recognition.start();

        } catch (error) {

            console.error(
                "Unable to start speech recognition:",
                error
            );


            setVoiceTestStatus(
                "error"
            );

            setVoiceMessage(
                "Unable to start voice test. Please try again."
            );

            recognitionRef.current = null;
        }
    };

    // CLEANUP
 
    useEffect(() => {

        return () => {

            stopMicrophone();

            stopSpeechRecognition();
        };

    }, []);


    // ALL CHECKS


    const allChecksPassed =
        internetStatus === true &&
        serverStatus === "connected" &&
        microphoneStatus === "connected" &&
        voiceTestStatus === "success";


    // START INTERVIEW


    const startInterview = async () => {

        // Check requirements

        if (!allChecksPassed) {

            return;
        }


        // Check interview ID
        

        if (!id) {

            console.error( "Interview ID is missing." );

            return;
        }

        // Enter fullscreen

        try {

            if (!document.fullscreenElement) {

                await document.documentElement.requestFullscreen();
            }

        } catch (error) {

            console.error("Fullscreen failed:", error);

            // We don't block the interview
            // if fullscreen is rejected.
        }


        // Stop preparation microphone

        stopMicrophone();

        stopSpeechRecognition();
      

        setStarting(true);


        console.log( "Starting interview:",id);


        navigate(
            `/mock-interview/${id}`
        );
    };


    // STATUS TEXT

    const getStatusText = (status) => {

        if (status === "connected" ) {

            return "✓ Ready";
        }


        if (status === "checking") {

            return "Checking...";
        }


        if ( status === "error" ) {

            return "✕ Failed";
        }


        if ( status === "disconnected" ) {

            return "✕ Disconnected";
        }


        if ( status === "not-checked" ) {

            return "Not checked";
        }


        return "Unknown";
    };


    // VOICE STATUS TEXT
   
    const getVoiceStatusText = () => {

        if (voiceTestStatus === "success" ) {

            return "✓ Voice Ready";
        }


        if ( voiceTestStatus === "listening" ) {

            return "Listening...";
        }


        if ( voiceTestStatus === "error"  ) {

            return "✕ Failed";
        }


        return "Not tested";
    };


    return (

        <section className="h-screen bg-white/80 px-6">

            <div className="mx-auto max-w-7xl pt-23 pb-10">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Prepare for your AI Mock Interview
                    </h1>


                    <p className="mt-2 text-gray-600">
                        Complete the system checks before
                        starting your interview.
                    </p>

                </div>


                <div className="grid gap-8 lg:grid-cols-2">

                    <div className="rounded-2xl  inset-shadow-sm inset-shadow-gray-500 p-6">

                        <h2 className="text-xl font-semibold text-gray-900">
                            Interview Preview
                        </h2>


                        <div className="mt-5 overflow-hidden rounded-xl bg-black">

                            <video
                                className="aspect-video w-full"
                                preload="metadata"
                            >
                                Your browser does not support
                                the video element.
                            </video>

                        </div>

                        <div className="mt-7">

                            <h3 className="text-lg font-semibold text-gray-900">
                                Read the guidelines before proceeding
                            </h3>


                            <div className="mt-4 space-y-3">

                                <div className="rounded-lg inset-shadow-sm inset-shadow-gray-500 p-4">

                                    <p className="font-medium">
                                        Stay calm
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Keep your environment quiet
                                        and comfortable during the
                                        interview.
                                    </p>

                                </div>

                                <div className="rounded-lg inset-shadow-sm inset-shadow-gray-500 p-4">

                                    <p className="font-medium">
                                        Wait for the interviewer
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Listen to the complete question
                                        before answering.
                                    </p>

                                </div>


            
                                <div className="rounded-lg inset-shadow-sm inset-shadow-gray-500 p-4">

                                    <p className="font-medium">
                                        Speak clearly
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Speak loudly and clearly so
                                        the speech recognition system
                                        can understand you.
                                    </p>

                                </div>

                                <div className="rounded-lg inset-shadow-sm inset-shadow-gray-500 p-4">

                                    <p className="font-medium">
                                        Avoid interruptions
                                    </p>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Allow the AI interviewer to
                                        finish speaking before you
                                        answer.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>




                    <div className="rounded-2xl inset-shadow-sm inset-shadow-gray-500 p-6">


                        <h2 className="text-xl font-semibold text-gray-900">
                            System Check
                        </h2>


                        <p className="mt-2 text-sm text-gray-600">
                            Make sure everything is ready before
                            starting the interview.
                        </p>


                        <div className="mt-6 space-y-4">

                            <div className="rounded-xl p-5 inset-shadow-sm inset-shadow-gray-500">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="font-semibold">
                                            Internet Connection
                                        </h3>


                                        <p className="mt-1 text-sm text-gray-500">
                                            Check whether your browser
                                            is connected to the internet.
                                        </p>

                                    </div>


                                    <span
                                        className={
                                            internetStatus
                                                ? "font-semibold text-green-600"
                                                : "font-semibold text-red-600"
                                        }
                                    >
                                        {internetStatus
                                            ? "✓ Connected"
                                            : "✕ Offline"}
                                    </span>

                                </div>

                            </div>


                

                            <div className="rounded-xl inset-shadow-sm inset-shadow-gray-500 p-5">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="font-semibold">
                                            Interview Server
                                        </h3>


                                        <p className="mt-1 text-sm text-gray-500">
                                            Check connection with the
                                            interview backend.
                                        </p>

                                    </div>


                                    <span
                                        className={
                                            serverStatus === "connected"
                                                ? "font-semibold text-green-600"
                                                : "font-semibold text-red-600"
                                        }
                                    >
                                        {getStatusText(
                                            serverStatus
                                        )}
                                    </span>

                                </div>

                            </div>

                            <div className="rounded-xl inset-shadow-sm inset-shadow-gray-500 p-5">


                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="font-semibold">
                                            Microphone
                                        </h3>


                                        <p className="mt-1 text-sm text-gray-500">
                                            Allow microphone access
                                            for the voice interview.
                                        </p>

                                    </div>


                                    <span
                                        className={
                                            microphoneStatus === "connected"
                                                ? "font-semibold text-green-600"
                                                : microphoneStatus === "error"
                                                    ? "font-semibold text-red-600"
                                                    : "font-semibold text-gray-500"
                                        }
                                    >
                                        {getStatusText(
                                            microphoneStatus
                                        )}
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    onClick={
                                        checkMicrophone
                                    }
                                    disabled={  microphoneStatus ==="checking" }
                                    className="mt-4 rounded-lg bg-black  px-5 py-2.5 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {microphoneStatus ===
                                    "checking"
                                        ? "Checking..."
                                        : microphoneStatus ===
                                          "connected"
                                            ? "Test Again"
                                            : "Test Microphone"}

                                </button>


                                {microphoneMessage && (

                                    <p className="mt-3 text-sm text-gray-600">

                                        {microphoneMessage}

                                    </p>

                                )}


                                {microphoneStatus ===
                                    "connected" && (

                                    <div className="mt-5 border-t pt-5">


                                        <div className="flex items-center justify-between">

                                            <h4 className="font-semibold">
                                                Voice Test
                                            </h4>


                                            <span
                                                className={
                                                    voiceTestStatus ===
                                                    "success"
                                                        ? "text-sm font-semibold text-green-600"
                                                        : voiceTestStatus ===
                                                          "error"
                                                            ? "text-sm font-semibold text-red-600"
                                                            : "text-sm font-semibold text-gray-500"
                                                }
                                            >
                                                {getVoiceStatusText()}
                                            </span>

                                        </div>


                                        <p className="mt-3 text-sm text-gray-500">
                                            Say the following sentence
                                            clearly:
                                        </p>


                                        <div className="mt-2 rounded-lg bg-gray-50 p-4">

                                            <p className="text-sm font-medium text-gray-800">

                                                "Hello, this is a
                                                microphone test."

                                            </p>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={
                                                testVoice
                                            }
                                            disabled={
                                                voiceTestStatus ===
                                                "listening"
                                            }
                                            className="mt-4 rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >

                                            {voiceTestStatus ===
                                            "listening"
                                                ? "Listening..."
                                                : voiceTestStatus ===
                                                  "success"
                                                    ? "Test Again"
                                                    : "Test Voice"}

                                        </button>

                                        {voiceMessage && (

                                            <p
                                                className={
                                                    `mt-3 text-sm ${
                                                        voiceTestStatus ===
                                                        "success"
                                                            ? "text-green-600"
                                                            : voiceTestStatus ===
                                                              "error"
                                                                ? "text-red-600"
                                                                : "text-gray-600"
                                                    }`
                                                }
                                            >
                                                {voiceMessage}
                                            </p>

                                        )}


                                        {transcript && (

                                            <div className="mt-4">

                                                <p className="text-sm font-medium text-gray-700">
                                                    Detected speech:
                                                </p>


                                                <div className="mt-2 rounded-lg border bg-gray-50 p-3">

                                                    <p className="text-sm text-gray-800">
                                                        {transcript}
                                                    </p>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )}

                            </div>

                        </div>

                        <div
                            className={
                                `mt-6 rounded-xl p-4 ${
                                    allChecksPassed
                                        ? "bg-green-100"
                                        : "bg-gray-100"
                                }`
                            }
                        >

                            <p className="font-medium">

                                Interview readiness

                            </p>


                            <p className="mt-1 text-sm text-gray-600">

                                {allChecksPassed
                                    ? "✓ Everything is ready. You can start the interview."
                                    : "Complete all system checks to continue."}

                            </p>

                        </div>



                        <button
                            type="button"
                            onClick={
                                startInterview
                            }
                            disabled={
                                !allChecksPassed ||
                                starting
                            }
                            className="mt-6 w-full rounded-xl bg-black px-5 py-3.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >

                            {starting
                                ? "Starting Interview..."
                                : "Start Interview"}

                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}


export default MockInterview3;