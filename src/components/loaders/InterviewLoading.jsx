import React from "react";

function InterviewLoading() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-white font-rubik">

            <div className="text-center">

                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

                <p className="mt-4 text-sm font-semibold text-gray-700">
                    Checking your interview...
                </p>

                <p className="mt-1 text-xs text-gray-400">
                    Please wait
                </p>

            </div>

        </section>
    );
}

export default InterviewLoading;