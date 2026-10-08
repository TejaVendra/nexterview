import { useState } from "react";
import { motion } from "framer-motion";
import {
    

    Mail,
    Send,
    Check,
    ArrowUpRight,
    Copy
} from "lucide-react";

import { FaGithub ,FaInstagram , FaLinkedinIn   } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { sendContactMessage } from "../api/contactAPI.js";
import { toast } from "react-toastify";

const SOCIALS = [
    {
        name: "Email",
        handle: "tejavitap@gmail.com",
        href: "mailto:tejavitap@gmail.com",
        Icon: Mail,
        accent: "bg-stone-900 text-white",
        ring: "group-hover:border-stone-800",
        tint: "bg-amber-50/50",
        note: "For anything and everything."
    },
    {
        name: "LinkedIn",
        handle: "teja-vendra",
        href: "https://www.linkedin.com/in/teja-vendra-62bab7319/",
        Icon: FaLinkedinIn ,
        accent: "bg-stone-900 text-white",
        ring: "group-hover:border-stone-800",
        tint: "bg-sky-50/40",
        note: "Best for professional enquiries."
    },
    {
        name: "GitHub",
        handle: "@TejaVendra",
        href: "https://github.com/TejaVendra",
        Icon: FaGithub ,
        accent: "bg-stone-900 text-white",
        ring: "group-hover:border-stone-800",
        tint: "bg-stone-100/70",
        note: "Where the code lives."
    },
    {
        name: "Twitter",
        handle: "@T_E_J_A_01",
        href: "https://x.com/T_E_J_A_01",
        Icon: FaXTwitter,
        accent: "bg-stone-900 text-white",
        ring: "group-hover:border-stone-800",
        tint: "bg-orange-50/50",
        note: "Short thoughts, quick replies."
    },
    {
        name: "Instagram",
        handle: "@____t___e___j___a____",
        href: "https://www.instagram.com/____t___e___j___a____/",
        Icon: FaInstagram ,
        accent: "bg-stone-900 text-white",
        ring: "group-hover:border-stone-800",
        tint: "bg-rose-50/40",
        note: "Behind the scenes."
    }
];

function Contact() {
    const [copied, setCopied] = useState(null);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const copy = async (value, key) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(key);
            setTimeout(() => setCopied(null), 1600);
        } catch {
            /* clipboard unavailable — ignore silently */
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        // Wire this to your API / form provider (Formspree, Resend, etc.)
        try {
            setIsLoading(true);

            console.log("Contact form:", form);

         const response =  await sendContactMessage(form);

         toast.success(response.message);

        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 4000);
            
        } catch (error) {
            
            setSent(false);
            toast.error(error.message);

        }finally{
                setIsLoading(false);
        }
    };

    return (
        <section className="relative flex min-h-screen items-start justify-center overflow-hidden bg-white/50 px-6 pb-20 pt-28 font-rubik sm:pt-32">
            {/* Faint dotted paper texture */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(120,113,108,0.18) 1px, transparent 1px)",
                    backgroundSize: "22px 22px"
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-5xl"
            >
                {/* Corner ticks */}
                <span className="absolute -left-3 -top-3 h-4 w-4 border-l border-t border-stone-300" />
                <span className="absolute -right-3 -top-3 h-4 w-4 border-r border-t border-stone-300" />
                <span className="absolute -bottom-3 -left-3 h-4 w-4 border-b border-l border-stone-300" />
                <span className="absolute -bottom-3 -right-3 h-4 w-4 border-b border-r border-stone-300" />

                <div className="border border-stone-200 bg-white/70 backdrop-blur-sm">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 border-b border-stone-200 px-6 py-4 sm:px-10">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-700" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">
                            Contact
                        </p>
                        <span className="h-px flex-1 bg-stone-200" />
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                            We reply fast
                        </p>
                    </div>

                    {/* Hero */}
                    <div className="border-b border-stone-200 px-6 py-10 sm:px-10 sm:py-14">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400">
                            Say hello
                        </p>

                        <h1 className="max-w-2xl font-serif text-[34px] leading-[1.1] text-stone-900 sm:text-[46px]">
                            Reach us on
                            <br />
                            <span className="italic text-stone-500">
                                any channel
                            </span>{" "}
                            you prefer.
                        </h1>

                        <p className="mt-5 max-w-xl text-[14px] leading-7 text-stone-600">
                            Pick whichever is easiest — we&apos;re on most
                            platforms. We read everything and reply as soon
                            as we possibly can, usually within a day.
                        </p>
                    </div>

                    {/* Socials */}
                    <div className="border-b border-stone-200 px-6 py-8 sm:px-10 sm:py-10">
                        <div className="mb-6 flex items-center gap-3">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
                                Or reach out through social media
                            </p>
                            <span className="h-px flex-1 bg-stone-200" />
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {SOCIALS.map((social, i) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target={
                                        social.href.startsWith("mailto")
                                            ? undefined
                                            : "_blank"
                                    }
                                    rel="noreferrer noopener"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.35,
                                        delay: 0.05 + i * 0.05,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className={`group relative flex items-center gap-4 border border-stone-200 ${social.tint} px-4 py-4 transition-colors ${social.ring}`}
                                >
                                    {/* Icon tile */}
                                    <span
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center ${social.accent}`}
                                    >
                                        <social.Icon
                                            size={18}
                                            strokeWidth={1.8}
                                        />
                                    </span>

                                    {/* Text */}
                                    <div className="min-w-0 flex-1">
                                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">
                                            {social.name}
                                        </p>
                                        <p className="mt-0.5 truncate text-[13px] font-medium text-stone-900">
                                            {social.handle}
                                        </p>
                                        <p className="mt-1 truncate text-[11px] italic text-stone-500">
                                            {social.note}
                                        </p>
                                    </div>

                                    {/* Hover arrow */}
                                    <ArrowUpRight
                                        size={14}
                                        strokeWidth={1.8}
                                        className="shrink-0 text-stone-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stone-900"
                                    />

                                    {/* Small copy button for email only */}
                                    {social.name === "Email" && (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                copy(
                                                    social.handle,
                                                    social.name
                                                );
                                            }}
                                            aria-label="Copy email"
                                            className="absolute right-10 top-1/2 hidden -translate-y-1/2 items-center justify-center border border-stone-200 bg-white/70 p-1.5 text-stone-500 transition-colors hover:border-stone-800 hover:text-stone-900 group-hover:flex"
                                        >
                                            {copied === social.name ? (
                                                <Check
                                                    size={12}
                                                    strokeWidth={2}
                                                />
                                            ) : (
                                                <Copy
                                                    size={12}
                                                    strokeWidth={1.8}
                                                />
                                            )}
                                        </button>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Form + response promise */}
                    <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-[1.2fr_1fr] md:gap-14">
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500"
                                >
                                    Your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                    }
                                    placeholder="Jane Doe"
                                    className="w-full border border-stone-200 bg-white/60 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-800 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value
                                        })
                                    }
                                    placeholder="you@domain.com"
                                    className="w-full border border-stone-200 bg-white/60 px-4 py-3 text-[14px] text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-800 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    value={form.message}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            message: e.target.value
                                        })
                                    }
                                    placeholder="What's on your mind?"
                                    className="w-full resize-none border border-stone-200 bg-white/60 px-4 py-3 text-[14px] leading-7 text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-stone-800 focus:bg-white"
                                />
                            </div>

                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    type="submit"
                                    className="group inline-flex items-center gap-2 border border-stone-900 bg-stone-900 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:border-red-900 hover:bg-red-900 disabled:opacity-40"
                                >
                                    {isLoading ? "sending..." : sent ? (
                                        <>
                                            <Check
                                                size={14}
                                                strokeWidth={2}
                                            />
                                            Sent
                                        </>
                                    ) : (
                                        <>
                                            <Send
                                                size={14}
                                                strokeWidth={1.8}
                                                className="transition-transform group-hover:translate-x-0.5"
                                            />
                                            Send message
                                        </>
                                    )}
                                </button>

                                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                                    Or press{" "}
                                    <kbd className="border border-stone-300 bg-white/60 px-1.5 py-0.5 text-stone-600">
                                        ⏎
                                    </kbd>{" "}
                                    to submit
                                </p>
                            </div>
                        </form>

                        {/* Response promise */}
                        <aside className="relative">
                            <div className="border border-stone-200 bg-stone-50/60 p-6">
                                <div className="mb-4 flex items-center gap-3">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-700" />
                                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-500">
                                        Response time
                                    </p>
                                </div>

                                <p className="font-serif text-[22px] leading-snug text-stone-900">
                                    We reply as soon as we can — usually
                                    within a day.
                                </p>

                                <p className="mt-4 text-[13px] leading-7 text-stone-600">
                                    Weekends and public holidays might take
                                    a little longer. If your message is
                                    urgent, mention it in the subject and
                                    we&apos;ll prioritise it.
                                </p>

                                <div className="mt-6 space-y-3 border-t border-stone-200 pt-5">
                                    <Row label="Typical reply">
                                        <span className="text-stone-900">
                                            &lt; 24 hours
                                        </span>
                                    </Row>
                                    <Row label="Weekend">
                                        <span className="text-stone-900">
                                            1 – 2 days
                                        </span>
                                    </Row>
                                    <Row label="Urgent">
                                        <span className="text-stone-900">
                                            Mark in subject
                                        </span>
                                    </Row>
                                </div>
                            </div>

                            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                                No bots · No auto-replies
                            </p>
                        </aside>
                    </div>

                    {/* Footer strip */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-6 py-4 sm:px-10">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                            Usually replies within a day
                        </p>
                        <a
                            href="mailto:hello@yourdomain.com"
                            className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 underline-offset-4 hover:text-stone-900 hover:underline"
                        >
                            hello@yourdomain.com →
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

/* Small helper for the response-time rows */
function Row({ label, children }) {
    return (
        <div className="flex items-baseline justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400">
                {label}
            </span>
            <span className="text-[13px] font-medium">{children}</span>
        </div>
    );
}

export default Contact;