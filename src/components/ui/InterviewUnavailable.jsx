import React from "react";
import { useNavigate } from "react-router-dom";

function InterviewUnavailable() {
    const navigate = useNavigate();

    return (
        <section className="flex min-h-screen items-center justify-center bg-white px-6 font-rubik">

            <div className="w-full max-w-md text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-3xl font-bold text-red-500">
                    !
                </div>

                <h1 className="mt-6 text-2xl font-bold text-gray-900">
                    Interview Unavailable
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    This interview is no longer available.
                    Please return to your interview dashboard.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/mock-interview")}
                    className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
                >
                    Back to Interviews
                </button>

            </div>

        </section>
    );
}

export default InterviewUnavailable;