import React from "react";

export default function ProfessionalTemplate({
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
    <div className="min-h-[297mm] bg-white font-sans text-[#1c1917]">
      <header className="bg-[#1c1917] px-[16mm] pb-[11mm] pt-[14mm] text-white">
        <p className="mb-3 text-[8px] font-semibold uppercase tracking-[0.28em] text-white/40">
          Professional Resume
        </p>

        <h1 className="text-[38px] font-bold leading-none tracking-[-0.04em]">
          {resume.name || "Your Name"}
        </h1>

        {resume.headline && (
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c2410c]">
            {resume.headline}
          </p>
        )}

        <div className="mt-5 h-px bg-white/15" />

        {contacts.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1 text-[8.5px] text-white/65">
            {contacts.map(
              (item, index) => (
                <React.Fragment
                  key={`${item}-${index}`}
                >
                  <span>{item}</span>

                  {index <
                    contacts.length - 1 && (
                    <span className="text-[#c2410c]">
                      /
                    </span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        )}
      </header>

      <div className="grid grid-cols-[1fr_160px] gap-10 px-[16mm] py-[12mm]">
        <main className="space-y-7">
          {resume.summary && (
            <ProfessionalPart
              title="Summary"
              number="01"
            >
              <p className="text-[9.5px] leading-[1.8] text-[#292524]">
                {resume.summary}
              </p>
            </ProfessionalPart>
          )}

          {experiences.length > 0 && (
            <ProfessionalPart
              title="Experience"
              number="02"
            >
              <div className="space-y-5">
                {experiences.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                      className="break-inside-avoid"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-[11px] font-bold">
                          {item.position ||
                            "Position"}
                        </h3>

                        <span className="shrink-0 font-mono text-[7.5px] uppercase text-[#78716c]">
                          {formatDateRange(
                            item.startDate,
                            item.endDate
                          )}
                        </span>
                      </div>

                      <p className="mt-0.5 text-[8.5px] font-semibold text-[#c2410c]">
                        {item.company}

                        {item.location && (
                          <span className="text-[#a8a29e]">
                            {" "}
                            ·{" "}
                            {
                              item.location
                            }
                          </span>
                        )}
                      </p>

                      {item.description && (
                        <p className="mt-2 text-[9.5px] leading-[1.75] text-[#292524]">
                          {
                            item.description
                          }
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </ProfessionalPart>
          )}

          {projects.length > 0 && (
            <ProfessionalPart
              title="Projects"
              number="03"
            >
              <div className="space-y-5">
                {projects.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                      className="break-inside-avoid"
                    >
                      <h3 className="text-[11px] font-bold">
                        {item.name ||
                          "Project"}
                      </h3>

                      {Array.isArray(
                        item.technologies
                      ) &&
                        item.technologies
                          .length >
                          0 && (
                          <p className="mt-0.5 text-[8px] font-medium text-[#c2410c]">
                            {item.technologies.join(
                              " · "
                            )}
                          </p>
                        )}

                      {(item.githubUrl ||
                        item.liveUrl) && (
                        <p className="mt-0.5 font-mono text-[7.5px] text-[#a8a29e]">
                          {[
                            item.githubUrl,
                            item.liveUrl,
                          ]
                            .filter(
                              Boolean
                            )
                            .join(
                              " · "
                            )}
                        </p>
                      )}

                      {item.description && (
                        <p className="mt-1.5 text-[9.5px] leading-[1.75] text-[#292524]">
                          {
                            item.description
                          }
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </ProfessionalPart>
          )}
        </main>

        <aside className="space-y-7">
          {skills.length > 0 && (
            <ProfessionalPart
              title="Skills"
              number="04"
              compact
            >
              <ul className="space-y-2">
                {skills.map(
                  (skill, index) => (
                    <li
                      key={
                        skill?.id ||
                        index
                      }
                      className="flex items-center gap-2 text-[8.5px] text-[#292524]"
                    >
                      <span className="h-1 w-1 shrink-0 bg-[#c2410c]" />

                      {typeof skill ===
                      "string"
                        ? skill
                        : skill?.name}
                    </li>
                  )
                )}
              </ul>
            </ProfessionalPart>
          )}

          {education.length > 0 && (
            <ProfessionalPart
              title="Education"
              number="05"
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
            </ProfessionalPart>
          )}

          {certifications.length > 0 && (
            <ProfessionalPart
              title="Certifications"
              number="06"
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

                      {item.issueDate && (
                        <p className="mt-0.5 font-mono text-[7.5px] text-[#a8a29e]">
                          {
                            item.issueDate
                          }
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </ProfessionalPart>
          )}
        </aside>
      </div>
    </div>
  );
}

function ProfessionalPart({
  title,
  number,
  children,
}) {
  return (
    <section className="break-inside-avoid">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 bg-[#c2410c]" />

        <h2 className="text-[9.5px] font-bold uppercase tracking-[0.22em]">
          {title}
        </h2>

        <span className="ml-auto font-mono text-[7.5px] text-[#a8a29e]">
          {number}
        </span>
      </div>

      {children}
    </section>
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