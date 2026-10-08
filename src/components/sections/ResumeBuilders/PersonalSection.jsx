import React from "react";
import SectionShell from "./SectionShell.jsx";

export default function PersonalSection({
  resume,
  updateResume,
}) {
  const field = (label, key, placeholder, type = "text") => (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-[#a8a29e]">
        {label}
      </span>

      <input
        type={type}
        value={resume?.[key] || ""}
        onChange={(e) =>
          updateResume({
            [key]: e.target.value,
          })
        }
        placeholder={placeholder}
        className="
          w-full
          rounded-xl
          border
          border-[#ece7dc]
          bg-white
          px-3.5
          py-3
          text-[13px]
          text-[#1c1917]
          outline-none
          transition-all
          placeholder:text-[#d6cfc0]
          focus:border-[#c2410c]/50
          focus:shadow-[0_0_0_3px_rgba(194,65,12,0.08)]
        "
      />
    </label>
  );

  return (
    <SectionShell
      title="Personal information"
      description="The details recruiters see first."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {field(
          "Full name",
          "name",
          "John Doe"
        )}

        {field(
          "Professional headline",
          "headline",
          "Software Engineer"
        )}

        {field(
          "Email",
          "email",
          "john@example.com",
          "email"
        )}

        {field(
          "Phone",
          "phone",
          "+91 98765 43210",
          "tel"
        )}

        {field(
          "Location",
          "location",
          "Hyderabad, India"
        )}

        {field(
          "LinkedIn",
          "linkedin",
          "linkedin.com/in/yourname"
        )}

        {field(
          "GitHub",
          "github",
          "github.com/yourname"
        )}

        {field(
          "Portfolio",
          "portfolio",
          "yourportfolio.com"
        )}
      </div>
    </SectionShell>
  );
}