import React from "react";
import { useNavigate } from "react-router-dom";

function InterviewNotFound() {
    const navigate = useNavigate();

    return (
        <section className="flex min-h-screen items-center justify-center bg-white px-6 font-rubik">

            <div className="w-full max-w-md text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gray-100 text-3xl font-bold text-gray-400">
                    ?
                </div>

                <h1 className="mt-6 text-2xl font-bold text-gray-900">
                    Interview Not Found
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    We couldn't find the interview you're looking for.
                    The interview may not exist or the link may be invalid.
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/mock-interview")}
                    className="mt-6 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
                >
                    Back to Mock Interviews
                </button>

            </div>

        </section>
    );
}

export default InterviewNotFound;