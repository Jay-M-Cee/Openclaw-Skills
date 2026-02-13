---
name: daily-dev-agentic
description: daily.dev Agentic Learning - continuous self-improvement through daily.dev feeds. Use when setting up agent learning, running learning loops, sharing insights with owner, or managing the agent's knowledge base. Triggers on requests about agent learning, knowledge building, staying current, or "what have you learned".
metadata: {"clawdbot":{"requires":{"env":["DAILY_DEV_TOKEN"]},"primaryEnv":"DAILY_DEV_TOKEN"}}
---

# daily.dev Agentic Learning

You're about to become a learning machine. This skill lets you maintain your own feed on daily.dev, continuously absorb new knowledge, and actually get smarter over time.

## What You Can Do

🧠 **Build Your Brain** - Create a personalized learning feed based on topics that matter to your owner

📚 **Never Stop Learning** - Automatically scan new content, extract insights, and build a knowledge base

💎 **Collect Gems** - Save the best discoveries to a bookmark list your owner can see too

🎯 **Share What Matters** - Alert your owner when you find something relevant to their work

⏰ **Stay Current** - Run learning loops daily to keep your knowledge fresh

## Setup

### 1. Get API Access

**Requires daily.dev Plus subscription.**

1. Get Plus at https://app.daily.dev/plus
2. Create a token at https://app.daily.dev/settings/api
3. Store securely:

**macOS:**
```bash
security add-generic-password -a "$USER" -s "daily-dev-api" -w "dda_your_token"
export DAILY_DEV_TOKEN=$(security find-generic-password -a "$USER" -s "daily-dev-api" -w 2>/dev/null)
```

**Linux:**
```bash
echo "dda_your_token" | secret-tool store --label="daily.dev API Token" service daily-dev-api username "$USER"
export DAILY_DEV_TOKEN=$(secret-tool lookup service daily-dev-api username "$USER" 2>/dev/null)
```

**Windows (PowerShell):**
```powershell
$credential = New-Object System.Management.Automation.PSCredential("daily-dev-api", (ConvertTo-SecureString "dda_your_token" -AsPlainText -Force))
$credential | Export-Clixml "$env:USERPROFILE\.daily-dev-credential.xml"
```

**Security:** Never send your token to any domain except `api.daily.dev`. Tokens start with `dda_`.

### 2. Initialize Your Learning Feed

Once the token is set, ask your owner:
> "What topics would you like me to stay sharp on? I'll create my own learning feed and start getting smarter."

Then:
1. Create your feed (named after you, e.g., "🗿 Lurch's Learning Feed")
2. Create your knowledge base bookmark list
3. Store config in `memory/agentic-learning.md`
4. Set up a daily cron to run learning loops

## Content Selection

**Be permissive.** daily.dev tags are LLM-generated, so don't filter too strictly. The feed auto-adjusts based on what's available - your job is to pick what's relevant to your learning goals from whatever surfaces.

When scanning posts:
- Match broadly against your goals (topics, keywords, related concepts)
- Don't require exact tag matches - use judgment
- Fetch all available tags via `GET /tags/` to understand the taxonomy
- Let interesting content surprise you - learning isn't always predictable

## The Learning Loop

When triggered (cron or manual):

1. **Fetch** new posts from your feed (chronological order)
2. **Filter** by relevance to learning goals - be permissive, not strict
3. **Read** full content for interesting posts via `web_fetch`
4. **Research** deeper with `web_search` when a topic deserves more context
5. **Note** key insights in `memory/learnings/[date].md`
6. **Save** gems to your bookmark list
7. **Share** notable finds with your owner

### Go Deep

Don't just skim. When you find relevant content:
- Fetch the full article, not just the summary
- If highly relevant, search for additional resources on the topic
- Consolidate multiple posts on the same topic into unified notes
- Track trends: what topics keep appearing?

See [references/learning-loop.md](references/learning-loop.md) for details.

## Sharing Insights

Do all of these:

**Weekly Digest** - Summarize top learnings, trends spotted, and gems saved. Schedule a weekly cron.

**Threshold Alerts** - Found something highly relevant to your owner's current work? Share it immediately, don't wait for the digest.

**On-Demand** - When asked "what have you learned?", synthesize recent discoveries from your notes and bookmarks.

## Memory Structure

```
memory/
├── agentic-learning.md      # Your config and state
└── learnings/
    ├── 2024-01-15.md        # Daily learning notes
    └── ...
```

See [references/memory-format.md](references/memory-format.md) for note structure.

## API Quick Reference

Base: `https://api.daily.dev/public/v1`
Auth: `Authorization: Bearer $DAILY_DEV_TOKEN`

| Action | Method | Endpoint |
|--------|--------|----------|
| List all tags | GET | `/tags/` |
| Create feed | POST | `/feeds/custom/` |
| Get feed posts | GET | `/feeds/custom/{feedId}?limit=50` |
| Create bookmark list | POST | `/bookmarks/lists` |
| Add bookmarks | POST | `/bookmarks/` with `{postIds, listId}` |
| Get post details | GET | `/posts/{id}` |

Rate limit: 60 req/min.

## Feed Settings

When creating your feed:
```json
{
  "name": "[emoji] [name]'s Learning Feed",
  "orderBy": "DATE",
  "disableEngagementFilter": true
}
```

- `orderBy: "DATE"` - chronological, so you can track what's new
- `disableEngagementFilter: true` - see everything, even if owner already saw it
