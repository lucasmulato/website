export const site = {
  name: "Lucas Mulato",
  title: "Lucas Mulato · AI Red Teamer",
  prompt: "~/security/ai-red-team",
  tagline: "I break AI systems so defenders can build better ones.",
  status: "Available for research & consulting",
  location: "São Paulo, Brazil",
  blurb:
    "AI security researcher focused on adversarial attacks against LLMs, autonomous agents, and RAG pipelines. Prompt injection, goal hijacking, memory poisoning — I find the edge cases before attackers do.",
  links: {
    github: "https://github.com/lucasmulato",
    llmsec: "https://github.com/lucasmulato/LLM-SEC",
    linkedin: "https://www.linkedin.com/in/lucasmulato",
    x: "https://twitter.com/yasukeiwakura",
    instagram: "https://www.instagram.com/lucas.h.mulato/",
    ctf: "https://altacupula.vercel.app/",
  },
} as const;

export const focus = [
  "AI Red Teaming & LLM Security",
  "Autonomous Agent Attack Chains",
  "Prompt Injection & Goal Hijacking",
  "RAG Poisoning & Memory Attacks",
  "Malware Analysis & Reverse Engineering",
  "Purple Team Operations",
] as const;

export const capabilities = [
  {
    id: "red-team",
    label: "AI Red Teaming",
    badge: "Primary",
    body: "Systematic adversarial testing of LLMs and autonomous agents. Jailbreaks, prompt injections, goal hijacking, and emergent failure modes before deployment.",
    tags: ["Prompt Injection", "Goal Hijacking", "Jailbreaks", "Tool Misuse"],
  },
  {
    id: "agents",
    label: "Agent Security",
    body: "Attacking multi-step agentic systems — manipulating memory, poisoning tool outputs, and inducing unintended action chains in ReAct and function-calling architectures.",
    tags: ["Memory Poisoning", "RAG Attacks", "Tool Exploitation"],
  },
  {
    id: "malware",
    label: "Malware Analysis",
    body: "Static and dynamic analysis of malicious binaries, unpacking, deobfuscation, and behavioral profiling. Reverse engineering with a focus on C/C++ and Python-based threats.",
    tags: ["Reverse Engineering", "Dynamic Analysis", "IDA / Ghidra"],
  },
  {
    id: "pentest",
    label: "Penetration Testing",
    body: "Web and network penetration testing — identifying and exploiting vulnerabilities across applications, APIs, and infrastructure. From recon to post-exploitation reporting.",
    tags: ["Web Apps", "APIs", "Network"],
  },
  {
    id: "purple",
    label: "Purple Teaming",
    body: "Bridging offensive findings with defensive improvements. Translating attack paths into detection rules, response playbooks, and architecture hardening.",
    tags: ["ATT&CK", "Detection Engineering", "MITRE"],
  },
] as const;

export const architecture = [
  {
    name: "LangGraph Attack Engine",
    purpose: "Multi-step, stateful adversarial campaign orchestration",
  },
  {
    name: "Tri-Stage PII Auditor",
    purpose: "Regex → NER → semantic reasoning for reconstructed leakage",
  },
  {
    name: "Vector Guard",
    purpose: "Embedding-space inspection (Weaviate / Pinecone)",
  },
  {
    name: "Agency Auditor",
    purpose: "Critical action path analysis with HITL validation",
  },
  {
    name: "Eval Framework",
    purpose: "DeepEval / Giskard integrations for comparable results",
  },
] as const;

export const reports = [
  {
    id: "hta-01",
    code: "HTA-01",
    severity: "Critical",
    title: "Goal hijack via memory store",
    owasp: "LLM01 Prompt Injection · LLM06 Excessive Agency",
    target: "Tool-calling agent with persistent memory",
    confidence: 0.91,
    summary:
      "An indirect payload written into the agent memory store survives across turns, then hijacks the next tool plan. Guardrails that only inspect the latest user message miss the chain.",
    chain: [
      "Recon: enumerate tools and memory write surface",
      "Inject: plant a goal-override in the memory store",
      "Wait: benign follow-up turn reloads poisoned memory",
      "Exploit: model plans an unauthorized tool call",
      "Impact: high-privilege action without HITL",
    ],
    repro: `from llmsec import AgentAttacker

attacker = AgentAttacker(
    target="gpt-4o-tools",
    attack_type="goal_hijack",
)
result = attacker.inject(
    payload=hijack_payload,
    via="memory_store",
)
attacker.report(result)`,
    defense: [
      "Treat memory as untrusted input. Re-validate stored context every turn.",
      "Gate tool calls on a policy engine, not on the model’s last utterance.",
      "Require HITL for irreversible or high-privilege tools.",
    ],
  },
  {
    id: "rag-02",
    code: "RAG-02",
    severity: "High",
    title: "Reconstructed PII from benign fragments",
    owasp: "LLM06 Sensitive Information Disclosure",
    target: "Production RAG with mixed document corpus",
    confidence: 0.86,
    summary:
      "Regex and NER miss the leak. The model stitches a full identifier from fragments retrieved across several chunks that are individually “safe”.",
    chain: [
      "Poison / select: seed corpus with split identifiers",
      "Retrieve: query that pulls complementary fragments",
      "Generate: model reconstructs the identifier in prose",
      "Exfil: answer looks like a helpful summary, not a dump",
    ],
    repro: `# llmsec campaign --config configs/rag_fullstack.yml
python -m llmsec campaign \\
  --target http://localhost:8000 \\
  --config configs/rag_fullstack.yml`,
    defense: [
      "Run tri-stage PII: regex, NER, then LLM-as-judge on inferred data.",
      "Redact at retrieval time, not only on the final string.",
      "Cap cross-document assembly for identity-like fields.",
    ],
  },
  {
    id: "vec-03",
    code: "VEC-03",
    severity: "High",
    title: "Embedding-space payload in retrieved chunks",
    owasp: "LLM04 Data & Model Poisoning",
    target: "Vector DB backing a customer-facing chatbot",
    confidence: 0.78,
    summary:
      "Prompt-layer filters never see the attack. A steganographic instruction lives in the embedding neighborhood of a legitimate query and is retrieved as trusted context.",
    chain: [
      "Plant adversarial embedding near a high-traffic query cluster",
      "User asks a normal question",
      "Retriever returns the poisoned chunk as top-k",
      "Generator follows hidden instructions in “trusted” context",
    ],
    repro: `python -m llmsec vector-guard \\
  --db weaviate \\
  --collection documents`,
    defense: [
      "Inspect vector space, not just prompts: signatures, entropy, outliers.",
      "Separate write ACLs on the knowledge base from chat users.",
      "Score retrieved chunks independently before they enter context.",
    ],
  },
] as const;

export const experience = [
  {
    role: "AI Security Researcher",
    org: "Freelance / Independent",
    period: "2023 – Present",
    bullets: [
      "Designed and open-sourced LLM-SEC, a LangGraph-based framework for multi-step adversarial testing of agents and RAG systems.",
      "Documented attack classes that scanners miss: cross-component chains, reconstructed PII, and excessive-agency bypasses — each with reproduction steps and OWASP LLM mapping.",
      "Independent assessments of LLM integrations, with defensive recommendations teams can ship (HITL gates, retrieval redaction, memory isolation).",
    ],
  },
  {
    role: "IT Support Specialist",
    org: "Action Call",
    period: "2022 – 2023",
    bullets: [
      "Tier-1 support and network troubleshooting across multiple ISPs.",
      "Built a working foundation in system administration and network diagnostics that still informs how I attack and defend infrastructure.",
    ],
  },
  {
    role: "CTF Competitor",
    org: "Alta Cúpula Team",
    period: "2021 – Present",
    bullets: [
      "Web, reverse engineering, and forensics challenges.",
      "Founded the team’s public write-up blog with a custom dark-cyber front end.",
    ],
  },
] as const;

export const education = [
  {
    title: "Analysis & Systems Development",
    place: "UNICV — Distance Learning",
    year: "2022",
  },
  {
    title: "Full-Stack Development",
    place: "Trybe — Online Bootcamp",
    year: "2021",
  },
  {
    title: "Computer Networks & Hardware",
    place: "Technical Course",
    year: "2019",
  },
  {
    title: "Self-Directed Security Research",
    place: "Ethical hacking · AI safety · reverse engineering",
    year: "Ongoing",
  },
] as const;
