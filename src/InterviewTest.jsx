import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3100", {
    withCredentials: true
});

export default function InterviewTest() {
    const [connected, setConnected] = useState(false);
    const [interviewId] = useState(1);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [status, setStatus] = useState("Not connected");

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected:", socket.id);

            setConnected(true);
            setStatus("Connected");
        });

        socket.on("disconnect", () => {
            setConnected(false);
            setStatus("Disconnected");
        });

        socket.on("interview-question", (data) => {
            console.log("Received question:", data);

            setQuestion(data.question);
            setAnswer("");
            setStatus("Waiting for answer");
        });

        socket.on("interview-ended", (data) => {
            console.log("Interview ended:", data);

            setStatus("Interview completed");
            setQuestion("");
        });

        socket.on("interview-error", (data) => {
            console.error("Interview error:", data);

            setStatus(data.message);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("interview-question");
            socket.off("interview-ended");
            socket.off("interview-error");
        };
    }, []);

    const startInterview = () => {
        socket.emit("start-interview", {
            interviewId
        });

        setStatus("Starting interview...");
    };

    const submitAnswer = () => {
        if (!answer.trim()) {
            return;
        }

        socket.emit("submit-answer", {
            interviewId,
            answer
        });

        setStatus("Processing answer...");
    };

    return (
        <div className="pt-20">
            <h1>AI Mock Interview</h1>

            <p>
                Connection status: {connected ? "Connected" : "Disconnected"}
            </p>

            <p>Interview status: {status}</p>

            <button
                onClick={startInterview}
                disabled={!connected}
            >
                Start Interview
            </button>

            {question && (
                <div>
                    <h2>Question</h2>

                    <p>{question}</p>

                    <textarea
                        value={answer}
                        onChange={(event) => setAnswer(event.target.value)}
                        placeholder="Enter your answer..."
                        rows={8}
                    />

                    <br />

                    <button
                        onClick={submitAnswer}
                        disabled={!answer.trim()}
                    >
                        Submit Answer
                    </button>
                </div>
            )}
        </div>
    );
}