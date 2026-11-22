import { createFileRoute } from "@tanstack/react-router";
import { SiteShell, Severity } from "@/components/site-shell";
import { findings } from "@/data/content";

export const Route = createFileRoute("/findings")({ component: FindingsPage });

function FindingsPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-5 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Research notes
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Findings</h1>
        <p className="mt-4 max-w-2xl text-muted">
          Condensed attack chains from lab targets. Each one is written so a
          defender can reproduce the idea and close the gap. These are patterns,
          not exploits against a named product.
        </p>
        <div className="mt-10 flex flex-col gap-6">
          {findings.map((f) => (
            <article
              id={f.slug}
              key={f.slug}
              className="scroll-mt-24 rounded-md border border-border bg-surface p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-medium">{f.title}</h2>
                <Severity level={f.severity} />
              </div>
              <p className="mt-1 font-mono text-xs text-muted">{f.surface}</p>
              <p className="mt-4 text-sm text-fg">{f.summary}</p>
              <h3 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
                Reproduction
              </h3>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
                {f.chain.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <h3 className="mt-5 font-mono text-xs uppercase tracking-wider text-primary">
                Defense
              </h3>
              <p className="mt-2 text-sm text-muted">{f.defense}</p>
            </article>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
