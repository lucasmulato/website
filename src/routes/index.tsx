import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Terminal } from "@/components/terminal";
import { ReportViewer } from "@/components/report-viewer";
import { Button } from "@/components/ui/button";
import {
  architecture,
  capabilities,
  education,
  experience,
  site,
} from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

function Home() {
  return (
    <div id="top" className="relative min-h-dvh bg-bg">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] grid-fade" />
      <div className="scanlines pointer-events-none fixed inset-0 z-[1] opacity-[0.18]" />
      <SiteHeader />

      <main className="relative mx-auto max-w-6xl px-4">
        <section className="grid gap-12 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <p className="font-mono text-sm text-muted">
              {site.name} · AI Red Teamer
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-medium leading-[1.12] tracking-tight text-fg md:text-5xl">
              I break AI systems
              <br />
              so defenders can
              <br />
              <span className="text-accent">build better ones.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base text-muted">{site.blurb}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={site.links.llmsec} target="_blank" rel="noreferrer">
                  View LLM-SEC
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="#proof">Read findings</a>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ["LLMs & Agents", "Primary surface"],
                ["Open Source", "Toolkit on GitHub"],
                ["Purple Team", "Offense & defense"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] text-accent">{k}</dt>
                  <dd className="mt-1 text-sm text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Terminal />
        </section>

        <section id="about" className="scroll-mt-20 border-t border-border py-16 md:py-20">
          <SectionLabel>About me</SectionLabel>
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-medium tracking-tight">
                Researching the attack surface of intelligent systems
              </h2>
              <p className="mt-5 text-muted">
                I'm a Brazilian security researcher focused on one of the most
                under-explored frontiers in offensive security: adversarial attacks
                against AI systems. While the industry races to deploy LLMs and
                autonomous agents, I research how they break.
              </p>
              <p className="mt-4 text-muted">
                The work sits at the intersection of red teaming and AI safety —
                prompt injection, goal hijacking in tool-calling agents, poisoning
                RAG knowledge bases, and how small inputs cascade into catastrophic
                model behavior.
              </p>
            </div>
            <p className="text-muted">
              Before pivoting to AI security I built a foundation in malware
              analysis, traditional pentesting, and purple team operations. That
              adversarial mindset now applies directly to AI systems — the attack
              surface just got more interesting.
            </p>
          </div>
        </section>

        <section className="border-t border-border py-16 md:py-20">
          <SectionLabel>Capabilities</SectionLabel>
          <h2 className="mb-8 text-3xl font-medium tracking-tight">What I research & break</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {capabilities.map((c) => (
              <article
                key={c.id}
                className="rounded-md border border-border bg-surface p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-medium">{c.label}</h3>
                  {"badge" in c && c.badge ? (
                    <span className="font-mono text-[10px] uppercase tracking-wide text-phosphor">
                      {c.badge}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm text-muted">{c.body}</p>
                <p className="mt-4 font-mono text-[11px] text-subtle">{c.tags.join(" · ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-20 border-t border-border py-16 md:py-20">
          <SectionLabel>Featured project</SectionLabel>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-medium tracking-tight">LLM-SEC</h2>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted hover:text-accent"
            >
              All repos →
            </a>
          </div>
          <p className="max-w-2xl text-muted">
            Most security tools use AI to find bugs in your app.{" "}
            <span className="text-fg">LLM-SEC finds the bugs in your AI.</span> A
            production-oriented adversarial engine for teams shipping RAG
            pipelines, agents with tools, and chatbots with memory.
          </p>
          <p className="mt-3 font-mono text-xs text-phosphor">★ FEATURED · Active</p>

          <div className="mt-8 overflow-hidden rounded-lg border border-border">
            <div className="grid md:grid-cols-2">
              <div className="space-y-4 p-5 md:p-6">
                <p className="text-sm text-muted">
                  We don't test prompts in isolation. We test systems: poisoned
                  embeddings → trusted retrieval → unauthorized action. Failures
                  that never show up on a classic pentest report.
                </p>
                <ul className="space-y-3">
                  {architecture.map((row) => (
                    <li key={row.name} className="border-l border-accent/40 pl-3">
                      <p className="font-mono text-xs text-accent">{row.name}</p>
                      <p className="text-sm text-muted">{row.purpose}</p>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" asChild>
                  <a href={site.links.llmsec} target="_blank" rel="noreferrer">
                    <Github className="size-4" />
                    github.com/lucasmulato/LLM-SEC
                  </a>
                </Button>
              </div>
              <pre className="border-t border-border bg-bg p-5 font-mono text-[12px] leading-5 text-phosphor md:border-t-0 md:border-l">
{`python -m llmsec campaign \\
  --target http://localhost:8000 \\
  --config configs/rag_fullstack.yml

# Inspect vector DB
python -m llmsec vector-guard \\
  --db weaviate --collection documents

# Audit excessive agency
python -m llmsec agency-audit \\
  --spec agent_config.json`}
              </pre>
            </div>
          </div>

          <article className="mt-4 rounded-md border border-border bg-surface p-5">
            <p className="font-mono text-[11px] text-subtle">Front-end · Security · Live</p>
            <h3 className="mt-2 font-medium">Alta Cúpula CTF Blog</h3>
            <p className="mt-2 text-sm text-muted">
              Team blog for write-up publishing. Custom front-end, dark cyber
              aesthetic.
            </p>
            <a
              href={site.links.ctf}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex h-11 items-center font-mono text-xs text-accent"
            >
              View project ↗
            </a>
          </article>
        </section>

        <section id="proof" className="scroll-mt-20 border-t border-border py-16 md:py-20">
          <SectionLabel>Proof of work</SectionLabel>
          <h2 className="text-3xl font-medium tracking-tight">
            Sample findings, not a pitch deck
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Independent research notes from LLM-SEC-style campaigns. Each finding
            is a case file: chain, reproduction, confidence, OWASP LLM mapping,
            and what a defender should change. Open a ticket below.
          </p>
          <div className="mt-8">
            <ReportViewer />
          </div>
        </section>

        <section id="career" className="scroll-mt-20 border-t border-border py-16 md:py-20">
          <SectionLabel>Career</SectionLabel>
          <h2 className="mb-8 text-3xl font-medium tracking-tight">Experience</h2>
          <ol className="space-y-8">
            {experience.map((job) => (
              <li
                key={job.role}
                className="grid gap-2 border-l border-border pl-5 md:grid-cols-[180px_1fr]"
              >
                <p className="font-mono text-xs text-subtle">{job.period}</p>
                <div>
                  <h3 className="font-medium">{job.role}</h3>
                  <p className="text-sm text-accent">{job.org}</p>
                  <ul className="mt-3 space-y-2">
                    {job.bullets.map((b) => (
                      <li key={b} className="text-sm text-muted">
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-14 mb-6 text-xl font-medium">Formation</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {education.map((ed) => (
              <div key={ed.title} className="rounded-md border border-border p-4">
                <p className="font-mono text-[11px] text-subtle">{ed.year}</p>
                <p className="mt-1 font-medium">{ed.title}</p>
                <p className="text-sm text-muted">{ed.place}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 border-t border-border py-16 md:py-24">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-3xl font-medium tracking-tight">
            Let's work on AI security together
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Red team an AI product, review an LLM integration, or collaborate on
            adversarial research. Fluent English. Based in {site.location}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="size-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={site.links.github} target="_blank" rel="noreferrer">
                <Github className="size-4" />
                GitHub
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={site.links.x} target="_blank" rel="noreferrer">
                X / Twitter
              </a>
            </Button>
          </div>
          <p className="mt-10 font-mono text-xs text-subtle">
            {site.status}
            <span className="ml-2 inline-block size-1.5 animate-pulse rounded-full bg-phosphor" />
          </p>
        </section>
      </main>
    </div>
  );
}
