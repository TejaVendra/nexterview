import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { io } from "socket.io-client";

import { getMockInterview } from "../api/interviewAPI.js";

import InterviewNotFound from "../components/ui/InterviewNotFound.jsx";
import InterviewAlreadyFinished from "../components/ui/InterviewAlreadyFinished.jsx";
import InterviewUnavailable from "../components/ui/InterviewUnavailable.jsx";
import InterviewLoading from "../components/loaders/InterviewLoading.jsx";


function Interview() {

    const { id } = useParams();
    const navigate = useNavigate();

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);


    // =====================================================
    // INTERVIEW
    // =====================================================

    const [interview, setInterview] = useState(null);
    const [loadingInterview, setLoadingInterview] = useState(true);
    const [interviewError, setInterviewError] = useState(null);


    // =====================================================
    // SOCKET
    // =====================================================

    const [isConnected, setIsConnected] = useState(false);


    // =====================================================
    // CHAT
    // =====================================================

    const [messages, setMessages] = useState([]);
    const [answer, setAnswer] = useState("");
    const [isWaiting, setIsWaiting] = useState(true);
    const [interviewEnded, setInterviewEnded] = useState(false);
    const [error, setError] = useState("");
    const [llmError, setLlmError] = useState(false);


    // =====================================================
    // TIMER
    // =====================================================

    const [remainingSeconds, setRemainingSeconds] = useState(0);


    // =====================================================
    // CHECK INTERVIEW (initial fetch)
    // =====================================================

    useEffect(() => {

        let cancelled = false;

        const checkInterview = async () => {

            try {

                setLoadingInterview(true);
                setInterviewError(null);

                const response = await getMockInterview(id);

                if (cancelled) return;

                const interviewData = response?.data?.interview;

                if (!interviewData) {
                    setInterviewError("NOT_FOUND");
                    return;
                }

                setInterview(interviewData);

                if (interviewData.status === "COMPLETED") {
                    setInterviewEnded(true);
                    return;
                }

                if (interviewData.status === "CANCELLED") {
                    return;
                }

                if (interviewData.status === "IN_PROGRESS") {

                    // ------------------------------------
                    // Compute remaining using elapsedSeconds
                    // plus live time since startedAt
                    // ------------------------------------

                    const durationSeconds =
                        Number(interviewData.duration) * 60;

                    let elapsed =
                        Number(interviewData.elapsedSeconds || 0);

                    if (interviewData.startedAt) {
                        const running = Math.floor(
                            (Date.now() -
                                new Date(
                                    interviewData.startedAt
                                ).getTime()) / 1000
                        );
                        elapsed += Math.max(0, running);
                    }

                    const remaining = Math.max(
                        0,
                        durationSeconds - elapsed
                    );

                    setRemainingSeconds(remaining);

                    if (remaining <= 0) {
                        setInterviewEnded(true);
                    }
                }

            } catch (error) {

                if (cancelled) return;

                console.error(
                    "Interview validation error:",
                    error
                );

                if (error?.response?.status === 404) {
                    setInterviewError("NOT_FOUND");
                } else {
                    setInterviewError("ERROR");
                }

            } finally {
                if (!cancelled) setLoadingInterview(false);
            }
        };

        if (id) checkInterview();

        return () => {
            cancelled = true;
        };

    }, [id]);


    // =====================================================
    // CREATED -> PREPARATION
    // =====================================================

    useEffect(() => {

        if (loadingInterview || !interview) return;

        if (interview.status === "CREATED") {
            navigate(
                `/mock-interview/prepare/${interview.id}`,
                { replace: true }
            );
        }

    }, [loadingInterview, interview, navigate]);


    // =====================================================
    // SOCKET CONNECTION
    // =====================================================

    useEffect(() => {

        if (loadingInterview || !interview) return;
        if (interview.status !== "IN_PROGRESS") return;
        if (interviewEnded) return;
        if (socketRef.current) return;

        console.log("Creating interview socket...");

        const socket = io("http://localhost:3100", {
            withCredentials: true,
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
        });

        socketRef.current = socket;

        // --------------------------------------------------
        // CONNECT
        // --------------------------------------------------

        socket.on("connect", () => {
            console.log("Interview socket connected:", socket.id);
            setIsConnected(true);
            setError("");

            socket.emit("join-interview", { interviewId: id });
        });

        // --------------------------------------------------
        // RESTORED
        // --------------------------------------------------

        socket.on("interview-restored", (data) => {

            console.log("Interview restored:", data);

            if (typeof data.remainingSeconds === "number") {
                setRemainingSeconds(data.remainingSeconds);
            }

            // Rebuild messages from questions
            const restoredMessages = [];

            if (Array.isArray(data.questions)) {
                data.questions.forEach((question) => {

                    restoredMessages.push({
                        id: `question-${question.id}`,
                        role: "assistant",
                        content: question.question
                    });

                    if (question.answer) {
                        restoredMessages.push({
                            id: `answer-${question.id}`,
                            role: "user",
                            content: question.answer
                        });
                    }
                });
            }

            setMessages(restoredMessages);

            if (data.currentQuestion) {
                setIsWaiting(false);
            } else {
                setIsWaiting(true);
            }

            setError("");
        });

        // --------------------------------------------------
        // ALREADY COMPLETED
        // --------------------------------------------------

        socket.on("interview-already-completed", (data) => {

            console.log("Interview already completed:", data);

            setInterviewEnded(true);
            setIsWaiting(false);
            setRemainingSeconds(0);
        });

        // --------------------------------------------------
        // QUESTION
        // --------------------------------------------------

        socket.on("interview-question", (data) => {

            console.log("Interview question:", data);

            if (!data?.question) return;

            setMessages((previous) => {

                const alreadyExists = previous.some(
                    (message) =>
                        message.role === "assistant" &&
                        message.content === data.question
                );

                if (alreadyExists) return previous;

                return [
                    ...previous,
                    {
                        id: data.questionId ?? `ai-${Date.now()}`,
                        role: "assistant",
                        content: data.question,
                    },
                ];
            });

            if (typeof data.remainingSeconds === "number") {
                setRemainingSeconds(data.remainingSeconds);
            }

            setIsWaiting(false);
            setError("");
            setLlmError(false);
        });

        // --------------------------------------------------
        // ANSWER PROCESSING
        // --------------------------------------------------

        socket.on("answer-processing", () => {
            setIsWaiting(true);
            setError("");
        });

        // --------------------------------------------------
        // INTERVIEW ENDED
        // --------------------------------------------------

        socket.on("interview-ended", (data) => {

            console.log("Interview ended:", data);

            setInterviewEnded(true);
            setIsWaiting(false);
            setRemainingSeconds(0);

            setMessages((previous) => [
                ...previous,
                {
                    id: `end-${Date.now()}`,
                    role: "assistant",
                    content:
                        data?.message ||
                        "The interview has been completed. Thank you for participating.",
                },
            ]);
        });

        // --------------------------------------------------
        // INTERVIEW PAUSED
        // --------------------------------------------------

        socket.on("interview-paused", (data) => {

            console.log("Interview paused:", data);

            if (typeof data.remainingSeconds === "number") {
                setRemainingSeconds(data.remainingSeconds);
            }

            setInterview((previous) =>
                previous
                    ? { ...previous, status: "PAUSED" }
                    : previous
            );
        });

        // --------------------------------------------------
        // RATE LIMIT
        // --------------------------------------------------

        socket.on("llm-rate-limit", (data) => {

            console.warn("Gemini rate limit:", data);

            if (typeof data.remainingSeconds === "number") {
                setRemainingSeconds(data.remainingSeconds);
            }

            setIsWaiting(false);

            setError(
                data.message ||
                "The AI interviewer is temporarily unavailable. Your interview has been paused."
            );

            setInterview((previous) =>
                previous
                    ? { ...previous, status: "PAUSED" }
                    : previous
            );
        });

        // --------------------------------------------------
        // LLM ERROR
        // --------------------------------------------------

        socket.on("llm-error", (data) => {

            console.error("LLM error:", data);

            setLlmError(true);
            setIsWaiting(false);

            setError(
                data?.message ||
                "Unable to process the interview right now. Please try again."
            );
        });

        // --------------------------------------------------
        // GENERAL ERROR
        // --------------------------------------------------

        socket.on("interview-error", (data) => {

            console.error("Interview socket error:", data);

            if (data?.code === "INTERVIEW_COMPLETED") {
                setInterviewEnded(true);
                setIsWaiting(false);
                setRemainingSeconds(0);
                return;
            }

            if (data?.code === "INTERVIEW_NOT_FOUND") {
                setInterviewError("NOT_FOUND");
                return;
            }

            if (data?.code === "LLM_ERROR") {
                setLlmError(true);
            }

            setError(data?.message || "Something went wrong.");
            setIsWaiting(false);
        });

        // --------------------------------------------------
        // DISCONNECT
        // --------------------------------------------------

        socket.on("disconnect", (reason) => {

            console.log("Interview socket disconnected:", reason);
            setIsConnected(false);
        });

        socket.on("connect_error", (error) => {

            console.error("Interview socket connection error:", error);
            setIsConnected(false);
            setError("Unable to connect to the interview server.");
        });

        // --------------------------------------------------
        // CLEANUP
        // --------------------------------------------------

        return () => {

            console.log("Interview socket cleanup");

            socket.off("connect");
            socket.off("disconnect");
            socket.off("connect_error");
            socket.off("interview-restored");
            socket.off("interview-already-completed");
            socket.off("interview-question");
            socket.off("answer-processing");
            socket.off("interview-ended");
            socket.off("interview-paused");
            socket.off("llm-rate-limit");
            socket.off("llm-error");
            socket.off("interview-error");

            socket.disconnect();
            socketRef.current = null;
        };

    }, [
        loadingInterview,
        interview?.status,
        interviewEnded,
        id,
    ]);


    // =====================================================
    // AUTO SCROLL
    // =====================================================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    // =====================================================
    // SUBMIT ANSWER
    // =====================================================

    const submitAnswer = () => {

        const cleanAnswer = answer.trim();

        if (!cleanAnswer) return;
        if (interviewEnded) return;
        if (isWaiting) return;

        if (!socketRef.current || !socketRef.current.connected) {
            setError("Interview connection is unavailable.");
            return;
        }

        setMessages((previous) => [
            ...previous,
            {
                id: `user-${Date.now()}`,
                role: "user",
                content: cleanAnswer,
            },
        ]);

        setAnswer("");
        setIsWaiting(true);
        setError("");
        setLlmError(false);

        socketRef.current.emit("submit-answer", {
            interviewId: Number(id),
            answer: cleanAnswer,
        });
    };


    // =====================================================
    // RETRY AFTER LLM ERROR
    // =====================================================

    const retryInterview = () => {

        if (!socketRef.current || !socketRef.current.connected) {
            setError("Interview connection is unavailable.");
            return;
        }

        setLlmError(false);
        setError("");
        setIsWaiting(true);

        socketRef.current.emit("retry-interview", {
            interviewId: Number(id),
        });
    };


    // =====================================================
    // KEYBOARD
    // =====================================================

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submitAnswer();
        }
    };


    // =====================================================
    // EXIT INTERVIEW
    // =====================================================

    const exitInterview = () => {

        const confirmed = window.confirm(
            "Are you sure you want to exit the interview?"
        );

        if (!confirmed) return;

        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("exit-interview", {
                interviewId: Number(id),
            });
        }

        navigate("/mock-interview");
    };


    // =====================================================
    // TIMER
    // =====================================================

    useEffect(() => {

        if (!interview || interview.status !== "IN_PROGRESS" || interviewEnded)
            return;

        const timer = setInterval(() => {

            setRemainingSeconds((previous) => {

                if (previous <= 1) {

                    clearInterval(timer);

                    setInterviewEnded(true);
                    setIsWaiting(false);

                    if (
                        socketRef.current &&
                        socketRef.current.connected
                    ) {
                        socketRef.current.emit("time-expired", {
                            interviewId: Number(id),
                        });
                    }

                    return 0;
                }

                return previous - 1;
            });

        }, 1000);

        return () => clearInterval(timer);

    }, [interview, interviewEnded, id]);


    // =====================================================
    // TIMER FORMAT
    // =====================================================

    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
    ).padStart(2, "0")}`;


    // =====================================================
    // LOADING / ERRORS / STATUS RENDER
    // =====================================================

    if (loadingInterview) return <InterviewLoading />;
    if (interviewError === "NOT_FOUND") return <InterviewNotFound />;
    if (interviewError === "ERROR") return <InterviewUnavailable />;

    if (interview?.status === "COMPLETED" || interviewEnded)
        return <InterviewAlreadyFinished />;

    if (interview?.status === "CANCELLED") return <InterviewUnavailable />;
    if (interview?.status === "CREATED") return null;


    // =====================================================
    // ACTUAL INTERVIEW UI
    // =====================================================

    return (
        <section className="h-screen overflow-hidden px-4 pt-20 pb-4 font-rubik md:px-8">

            <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-xl">

                {/* HEADER */}

                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-5 py-4 md:px-7">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-sm font-bold text-white">
                            AI
                        </div>

                        <div>
                            <h1 className="text-base font-semibold text-gray-900 md:text-lg">
                                AI Mock Interview
                            </h1>
                            <p className="text-xs text-gray-500 md:text-sm">
                                {interview.round} • {interview.role}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5">

                        <div
                            className={`h-2 w-2 rounded-full ${
                                remainingSeconds <= 60
                                    ? "animate-pulse bg-red-500"
                                    : "bg-green-500"
                            }`}
                        />

                        <span className="font-mono text-sm font-semibold text-gray-800">
                            {formattedTime}
                        </span>

                    </div>

                </div>

                {/* MAIN */}

                <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_300px]">

                    {/* CHAT */}

                    <div className="flex min-h-0 flex-col border-r border-gray-200">

                        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-5 py-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                                AI
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    AI Interviewer
                                </p>
                                <p className="text-xs text-green-600">
                                    {!isConnected
                                        ? "Connecting..."
                                        : isWaiting
                                        ? "Processing..."
                                        : "Asking questions"}
                                </p>
                            </div>

                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8">

                            <div className="mx-auto max-w-3xl space-y-7">

                                {error && (
                                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                                        <p className="text-sm text-red-600">{error}</p>

                                        {llmError && (
                                            <button
                                                type="button"
                                                onClick={retryInterview}
                                                className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                                            >
                                                Retry
                                            </button>
                                        )}

                                    </div>
                                )}

                                {messages.length === 0 && (
                                    <div className="flex items-start gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                            AI
                                        </div>

                                        <div className="max-w-[80%]">
                                            <p className="mb-1 text-xs font-medium text-gray-500">
                                                AI Interviewer
                                            </p>
                                            <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-gray-50 px-5 py-4">
                                                <p className="text-sm leading-6 text-gray-500">
                                                    {isWaiting
                                                        ? "Preparing your interview..."
                                                        : "Waiting for the first question..."}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {messages.map((message) =>
                                    message.role === "assistant" ? (
                                        <div
                                            key={message.id}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                                AI
                                            </div>

                                            <div className="max-w-[80%]">
                                                <p className="mb-1 text-xs font-medium text-gray-500">
                                                    AI Interviewer
                                                </p>
                                                <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-gray-50 px-5 py-4">
                                                    <p className="text-sm leading-6 text-gray-800">
                                                        {message.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            key={message.id}
                                            className="flex items-start justify-end gap-3"
                                        >
                                            <div className="max-w-[80%] text-right">
                                                <p className="mb-1 text-xs font-medium text-gray-500">
                                                    You
                                                </p>
                                                <div className="rounded-2xl rounded-tr-md bg-black px-5 py-4 text-left text-white">
                                                    <p className="text-sm leading-6">
                                                        {message.content}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                                                Y
                                            </div>
                                        </div>
                                    )
                                )}

                                {isWaiting &&
                                    messages.length > 0 &&
                                    !interviewEnded &&
                                    !llmError && (
                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                                AI
                                            </div>

                                            <div>
                                                <p className="mb-1 text-xs font-medium text-gray-500">
                                                    AI Interviewer
                                                </p>
                                                <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-gray-50 px-5 py-4">
                                                    <div className="flex items-center gap-1">
                                                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                                                        <span
                                                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                            style={{ animationDelay: "150ms" }}
                                                        />
                                                        <span
                                                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                            style={{ animationDelay: "300ms" }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    )}

                                <div ref={messagesEndRef} />

                            </div>

                        </div>

                        {/* ANSWER */}

                        <div className="shrink-0 border-t border-gray-200 bg-white p-4 md:p-5">

                            <div className="mx-auto max-w-3xl">

                                <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-2 transition focus-within:border-gray-400 focus-within:bg-white focus-within:shadow-sm">

                                    <textarea
                                        rows={2}
                                        value={answer}
                                        onChange={(event) =>
                                            setAnswer(event.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        disabled={
                                            isWaiting ||
                                            interviewEnded ||
                                            !isConnected
                                        }
                                        placeholder={
                                            interviewEnded
                                                ? "Interview completed"
                                                : !isConnected
                                                ? "Connecting to interview..."
                                                : isWaiting
                                                ? "Waiting for interviewer..."
                                                : "Type your answer..."
                                        }
                                        className="w-full resize-none bg-transparent px-3 py-2 pr-20 text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={submitAnswer}
                                        disabled={
                                            !answer.trim() ||
                                            isWaiting ||
                                            interviewEnded ||
                                            !isConnected
                                        }
                                        className="absolute bottom-2 right-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        Send
                                    </button>

                                </div>

                                <p className="mt-2 text-center text-xs text-gray-400">
                                    Press Enter to send • Shift + Enter for a new line
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* SIDEBAR */}

                    <aside className="hidden min-h-0 flex-col bg-gray-50/70 lg:flex">

                        <div className="border-b border-gray-200 p-6">

                            <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Candidate
                            </p>

                            <div className="flex items-center gap-3">

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-200 text-sm font-bold text-gray-700">
                                    Y
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">
                                        Candidate
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {interview.role}
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="border-b border-gray-200 p-6">

                            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Interview Details
                            </p>

                            <div className="space-y-4">

                                <div>
                                    <p className="text-xs text-gray-400">Round</p>
                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {interview.round}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Experience</p>
                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {interview.experience}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Duration</p>
                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {interview.duration} minutes
                                    </p>
                                </div>

                            </div>

                        </div>

                        <div className="flex-1 p-6">

                            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Status
                            </p>

                            <div className="rounded-2xl border border-gray-200 bg-white p-4">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50">
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full ${
                                                isConnected
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                            }`}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">
                                            {!isConnected
                                                ? "Connecting..."
                                                : interviewEnded
                                                ? "Interview completed"
                                                : "Interview in progress"}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {!isConnected
                                                ? "Connecting to interview server"
                                                : interviewEnded
                                                ? "Thank you for participating"
                                                : isWaiting
                                                ? "AI is processing your answer"
                                                : "Answer the current question"}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="shrink-0 border-t border-gray-200 p-5">

                            <button
                                type="button"
                                onClick={exitInterview}
                                disabled={interviewEnded}
                                className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Exit Interview
                            </button>

                        </div>

                    </aside>

                </div>

            </div>

        </section>
    );
}

export default Interview;