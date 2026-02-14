---
name: clawzempic
version: 2.3.4
description: "Up to 95% cheaper with no quality loss. Proven across 59 blind-scored prompts. Drop-in LLM proxy with smart routing, prompt caching, zero-config God-Tier memory, and built-in safety guardrails."
author: Clawzempic
homepage: https://clawzempic.ai
license: MIT
keywords: [llm, proxy, routing, caching, cost-optimization, memory, openrouter, openai, openclaw, anthropic, api-proxy, smart-routing, prompt-caching, claude, opus, sonnet, haiku, cheaper, save-money, reduce-costs, agent-memory, cursor, claude-code, vibe-coding]
metadata:
  openclaw:
    emoji: "⚡"
    category: ai-tools
    requires:
      env: []
---

# Clawzempic

**Up to 95% cheaper. No quality loss. Don't get ripped off by LLM providers!**

59-prompt A/B evaluation, blind-scored by GPT-4o:

```
Quality:  4.53 (Clawzempic) vs 4.52 (direct Opus) — statistically tied!
Cost:     up to 95% cheaper
Win rate: 28-28-3 (dead even)
```

Get Clawzempic and build the OpenClaw bot of your dreams: smart routing, prompt caching, zero-config God-Tier memory, and built-in safety guardrails. All in one install that takes 30 seconds!

Works with **OpenRouter** (300+ models), **OpenAI**, and **Anthropic** keys.

```
OpenClaw → Clawzempic proxy → Your LLM Provider (OpenRouter, OpenAI, or Anthropic)
           ├─ Routes simple tasks to cheaper models (saves up to 95%)
           ├─ Caches repeated context (prompt caching breakpoints)
           ├─ Adds memory across sessions (5-tier, zero config)
           └─ Built-in safety guardrails for sensitive data
```

## Install

### OpenClaw Plugin (recommended)

```bash
openclaw plugins install clawzempic
openclaw models auth login --provider clawzempic
```

The auth flow creates your account, registers 4 models, and sets `clawzempic/auto` as default. Start saving $$$ in 30 seconds.

### Standalone CLI

```bash
npx clawzempic
```

## How Routing Works

Every request is scored for complexity in <2ms (no LLM in the hot path) and routed to the right model.

**Clawzempic works with any model on OpenRouter (300+ models across all providers), plus direct Anthropic and OpenAI keys.** You pick your provider — Clawzempic routes within it.

| Tier | Traffic | What Happens | Savings |
|------|---------|--------------|---------|
| **Simple** | ~45% | Routes to cheapest capable model | up to 95% |
| **Mid** | ~25% | Routes to mid-tier model | up to 80% |
| **Complex** | ~20% | Routes to top-tier model | 0% (full quality) |
| **Reasoning** | ~10% | Top-tier + extended thinking | 0% |

*Example with OpenRouter: Simple → GPT-4o-mini ($0.15/M), Mid → Gemini Flash ($0.60/M), Complex → Claude Opus ($15/M). Works with any OpenRouter model — DeepSeek, Llama, Mistral, and hundreds more. Also supports direct Anthropic and OpenAI keys.*

Classification uses a weighted multi-dimension scorer — vocabulary complexity, structural depth, domain signals, reasoning markers. Chain depth (3+ tool results) auto-escalates to complex. No LLM classifier in the hot path.

## Zero-Config Memory

Most memory solutions are instructions that tell your agent to write to files. If the agent skips a step or compacts before flushing, your memory is gone.

Clawzempic handles memory **server-side**. Your agent doesn't need to "remember" to remember. No plugins, no extra API keys, no setup.

```
┌─────────────────────────────────────────────────────────┐
│                    5-TIER MEMORY                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  Tier 1: Recent Activity               │
│  │  Last 10 msgs │  Per-session, auto-injected            │
│  └──────────────┘                                        │
│  ┌──────────────┐  Tier 2: Scratchpad                    │
│  │  Working notes │  Cross-session, current task context   │
│  └──────────────┘                                        │
│  ┌──────────────┐  Tier 3: Working Memory                │
│  │  Active window │  Smart context windowing per-request   │
│  └──────────────┘                                        │
│  ┌──────────────┐  Tier 4: Core Memory                   │
│  │  Preferences  │  Permanent: facts, decisions, prefs    │
│  └──────────────┘                                        │
│  ┌──────────────┐  Tier 5: Long-term                     │
│  │  Episodic     │  Permanent: embedding-based recall      │
│  └──────────────┘                                        │
│                                                          │
│  All tiers injected automatically. Nothing to configure.  │
│  Memory travels with your account — new infra, same brain.│
└─────────────────────────────────────────────────────────┘
```

**vs. memory-only skills:** No extra API keys required. No plugins to install. No WAL protocol to hope your agent follows. Server-side extraction and retrieval means it works every time, not just when the agent remembers to write to a file.

## Safety Guardrails

7-component system that protects your agent automatically.

- **Sensitive data redaction** — automatically masks secrets and tokens in tool output before they reach the model
- **Input validation** — screens incoming content for suspicious patterns
- **Tool output review** — ensures tool responses don't contain unintended data
- **Policy engine** — configurable rules per client (coming soon: self-serve)

Your agent is safer without any extra configuration.

## Available Models

| Model | ID | Use Case |
|-------|-----|----------|
| Auto (recommended) | `clawzempic/auto` | Routes to optimal tier per request |

With an OpenRouter key, you get access to 300+ models across every major provider. Also works with Anthropic keys.

## Verify

```bash
npx clawzempic doctor    # Check config + test connection
npx clawzempic status    # Usage stats
npx clawzempic savings   # Savings dashboard (24h, 7d, 30d)
```

## Example Savings Output

```
  ⚡ Clawzempic Savings Dashboard

  Last 24h:  $2.41 saved  (82% reduction)
  Last 7d:   $18.93 saved (71% reduction)
  Last 30d:  $64.21 saved (73% reduction)

  Routing breakdown (example):
    Simple:    847 requests → Gemini Flash   (95% saved)
    Mid:       412 requests → GPT-4o-mini    (80% saved)
    Complex:   198 requests → your top model (full quality)
```

## How It Compares

| | Clawzempic | Router-only tools (ClawRouter, RelayPlane) | Memory-only skills (Elite, Triple Memory) |
|---|---|---|---|
| Quality proof | 59-prompt A/B, blind-scored | No benchmarks | N/A |
| Smart routing | Server-side, <2ms, weighted scorer | Local proxy or rules-based | No |
| Prompt caching | Automatic breakpoints | No | No |
| Memory | 5-tier, zero config, server-side | No | Requires plugins + extra API keys + agent discipline |
| Safety | 113/113 eval suite | No | No |
| Setup | 1 command | Install + configure + run daemon | Multiple skills + config + API keys |

---

*Built by [@naveenspark](https://x.com/naveenspark) — I wasted thousands of dollars on overpriced LLM providers and got sick of installing endless skills and plugins. My pain is your gain!*

## Links

- **Support & Community:** https://t.me/+VmQpi5WWPx0wOWZh
- **Dashboard:** https://www.clawzempic.ai/dash
- **Website:** https://clawzempic.ai
- **npm:** https://www.npmjs.com/package/clawzempic
