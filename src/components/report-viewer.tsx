import { useState } from "react";
import { reports } from "@/lib/site";
import { cn } from "@/lib/utils";

type ReportId = (typeof reports)[number]["id"];

const severityColor: Record<string, string> = {
  Critical: "text-danger border-danger/40",
  High: "text-warn border-warn/40",
};

export function ReportViewer() {
  const [active, setActive] = useState<ReportId>(reports[0].id);
  const report = reports.find((r) => r.id === active) ?? reports[0];

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      <div className="flex gap-1 overflow-x-auto border-b border-border p-2">
        {reports.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setActive(r.id)}
            className={cn(
              "h-11 shrink-0 rounded-sm px-3 font-mono text-xs",
              active === r.id ? "bg-elevated text-accent" : "text-muted hover:text-fg",
            )}
          >
            {r.code}
          </button>
        ))}
      </div>
      <article className="grid gap-6 p-5 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-xs border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide",
                severityColor[report.severity],
              )}
            >
              {report.severity}
            </span>
            <span className="font-mono text-[11px] text-subtle">
              confidence {(report.confidence * 100).toFixed(0)}%
            </span>
          </div>
          <h3 className="text-lg font-medium text-fg">{report.title}</h3>
          <p className="text-sm text-muted">{report.summary}</p>
          <p className="font-mono text-[11px] text-subtle">
            {report.owasp}
            <br />
            target · {report.target}
          </p>
          <ol className="space-y-2 border-l border-border pl-4">
            {report.chain.map((step) => (
              <li key={step} className="text-sm text-muted">
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-4">
          <pre className="overflow-x-auto rounded-md border border-border bg-bg p-4 font-mono text-[12px] leading-5 text-phosphor">
            {report.repro}
          </pre>
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wide text-subtle">
              Defense
            </p>
            <ul className="space-y-2">
              {report.defense.map((d) => (
                <li key={d} className="text-sm text-muted">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </div>
  );
}
