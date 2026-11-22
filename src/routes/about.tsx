import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({ component: About });

const proofs = [
  {
    title: "He builds the tool, not just the write-up",
    body: "LLM-SEC is his own repository — Rust, tagged ai-security and ai-systems, described as “I break LLM.” The point is a campaign against model behavior, not a notebook of prompts.",
    href: "https://github.com/lucasmulato/LLM-SEC",
    label: "github.com/lucasmulato/LLM-SEC",
  },
  {
    title: "He can ship a whole system around a model",
    body: "karen (v0.1.0) is a local-first security copilot: Node API, React 19 UI, Postgres with pgvector, a local Qwen model through llama.cpp, Markdown notes, and commands that stay allowlisted and human-approved. That is product engineering plus a security boundary.",
    href: "https://github.com/lucasmulato/karen",
    label: "github.com/lucasmulato/karen",
  },
  {
    title: "The range is deliberate",
    body: "Recent public work spans Rust, TypeScript, Python, and Java — LLM-SEC, a portfolio site tagged infosec and malware analysis, DIO projects on AI agents and a Java API, and a real-estate demo app. He moves between the attack and the thing being attacked.",
    href: "https://github.com/lucasmulato?tab=repositories",
    label: "Public repositories",
  },
  {
    title: "He trains on a ladder, not a vibe",
    body: "50Cyber is his own curriculum: 50 projects from labs and crypto up through reverse engineering, sandboxes, smart-contract audit, and kernel-level work. He also keeps Cyfrin’s security-and-auditing course and a blockchain security library in the same account.",
    href: "https://github.com/lucasmulato/50Cyber",
    label: "github.com/lucasmulato/50Cyber",
  },
];

function About() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-5xl px-5 py-16">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
          Why he can do this
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">Lucas Mulato</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Independent security researcher in São Paulo. Capable here means he
          already does the job in public: he designs attacks on LLMs, and he
          builds the software those attacks run against.
        </p>

        <section className="mt-12 grid gap-4">
          {proofs.map((p) => (
            <article key={p.title} className="rounded-md border border-border bg-surface p-5">
              <h2 className="text-lg font-medium">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
              <a href={p.href} className="mt-3 inline-flex font-mono text-xs text-primary">
                {p.label}
              </a>
            </article>
          ))}
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-medium">What that adds up to</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted">
              <li>Offensive instinct with a builder’s stack, not a slide deck.</li>
              <li>Comfortable alone on a repo: API, UI, data, local model, threat model.</li>
              <li>Writes in public in Portuguese and English — the Tumblr is the long-form mind; the GitHub is the proof.</li>
              <li>Self-directed. The projects are his, including the curriculum.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-medium">How he works</h2>
            <ul className="mt-3 space-y-3 text-sm text-muted">
              <li>Only systems he owns or has written permission to test.</li>
              <li>Chains over one-shot jailbreaks.</li>
              <li>A finding is unfinished until a defender can close it.</li>
              <li>Based in São Paulo, working remote.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-md border border-border bg-surface p-6">
          <h2 className="text-xl font-medium">Available for research and consulting</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Scoped red teams of agents and RAG products, review of an eval
            harness, or a joint write-up. Time-boxed, and limited to systems
            you own.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://github.com/lucasmulato/LLM-SEC"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-ink"
            >
              LLM-SEC on GitHub
            </a>
            <Link to="/llm-sec" className="text-sm text-primary">
              Project page
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
