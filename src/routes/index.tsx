import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell, Severity } from "@/components/site-shell";
import { findings } from "@/data/content";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <SiteShell>
      <main>
        <section className="mx-auto max-w-5xl px-5 pb-16 pt-16 sm:pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
            AI red team · agents · RAG
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
            I break AI systems so defenders can build better ones.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Independent red teamer focused on multi-step attacks against agents,
            retrieval, memory, and tool use — not single-prompt jailbreaks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/llm-sec"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-ink"
            >
              Explore LLM-SEC <ArrowRight size={16} />
            </Link>
            <Link
              to="/findings"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border px-5 text-sm text-fg"
            >
              View findings
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center justify-center rounded-md px-5 text-sm text-muted"
            >
              Available for research
            </Link>
          </div>
        </section>

        <section className="border-y border-border bg-surface/60">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 md:grid-cols-3">
            {[
              ["Focus", "Agent security, indirect injection, memory poisoning, excessive agency."],
              ["Method", "Full chains: recon, inject, persist, escalate, impact — with a defense."],
              ["Output", "Reproducible findings and an open toolkit teams can run themselves."],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-xs uppercase tracking-wider text-primary">{k}</p>
                <p className="mt-2 text-sm text-muted">{v}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-medium">LLM-SEC</h2>
            <Link to="/llm-sec" className="text-sm text-primary">
              Project page
            </Link>
          </div>
          <p className="mt-3 max-w-2xl text-muted">
            An open campaign engine for red-teaming LLM applications. It orchestrates
            multi-step attacks against agents, RAG pipelines, and tool permissions,
            then writes findings a defender can act on.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Campaign orchestration, not one-shot prompts",
              "Retrieval and memory treated as attack surface",
              "Tool-use and agency boundary checks",
              "Reports mapped toward OWASP LLM Top 10",
            ].map((item) => (
              <li
                key={item}
                className="rounded-md border border-border bg-surface px-4 py-3 text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-medium">Proof of work</h2>
            <Link to="/findings" className="text-sm text-primary">
              All findings
            </Link>
          </div>
          <div className="mt-6 grid gap-4">
            {findings.map((f) => (
              <Link
                key={f.slug}
                to="/findings"
                hash={f.slug}
                className="block rounded-md border border-border bg-surface p-5 hover:border-primary/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{f.title}</p>
                  <Severity level={f.severity} />
                </div>
                <p className="mt-2 text-sm text-muted">{f.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
