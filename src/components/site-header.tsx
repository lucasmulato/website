import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#proof", label: "proof" },
  { href: "#career", label: "career" },
  { href: "#contact", label: "contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <a href="#top" className="font-mono text-sm text-accent">
          {site.prompt} <span className="text-phosphor">❯</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-mono text-xs text-muted transition-colors hover:text-fg"
            >
              ./{n.label}
            </a>
          ))}
          <a
            href={site.links.llmsec}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-phosphor hover:underline"
          >
            LLM-SEC ↗
          </a>
        </nav>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center text-fg md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <div className={cn("border-t border-border md:hidden", open ? "block" : "hidden")}>
        <nav className="flex flex-col px-4 py-3">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex h-11 items-center font-mono text-sm text-muted hover:text-fg"
            >
              ./{n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
