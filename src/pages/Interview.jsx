import React from "react";

function Interview() {
    return (
        <section className="h-screen px-4 pt-16 pb-4 font-rubik md:px-8">

            <div className="relative mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white/70 p-5 shadow-xl backdrop-blur-md md:p-8">

                {/* Header */}

                <div className="flex shrink-0 items-center justify-between border-b pb-4">

                    <div>
                        <h1 className="text-xl font-semibold">
                            AI Mock Interview
                        </h1>

                        <p className="text-sm text-gray-500">
                            Technical Interview
                        </p>
                    </div>

                    <div className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
                        03:10
                    </div>

                </div>


                {/* Conversations */}

                <div className="min-h-0 flex-1 overflow-y-auto py-6">

                    <div className="mx-auto max-w-4xl space-y-6">

                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-gray-100 px-5 py-3">
                                <p className="text-sm leading-6 text-gray-800">
                                    Explain the difference between
                                    Redis and an in-memory JavaScript Map.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-black px-5 py-3 text-white">
                                <p className="text-sm leading-6">
                                    Redis is an external in-memory
                                    data store, while a JavaScript Map
                                    exists inside the application memory.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>


                {/* Input */}

                <div className="shrink-0 border-t pt-4">

                    <div className="mx-auto flex max-w-4xl items-end gap-3">

                        <textarea
                            placeholder="Type your answer..."
                            rows={2}
                            className="min-h-[52px] flex-1 resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-gray-400"
                        />

                        <button className="rounded-2xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 active:scale-95">
                            Send
                        </button>

                    </div>

                    <div className="mt-3 flex justify-center">
                        <button className="rounded-xl px-5 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50">
                            Exit Interview
                        </button>
                    </div>

                </div>

            </div>

        </section>
    );
}

export default Interview;