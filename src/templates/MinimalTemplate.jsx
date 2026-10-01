import React from "react";

export default function MinimalTemplate({
  resume = {},
}) {
  const skills =
    resume.skills || [];

  const education =
    resume.educations || [];

  const certifications =
    resume.certifications || [];

  const experiences =
    resume.experiences || [];

  const projects =
    resume.projects || [];

  const contacts = [
    resume.email,
    resume.phone,
    resume.location,
    resume.linkedin,
    resume.github,
    resume.portfolio,
  ].filter(Boolean);

  return (
    <div className="min-h-[297mm] bg-white p-[19mm] font-sans text-[#1c1917]">
      <header className="grid grid-cols-[1fr_auto] gap-10">
        <div>
          <p className="mb-4 text-[8px] font-medium uppercase tracking-[0.3em] text-[#a8a29e]">
            Curriculum Vitae
          </p>

          <h1 className="text-[45px] font-light leading-[0.9] tracking-[-0.055em]">
            {resume.name || "Your Name"}
          </h1>

          {resume.headline && (
            <p className="mt-4 max-w-sm text-[11px] leading-[1.6] text-[#78716c]">
              {resume.headline}
            </p>
          )}
        </div>

        {contacts.length > 0 && (
          <div className="pt-1 text-right text-[8px] leading-[1.9] text-[#78716c]">
            {contacts.map(
              (item, index) => (
                <div key={`${item}-${index}`}>
                  {item}
                </div>
              )
            )}
          </div>
        )}
      </header>

      <div className="my-10 h-px bg-[#e7e1d5]" />

      <main className="grid grid-cols-[135px_1fr] gap-12">
        <aside className="space-y-9">
          {skills.length > 0 && (
            <MinimalSideBlock
              number="01"
              title="Skills"
            >
              <ul className="space-y-1.5">
                {skills.map(
                  (skill, index) => (
                    <li
                      key={
                        skill?.id ||
                        index
                      }
                      className="text-[9px] leading-[1.5] text-[#44403c]"
                    >
                      {typeof skill ===
                      "string"
                        ? skill
                        : skill?.name}
                    </li>
                  )
                )}
              </ul>
            </MinimalSideBlock>
          )}

          {education.length > 0 && (
            <MinimalSideBlock
              number="02"
              title="Education"
            >
              {education.map(
                (item, index) => (
                  <div
                    key={
                      item.id ||
                      index
                    }
                    className="mb-4 text-[9px] leading-[1.5] last:mb-0"
                  >
                    <p className="font-medium">
                      {item.degree}
                    </p>

                    <p className="text-[#78716c]">
                      {item.institution}
                    </p>

                    {item.field && (
                      <p className="text-[#a8a29e]">
                        {item.field}
                      </p>
                    )}

                    {item.endDate && (
                      <p className="mt-1 text-[7.5px] uppercase tracking-[0.1em] text-[#a8a29e]">
                        {item.endDate}
                      </p>
                    )}
                  </div>
                )
              )}
            </MinimalSideBlock>
          )}

          {certifications.length > 0 && (
            <MinimalSideBlock
              number="03"
              title="Certifications"
            >
              {certifications.map(
                (item, index) => (
                  <div
                    key={
                      item.id ||
                      index
                    }
                    className="mb-3 text-[9px] leading-[1.5] last:mb-0"
                  >
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-[#78716c]">
                      {item.issuer}
                    </p>
                  </div>
                )
              )}
            </MinimalSideBlock>
          )}
        </aside>

        <section className="space-y-9">
          {resume.summary && (
            <MinimalContent
              number="01"
              title="About"
            >
              <p className="text-[10px] leading-[1.8] text-[#292524]">
                {resume.summary}
              </p>
            </MinimalContent>
          )}

          {experiences.length > 0 && (
            <MinimalContent
              number="02"
              title="Experience"
            >
              <div className="space-y-6">
                {experiences.map(
                  (item, index) => (
                    <MinimalExperience
                      key={
                        item.id ||
                        index
                      }
                      item={item}
                    />
                  )
                )}
              </div>
            </MinimalContent>
          )}

          {projects.length > 0 && (
            <MinimalContent
              number="03"
              title="Projects"
            >
              <div className="space-y-6">
                {projects.map(
                  (item, index) => (
                    <div
                      key={
                        item.id ||
                        index
                      }
                    >
                      <h3 className="text-[11px] font-medium">
                        {item.name ||
                          "Project"}
                      </h3>

                      {Array.isArray(
                        item.technologies
                      ) &&
                        item.technologies
                          .length >
                          0 && (
                          <p className="mt-0.5 text-[8px] text-[#a8a29e]">
                            {item.technologies.join(
                              " · "
                            )}
                          </p>
                        )}

                      {item.description && (
                        <p className="mt-2 text-[9.5px] leading-[1.75] text-[#292524]">
                          {
                            item.description
                          }
                        </p>
                      )}

                      {(item.githubUrl ||
                        item.liveUrl) && (
                        <p className="mt-1.5 text-[7.5px] text-[#a8a29e]">
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
                    </div>
                  )
                )}
              </div>
            </MinimalContent>
          )}
        </section>
      </main>
    </div>
  );
}

function MinimalSideBlock({
  number,
  title,
  children,
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-[7.5px] text-[#c2410c]">
          {number}
        </span>

        <h2 className="text-[8.5px] font-medium uppercase tracking-[0.22em]">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );
}

function MinimalContent({
  number,
  title,
  children,
}) {
  return (
    <section>
      <div className="mb-4 flex items-baseline gap-3">
        <span className="text-[8px] text-[#c2410c]">
          {number}
        </span>

        <h2 className="text-[10px] font-medium uppercase tracking-[0.22em]">
          {title}
        </h2>

        <span className="h-px flex-1 bg-[#e7e1d5]" />
      </div>

      {children}
    </section>
  );
}

function MinimalExperience({
  item,
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[11px] font-medium">
          {item.position ||
            "Position"}
        </h3>

        <span className="shrink-0 text-[7.5px] uppercase tracking-[0.1em] text-[#a8a29e]">
          {formatDateRange(
            item.startDate,
            item.endDate
          )}
        </span>
      </div>

      <p className="mt-0.5 text-[8.5px] text-[#78716c]">
        {[
          item.company,
          item.location,
        ]
          .filter(Boolean)
          .join(" · ")}
      </p>

      {item.description && (
        <p className="mt-2 text-[9.5px] leading-[1.75] text-[#292524]">
          {item.description}
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