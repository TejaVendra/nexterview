import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function Interview() {
    const { id } = useParams();
    const navigate = useNavigate();

    const socketRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const [answer, setAnswer] = useState("");

    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    const [isConnected, setIsConnected] = useState(false);

    const [isWaiting, setIsWaiting] = useState(true);

    const [interviewEnded, setInterviewEnded] = useState(false);

    const [error, setError] = useState("");

    const [remainingSeconds, setRemainingSeconds] = useState(10 * 60);



    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);


    useEffect(() => {
        if (!id) {
            setError("Interview ID is missing.");
            return;
        }

        const socket = io("http://localhost:3100", {
            withCredentials: true,
        });

        socketRef.current = socket;


        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);

            setIsConnected(true);
        });



        socket.on("disconnect", () => {
            console.log("Socket disconnected");

            setIsConnected(false);
        });



        socket.on("interview-question", (data) => {
            console.log("New question:", data);

            setMessages((previous) => [
                ...previous,
                {
                    id: `ai-${Date.now()}`,
                    role: "assistant",
                    content: data.question,
                },
            ]);

            setCurrentQuestionId(data.questionId);

            setIsWaiting(false);

            setError("");
        });


        socket.on("interview-ended", (data) => {
            console.log("Interview ended:", data);

            setInterviewEnded(true);

            setIsWaiting(false);

            setMessages((previous) => [
                ...previous,
                {
                    id: `end-${Date.now()}`,
                    role: "assistant",
                    content:
                        "The interview has been completed. Thank you for participating.",
                },
            ]);
        });


        socket.on("interview-error", (data) => {
            console.error("Interview error:", data);

            setError(
                data?.message ||
                    "Something went wrong during the interview."
            );

            setIsWaiting(false);
        });


        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("interview-question");
            socket.off("interview-ended");
            socket.off("interview-error");

            socket.disconnect();

            socketRef.current = null;
        };
    }, [id]);


    const startInterview = () => {
        if (!socketRef.current) {
            setError("Interview connection is not available.");
            return;
        }

        if (!socketRef.current.connected) {
            setError("Connecting to interview server...");
            return;
        }

        console.log("Starting interview:", id);

        setIsWaiting(true);

        setError("");

        socketRef.current.emit("start-interview", {
            interviewId: id,
        });
    };



    useEffect(() => {
        if (!isConnected || !id) {
            return;
        }

        startInterview();
    }, [isConnected, id]);




    const submitAnswer = () => {
        const cleanAnswer = answer.trim();

        if (!cleanAnswer) {
            return;
        }

        if (!socketRef.current) {
            setError("Interview connection is not available.");
            return;
        }

        if (!socketRef.current.connected) {
            setError("Connection lost. Please wait...");
            return;
        }

        if (interviewEnded) {
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

        socketRef.current.emit("submit-answer", {
            interviewId: id,
            answer: cleanAnswer,
        });
    };



    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            submitAnswer();
        }
    };


    const exitInterview = () => {
        const confirmed = window.confirm(
            "Are you sure you want to exit the interview?"
        );

        if (!confirmed) {
            return;
        }

        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        navigate("/mock-interview");
    };




    useEffect(() => {
        if (interviewEnded) {
            return;
        }

        const timer = setInterval(() => {
            setRemainingSeconds((previous) => {
                if (previous <= 1) {
                    clearInterval(timer);

                    setInterviewEnded(true);

                    if (socketRef.current) {
                        socketRef.current.disconnect();
                    }

                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [interviewEnded]);



    const minutes = Math.floor(
        remainingSeconds / 60
    );

    const seconds = remainingSeconds % 60;

    const formattedTime = `${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;



    return (
        <section className="h-screen overflow-hidden px-4 pt-20 pb-4 font-rubik md:px-8">

            <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-3xl border border-gray-200/70 bg-white shadow-xl">




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
                                Technical Interview • Backend Developer
                            </p>

                        </div>

                    </div>


                    {/* TIMER */}

                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5">

                        <div
                            className={`h-2 w-2 rounded-full ${
                                remainingSeconds <= 60
                                    ? "animate-pulse bg-red-500"
                                    : "animate-pulse bg-green-500"
                            }`}
                        />

                        <span className="font-mono text-sm font-semibold text-gray-800">
                            {formattedTime}
                        </span>

                    </div>

                </div>



                <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_300px]">



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

                                        <p className="text-sm text-red-600">
                                            {error}
                                        </p>

                                    </div>

                                )}



                                {messages.length === 0 && isWaiting && (

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
                                                    Preparing your interview...
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                )}


                      

                                {messages.map((message) => (

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

                                ))}


                  

                                {isWaiting &&
                                    messages.length > 0 &&
                                    !interviewEnded && (

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
                                                            style={{
                                                                animationDelay:
                                                                    "150ms",
                                                            }}
                                                        />

                                                        <span
                                                            className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                            style={{
                                                                animationDelay:
                                                                    "300ms",
                                                            }}
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )}


                                <div ref={messagesEndRef} />

                            </div>

                        </div>



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
                                            interviewEnded
                                        }
                                        placeholder={
                                            interviewEnded
                                                ? "Interview completed"
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
                                            interviewEnded
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
                                        Software Engineer
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

                                    <p className="text-xs text-gray-400">
                                        Round
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        Technical
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-gray-400">
                                        Experience
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        Fresher
                                    </p>

                                </div>


                                <div>

                                    <p className="text-xs text-gray-400">
                                        Duration
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        10 minutes
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