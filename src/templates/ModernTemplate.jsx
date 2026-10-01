import React from "react";

export default function ModernTemplate({
  resume = {},
}) {
  const experiences =
    resume.experiences || [];

  const projects =
    resume.projects || [];

  const skills =
    resume.skills || [];

  const education =
    resume.educations || [];

  const certifications =
    resume.certifications || [];

  const contacts = [
    resume.email,
    resume.phone,
    resume.location,
    resume.linkedin,
    resume.github,
    resume.portfolio,
  ].filter(Boolean);

  return (
    <div className="min-h-[297mm] bg-white p-[15mm] font-sans text-[#1c1917]">
      <header className="border-b-[4px] border-[#1c1917] pb-6">
        <div className="flex items-end justify-between gap-8">
          <div className="min-w-0">
            <p className="mb-2 text-[8px] font-bold uppercase tracking-[0.3em] text-[#c2410c]">
              Resume
            </p>

            <h1 className="text-[42px] font-black leading-[0.88] tracking-[-0.055em]">
              {resume.name || "Your Name"}
            </h1>
          </div>

          {resume.headline && (
            <p className="max-w-[170px] shrink-0 text-right text-[9px] font-bold uppercase leading-[1.5] tracking-[0.18em] text-[#57534e]">
              {resume.headline}
            </p>
          )}
        </div>

        {contacts.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-[8.5px] text-[#78716c]">
            {contacts.map((item, index) => (
              <React.Fragment key={`${item}-${index}`}>
                <span>{item}</span>

                {index <
                  contacts.length - 1 && (
                  <span className="text-[#c2410c]">
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </header>

      <div className="mt-7 grid grid-cols-[1fr_175px] gap-10">
        <main className="space-y-7">
          {resume.summary && (
            <ModernBlock
              number="01"
              title="Profile"
            >
              <p className="text-[9.5px] leading-[1.8] text-[#44403c]">
                {resume.summary}
              </p>
            </ModernBlock>
          )}

          {experiences.length > 0 && (
            <ModernBlock
              number="02"
              title="Experience"
            >
              <div className="space-y-5">
                {experiences.map(
                  (item, index) => (
                    <ModernEntry
                      key={item.id || index}
                      title={
                        item.position ||
                        "Position"
                      }
                      meta={[
                        item.company,
                        item.location,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                      date={formatDateRange(
                        item.startDate,
                        item.endDate
                      )}
                      description={
                        item.description
                      }
                    />
                  )
                )}
              </div>
            </ModernBlock>
          )}

          {projects.length > 0 && (
            <ModernBlock
              number="03"
              title="Projects"
            >
              <div className="space-y-5">
                {projects.map(
                  (item, index) => (
                    <ModernEntry
                      key={item.id || index}
                      title={
                        item.name ||
                        "Project"
                      }
                      meta={
                        Array.isArray(
                          item.technologies
                        )
                          ? item.technologies.join(
                              " · "
                            )
                          : ""
                      }
                      links={[
                        item.githubUrl,
                        item.liveUrl,
                      ].filter(Boolean)}
                      description={
                        item.description
                      }
                    />
                  )
                )}
              </div>
            </ModernBlock>
          )}
        </main>

        <aside className="space-y-7">
          {skills.length > 0 && (
            <ModernBlock
              number="04"
              title="Skills"
              compact
            >
              <div className="flex flex-wrap gap-1.5">
                {skills.map(
                  (skill, index) => (
                    <span
                      key={
                        skill?.id ||
                        index
                      }
                      className="
                        border
                        border-[#d6cfc0]
                        px-2
                        py-1
                        text-[8px]
                        font-semibold
                        text-[#44403c]
                      "
                    >
                      {typeof skill ===
                      "string"
                        ? skill
                        : skill?.name}
                    </span>
                  )
                )}
              </div>
            </ModernBlock>
          )}

          {education.length > 0 && (
            <ModernBlock
              number="05"
              title="Education"
              compact
            >
              <div className="space-y-4">
                {education.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                    >
                      <h3 className="text-[9.5px] font-bold">
                        {item.degree ||
                          "Degree"}
                      </h3>

                      <p className="mt-0.5 text-[8.5px] text-[#78716c]">
                        {item.institution}
                      </p>

                      {item.field && (
                        <p className="mt-0.5 text-[8px] text-[#a8a29e]">
                          {item.field}
                        </p>
                      )}

                      {item.endDate && (
                        <p className="mt-1 font-mono text-[7.5px] uppercase text-[#a8a29e]">
                          {item.endDate}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </ModernBlock>
          )}

          {certifications.length > 0 && (
            <ModernBlock
              number="06"
              title="Certifications"
              compact
            >
              <div className="space-y-3">
                {certifications.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                    >
                      <h3 className="text-[9px] font-bold">
                        {item.name}
                      </h3>

                      <p className="text-[8px] text-[#78716c]">
                        {item.issuer}
                      </p>
                    </div>
                  )
                )}
              </div>
            </ModernBlock>
          )}
        </aside>
      </div>
    </div>
  );
}

function ModernBlock({
  number,
  title,
  children,
  compact = false,
}) {
  return (
    <section className="break-inside-avoid">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-[7.5px] font-bold text-[#c2410c]">
          {number}
        </span>

        <h2 className="text-[9.5px] font-black uppercase tracking-[0.22em]">
          {title}
        </h2>

        <span className="h-px flex-1 bg-[#e7e1d5]" />
      </div>

      <div className={compact ? "" : ""}>
        {children}
      </div>
    </section>
  );
}

function ModernEntry({
  title,
  meta,
  date,
  links = [],
  description,
}) {
  return (
    <div className="break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[10.5px] font-bold text-[#1c1917]">
          {title}
        </h3>

        {date && (
          <span className="shrink-0 font-mono text-[7.5px] uppercase text-[#a8a29e]">
            {date}
          </span>
        )}
      </div>

      {meta && (
        <p className="mt-0.5 text-[8.5px] font-semibold text-[#c2410c]">
          {meta}
        </p>
      )}

      {links.length > 0 && (
        <p className="mt-0.5 text-[7.5px] text-[#a8a29e]">
          {links.join(" · ")}
        </p>
      )}

      {description && (
        <p className="mt-1.5 text-[9px] leading-[1.7] text-[#44403c]">
          {description}
        </p>
      )}
    </div>
  );
}

function formatDateRange(
  start,
  end
) {
  if (!start && !end) return "";

  if (!start) return end;

  if (!end) return `${start} — Present`;

  return `${start} — ${end}`;
}