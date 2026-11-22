import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/llm-sec", label: "LLM-SEC" },
  { to: "/findings", label: "Findings" },
  { to: "/about", label: "About" },
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-fg">
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-mono text-sm tracking-wide text-primary">
            LM / RED TEAM
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={path === l.to ? "text-fg" : "hover:text-fg"}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md border border-border text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col border-t border-border px-5 py-2 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      {children}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <p>Lucas Mulato · AI red team · Brazil, remote</p>
          <p className="font-mono text-xs">Agents · RAG · tool use</p>
        </div>
      </footer>
    </div>
  );
}

export function Severity({ level }: { level: string }) {
  const tone = level === "Critical" || level === "High" ? "text-warn" : "text-muted";
  return (
    <span className={`font-mono text-xs uppercase tracking-wider ${tone}`}>{level}</span>
  );
}
