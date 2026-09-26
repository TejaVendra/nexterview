import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function InterviewAlreadyFinished() {
    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <section className="flex min-h-screen items-center justify-center bg-white px-6 font-rubik">

            <div className="w-full max-w-md text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600">
                        ✓
                    </div>

                </div>

                <h1 className="mt-6 text-2xl font-bold text-gray-900">
                    Interview Already Finished
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    This interview has already been completed.
                    You cannot join the same interview again.
                </p>

                <p className="mt-3 text-xs text-gray-400">
                    Interview ID: {id}
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

export default InterviewAlreadyFinished;