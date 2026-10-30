import type { Education, Experience } from "@/content/types";

type CompanyRow = { company: string; role: string; years: string; summary?: string };

const year = (s = "") => s.match(/\d{4}/g)?.at(-1) ?? s.trim();

/** One row per company: consecutive roles are merged and internships are left out. */
function byCompany(experience: Experience[]): CompanyRow[] {
  const rows: (CompanyRow & { start: string; end: string })[] = [];
  for (const job of experience.filter((j) => !j.internship)) {
    const [from, to] = job.period.split(/\s+[-–]\s+/);
    const last = rows.at(-1);
    if (last?.company === job.company) {
      last.start = year(from);
    } else {
      rows.push({
        company: job.company,
        role: job.role,
        summary: job.summary ?? job.points?.[0],
        start: year(from),
        end: year(to ?? from),
        years: "",
      });
    }
  }
  return rows.map(({ start, end, ...row }) => ({ ...row, years: start === end ? start : `${start} – ${end}` }));
}

export function Background({ experience, education }: { experience: Experience[]; education: Education[] }) {
  const rows = byCompany(experience);
  return (
    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
      {rows.length > 0 && (
        <div>
          <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Experience</h3>
          <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {rows.map((row) => (
              <li key={row.company} className="px-6 py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-semibold">
                    {row.company} <span className="font-normal text-muted">· {row.role}</span>
                  </p>
                  <p className="font-mono text-xs text-muted">{row.years}</p>
                </div>
                {row.summary && <p className="mt-1.5 text-sm leading-relaxed text-muted">{row.summary}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
      {education.length > 0 && (
        <div>
          <h3 className="font-mono text-xs tracking-wider text-muted uppercase">Education</h3>
          <ol className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {education.map((ed) => (
              <li key={ed.degree} className="px-6 py-5">
                <p className="font-medium leading-snug">{ed.degree}</p>
                <p className="mt-1 text-sm text-muted">{ed.school}</p>
                {ed.period && <p className="mt-1 font-mono text-xs text-muted">{ed.period}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
