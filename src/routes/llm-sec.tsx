import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { mappings, modules } from "@/data/content";

export const Route = createFileRoute("/llm-sec")({ component: LlmSec });

function LlmSec() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-5 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Open toolkit
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight sm:text-5xl">
          LLM-SEC
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Multi-step attack orchestration for agents, RAG systems, memory, and
          tools. Built so a finding is a chain with a defense, not a clever prompt.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="https://github.com/lucasmulato/LLM-SEC"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-ink"
          >
            View on GitHub
          </a>
          <Link
            to="/findings"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border px-5 text-sm"
          >
            Sample findings
          </Link>
        </div>

        <section className="mt-16">
          <h2 className="text-xl font-medium">What it does</h2>
          <p className="mt-3 max-w-3xl text-muted">
            LLM-SEC runs campaigns. A planner chooses probes, a harness talks to
            the target (chat, retrieval, tools, memory), and a reporter turns the
            trace into a reproducible finding. The interesting bugs live in the
            handoff between those parts.
          </p>
        </section>

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <article key={m.name} className="rounded-md border border-border bg-surface p-5">
              <h3 className="font-medium">{m.name}</h3>
              <p className="mt-2 text-sm text-muted">{m.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-medium">Quick start</h2>
          <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-surface p-4 font-mono text-sm leading-relaxed text-fg">
{`# illustrative — pin versions in the repo README
git clone <llm-sec>
cd llm-sec
python -m venv .venv && source .venv/bin/activate
pip install -e .

llm-sec run --target ./examples/rag-agent.yaml --campaign memory-poison`}
          </pre>
          <p className="mt-3 text-sm text-muted">
            Point a campaign at a local agent or a documented API. Do not run
            against systems you do not own or lack written permission to test.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-medium">Architecture</h2>
          <ol className="mt-4 grid gap-3 text-sm md:grid-cols-4">
            {[
              ["1. Scope", "Target, tools, memory, and success criteria."],
              ["2. Campaign", "Graph of probes: inject, persist, escalate."],
              ["3. Harness", "Calls the model, retriever, and tools under test."],
              ["4. Report", "Chain, evidence, severity, defense."],
            ].map(([t, d]) => (
              <li key={t} className="rounded-md border border-border p-4">
                <p className="font-mono text-xs text-primary">{t}</p>
                <p className="mt-2 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-medium">Framework mapping</h2>
          <p className="mt-2 text-sm text-muted">
            Qualitative coverage. Not a certification.
          </p>
          <ul className="mt-4 divide-y divide-border rounded-md border border-border">
            {mappings.map((m) => (
              <li key={m.id} className="grid gap-1 px-4 py-3 sm:grid-cols-[8rem_1fr]">
                <span className="font-mono text-xs text-primary">{m.id}</span>
                <span className="text-sm">
                  <span className="text-fg">{m.name}</span>
                  <span className="text-muted"> — {m.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-xl font-medium">Status</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>Active: campaign runner, RAG probes, tool-boundary checks.</li>
            <li>Next: repeatable example targets, CI regression mode, clearer public docs.</li>
            <li>Not a hosted scanner. You run it against systems you are allowed to test.</li>
          </ul>
        </section>

        <section className="mt-14 rounded-md border border-border bg-surface p-6">
          <h2 className="text-xl font-medium">Use it or commission an assessment</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Star the repository, run a campaign on a lab target, or talk about a
            scoped red team of an agent you ship. Findings stay written so a
            defender can reproduce and close them.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/about"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-ink"
            >
              Contact for assessments
            </Link>
            <Link
              to="/findings"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border px-5 text-sm"
            >
              Read sample findings
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
