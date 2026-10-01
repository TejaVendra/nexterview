import React from "react";

export default function ClassicTemplate({
  resume = {},
}) {
  const experiences =
    resume.experiences || [];

  const projects =
    resume.projects || [];

  const education =
    resume.educations || [];

  const skills =
    resume.skills || [];

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
    <div className="min-h-[297mm] bg-[#fffefa] p-[16mm] font-serif text-[#1c1917]">
      <header className="border-b-[3px] border-double border-[#1c1917] pb-5 text-center">
        <h1 className="text-[32px] font-bold tracking-[-0.02em]">
          {resume.name || "Your Name"}
        </h1>

        {resume.headline && (
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-[#57534e]">
            {resume.headline}
          </p>
        )}

        {contacts.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[8px] text-[#78716c]">
            {contacts.map(
              (item, index) => (
                <React.Fragment
                  key={`${item}-${index}`}
                >
                  <span>{item}</span>

                  {index <
                    contacts.length - 1 && (
                    <span className="text-[#a8a29e]">
                      •
                    </span>
                  )}
                </React.Fragment>
              )
            )}
          </div>
        )}
      </header>

      <main className="mt-6">
        {resume.summary && (
          <ClassicSection title="Professional Summary">
            <p className="text-[9.5px] italic leading-[1.75]">
              {resume.summary}
            </p>
          </ClassicSection>
        )}

        {experiences.length > 0 && (
          <ClassicSection title="Experience">
            {experiences.map(
              (item, index) => (
                <ClassicEntry
                  key={
                    item.id || index
                  }
                  title={
                    item.position ||
                    "Position"
                  }
                  sub={[
                    item.company,
                    item.location,
                  ]
                    .filter(Boolean)
                    .join(" — ")}
                  meta={formatDateRange(
                    item.startDate,
                    item.endDate
                  )}
                  text={
                    item.description
                  }
                />
              )
            )}
          </ClassicSection>
        )}

        {projects.length > 0 && (
          <ClassicSection title="Projects">
            {projects.map(
              (item, index) => (
                <ClassicEntry
                  key={
                    item.id || index
                  }
                  title={
                    item.name ||
                    "Project"
                  }
                  sub={
                    Array.isArray(
                      item.technologies
                    )
                      ? item.technologies.join(
                          " · "
                        )
                      : ""
                  }
                  meta=""
                  text={
                    item.description
                  }
                />
              )
            )}
          </ClassicSection>
        )}

        {education.length > 0 && (
          <ClassicSection title="Education">
            {education.map(
              (item, index) => (
                <ClassicEntry
                  key={
                    item.id || index
                  }
                  title={
                    item.degree ||
                    "Degree"
                  }
                  sub={[
                    item.institution,
                    item.field,
                  ]
                    .filter(Boolean)
                    .join(" — ")}
                  meta={formatDateRange(
                    item.startDate,
                    item.endDate
                  )}
                  text={item.grade}
                />
              )
            )}
          </ClassicSection>
        )}

        {skills.length > 0 && (
          <ClassicSection title="Skills">
            <p className="text-[9.5px] leading-[1.9]">
              {skills
                .map((skill) =>
                  typeof skill ===
                  "string"
                    ? skill
                    : skill?.name
                )
                .filter(Boolean)
                .join(
                  "   •   "
                )}
            </p>
          </ClassicSection>
        )}

        {certifications.length > 0 && (
          <ClassicSection title="Certifications">
            {certifications.map(
              (item, index) => (
                <ClassicEntry
                  key={
                    item.id || index
                  }
                  title={
                    item.name ||
                    "Certification"
                  }
                  sub={item.issuer}
                  meta={item.issueDate}
                />
              )
            )}
          </ClassicSection>
        )}
      </main>
    </div>
  );
}

function ClassicSection({
  title,
  children,
}) {
  return (
    <section className="mb-6 break-inside-avoid">
      <div className="mb-3 flex items-center gap-3">
        <h2 className="text-[9.5px] font-bold uppercase tracking-[0.22em]">
          {title}
        </h2>

        <span className="h-px flex-1 bg-[#d6cfc0]" />
      </div>

      <div className="text-[9.5px] leading-[1.7] text-[#292524]">
        {children}
      </div>
    </section>
  );
}

function ClassicEntry({
  title,
  sub,
  meta,
  text,
}) {
  return (
    <div className="mb-4 break-inside-avoid last:mb-0">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[11px] font-bold">
            {title}
          </h3>

          {sub && (
            <p className="mt-0.5 text-[9px] italic text-[#57534e]">
              {sub}
            </p>
          )}
        </div>

        {meta && (
          <span className="shrink-0 text-[8px] uppercase tracking-[0.1em] text-[#78716c]">
            {meta}
          </span>
        )}
      </div>

      {text && (
        <p className="mt-1.5 leading-[1.65]">
          {text}
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