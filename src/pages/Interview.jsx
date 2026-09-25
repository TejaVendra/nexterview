

function Interview() {
    return (
        <section className="h-screen overflow-hidden px-4 pt-20 md:pt-23 pb-4 font-rubik md:px-8">

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

                    <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5">

                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

                        <span className="font-mono text-sm font-semibold text-gray-800">
                            03:12
                        </span>

                    </div>

                </div>

                <div className="min-h-0 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px]">

                    <div className="min-h-0 flex flex-col border-r border-gray-200">
                        <div className="flex shrink-0 items-center gap-3 border-b border-gray-100 px-5 py-4">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                                AI
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    AI Interviewer
                                </p>

                                <p className="text-xs text-green-600">
                                    Asking questions
                                </p>
                            </div>

                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 md:px-8">

                            <div className="mx-auto max-w-3xl space-y-7">

                                <div className="flex items-start gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                        AI
                                    </div>

                                    <div className="max-w-[80%]">

                                        <p className="mb-1 text-xs font-medium text-gray-500">
                                            AI Interviewer
                                        </p>

                                        <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-gray-50 px-5 py-4">

                                            <p className="text-sm leading-6 text-gray-800">
                                                Explain the difference between
                                                Redis and an in-memory
                                                JavaScript Map.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex items-start justify-end gap-3">

                                    <div className="max-w-[80%] text-right">

                                        <p className="mb-1 text-xs font-medium text-gray-500">
                                            You
                                        </p>

                                        <div className="rounded-2xl rounded-tr-md bg-black px-5 py-4 text-left text-white">

                                            <p className="text-sm leading-6">
                                                Redis is an external in-memory
                                                data store, while a JavaScript
                                                Map exists inside the application
                                                memory.
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                                        Y
                                    </div>

                                </div>

                                <div className="flex items-start gap-3">

                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                                        AI
                                    </div>

                                    <div className="max-w-[80%]">

                                        <p className="mb-1 text-xs font-medium text-gray-500">
                                            AI Interviewer
                                        </p>

                                        <div className="rounded-2xl rounded-tl-md border border-gray-200 bg-gray-50 px-5 py-4">

                                            <p className="text-sm leading-6 text-gray-800">
                                                Good. Now explain how Redis
                                                can be used for caching in a
                                                Node.js application.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="shrink-0 border-t border-gray-200 bg-white p-4 md:p-5">

                            <div className="mx-auto max-w-3xl">

                                <div className="relative rounded-2xl border border-gray-200 bg-gray-50 p-2 transition focus-within:border-gray-400 focus-within:bg-white focus-within:shadow-sm">

                                    <textarea
                                        rows={2}
                                        placeholder="Type your answer..."
                                        className="w-full resize-none bg-transparent px-3 py-2 pr-20 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                                    />

                                    <button
                                        className="absolute bottom-2 right-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-95"
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

                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-800">
                                            Interview in progress
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            Answer the current question
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="shrink-0 border-t border-gray-200 p-5">

                            <button
                                className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 active:scale-[0.98]"
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