import { useEffect, useMemo, useRef, useState } from "react";
import { site, focus } from "@/lib/site";

type Line = { kind: "in" | "out" | "sys"; text: string };

const HELP = [
  "whoami          identity",
  "cat focus.txt   current research",
  "ls              projects",
  "cat status      availability",
  "open llm-sec    GitHub",
  "help            this list",
  "clear           reset",
];

function reply(cmd: string): Line[] {
  const c = cmd.trim().toLowerCase();
  if (!c) return [];
  if (c === "help" || c === "?") return HELP.map((t) => ({ kind: "out", text: t }));
  if (c === "whoami") return [{ kind: "out", text: "lucas_mulato" }];
  if (c === "cat focus.txt" || c === "cat focus")
    return focus.map((t) => ({ kind: "out", text: `▸ ${t}` }));
  if (c === "ls" || c === "ls projects")
    return [
      { kind: "out", text: "LLM-SEC/" },
      { kind: "out", text: "alta-cupula-ctf/" },
      { kind: "out", text: "research-notes/" },
    ];
  if (c === "cat status" || c === "echo $status")
    return [{ kind: "sys", text: site.status }];
  if (c === "open llm-sec" || c === "open github")
    return [{ kind: "sys", text: site.links.llmsec }];
  return [{ kind: "out", text: `command not found: ${cmd}  — try help` }];
}

export function Terminal() {
  const boot = useMemo<Line[]>(
    () => [
      { kind: "sys", text: `${site.prompt} session` },
      { kind: "in", text: "whoami" },
      { kind: "out", text: "lucas_mulato" },
      { kind: "in", text: "cat focus.txt" },
      ...focus.slice(0, 4).map((t) => ({ kind: "out" as const, text: `▸ ${t}` })),
      { kind: "in", text: "echo $STATUS" },
      { kind: "sys", text: site.status },
    ],
    [],
  );

  const [lines, setLines] = useState<Line[]>(boot);
  const [value, setValue] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (cmd.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    if (cmd.toLowerCase() === "open llm-sec" || cmd.toLowerCase() === "open github") {
      window.open(site.links.llmsec, "_blank", "noopener,noreferrer");
    }
    setLines((prev) => [...prev, { kind: "in", text: cmd || " " }, ...reply(cmd)]);
  }

  return (
    <div
      className="overflow-hidden rounded-lg border border-border bg-surface"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-xs text-muted">
        <span className="size-2 rounded-full bg-danger/80" />
        <span className="size-2 rounded-full bg-warn/80" />
        <span className="size-2 rounded-full bg-phosphor/80" />
        <span className="ml-2 truncate">whoami.sh</span>
      </div>
      <div className="max-h-80 overflow-auto p-4 font-mono text-[13px] leading-6">
        {lines.map((l, i) => (
          <div key={`${i}-${l.text}`} className="whitespace-pre-wrap">
            {l.kind === "in" ? (
              <span>
                <span className="text-accent">{site.prompt}</span>
                <span className="text-phosphor"> ❯ </span>
                <span className="text-fg">{l.text}</span>
              </span>
            ) : (
              <span className={l.kind === "sys" ? "text-phosphor" : "text-muted"}>{l.text}</span>
            )}
          </div>
        ))}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
          className="flex items-center gap-2"
        >
          <span className="shrink-0 text-accent">{site.prompt}</span>
          <span className="text-phosphor">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Terminal command"
            className="min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-subtle"
            placeholder="help"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
}
