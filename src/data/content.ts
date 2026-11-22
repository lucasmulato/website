export type Finding = {
  slug: string;
  title: string;
  surface: string;
  severity: "Critical" | "High" | "Medium";
  summary: string;
  chain: string[];
  defense: string;
};

export const findings: Finding[] = [
  {
    slug: "memory-poison-goal-hijack",
    title: "Memory poison → goal hijack → unauthorized tool call",
    surface: "Tool-calling agent with persistent memory",
    severity: "Critical",
    summary:
      "A planted memory note survives later sessions and rewrites the agent’s objective so a routine tool call exfiltrates data the user never requested.",
    chain: [
      "Write a benign-looking preference into long-term memory.",
      "Wait for a later turn that loads that memory as trusted context.",
      "The rewritten goal issues a tool call outside the user’s intent.",
    ],
    defense:
      "Treat retrieved memory as untrusted input. Separate user goals from stored notes, and require a fresh confirmation before high-impact tool calls.",
  },
  {
    slug: "rag-indirect-injection",
    title: "Indirect prompt injection through retrieved documents",
    surface: "RAG assistant over internal docs",
    severity: "High",
    summary:
      "A document the retriever ranks highly contains hidden instructions that override the system prompt and leak neighboring chunks.",
    chain: [
      "Plant instructions inside a document the index will retrieve.",
      "Ask a normal question that pulls that document into context.",
      "The model follows the document, not the system policy.",
    ],
    defense:
      "Fence retrieved text, strip instruction-like spans, and constrain the model to answer from quoted evidence only.",
  },
  {
    slug: "agency-scope-creep",
    title: "Agency scope creep across connected tools",
    surface: "Multi-tool agent (mail, files, browser)",
    severity: "High",
    summary:
      "A narrow task is expanded, step by step, until the agent uses a second tool the original request never authorized.",
    chain: [
      "Start with an allowed read on one tool.",
      "Ask the agent to “finish the task” using whatever it can reach.",
      "The planner chains into a write or send action on another integration.",
    ],
    defense:
      "Bind every tool to an explicit allow-list for the current task, and fail closed when the planner proposes a new capability.",
  },
];

export const modules = [
  {
    name: "Campaign engine",
    detail:
      "LangGraph-style orchestration that runs multi-step attack campaigns instead of one-shot jailbreak prompts.",
  },
  {
    name: "Vector Guard",
    detail:
      "Probes retrieval: poisoned chunks, ranking manipulation, and instructions hidden in documents the model will trust.",
  },
  {
    name: "Agency Auditor",
    detail:
      "Exercises tool-use, memory, and permission boundaries. Looks for goal hijack and calls the user never asked for.",
  },
  {
    name: "Finding reports",
    detail:
      "Each run ends as a finding: what happened, how to reproduce it, severity, and a defense a team can ship.",
  },
];

export const mappings = [
  { id: "LLM01", name: "Prompt injection", note: "Direct and indirect, including retrieved content." },
  { id: "LLM02", name: "Sensitive disclosure", note: "System prompt, memory, and neighboring RAG chunks." },
  { id: "LLM06", name: "Excessive agency", note: "Tool scope creep and unauthorized actions." },
  { id: "LLM08", name: "Vector / embedding weakness", note: "Poisoned or misleading retrieval." },
  { id: "ATLAS", name: "AML.T0051 / tool abuse", note: "Mapped qualitatively to agent tool misuse." },
];
