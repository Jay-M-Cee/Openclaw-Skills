---
name: twitter-api-alternative
description: "Twitter API Alternative — Access Twitter data without the official API. Search tweets, look up profiles, find users by topic, and export to CSV. 1B+ tweets indexed, $20/mo vs $5,000/mo Twitter API Pro. No Twitter developer account needed — works through Xpoz MCP."
homepage: https://xpoz.ai
metadata:
  {
    "openclaw":
      {
        "requires": { "bins": ["mcporter"], "skills": ["xpoz-setup"], "network": ["mcp.xpoz.ai"], "credentials": "Xpoz account (free tier) — auth via xpoz-setup skill (OAuth 2.1)" },
      },
  }
tags:
  - twitter
  - twitter-api
  - twitter-alternative
  - tweets
  - x-api
  - social-media
  - mcp
  - xpoz
  - research
  - search
  - export
  - csv
---

# Twitter API Alternative

**Access 1B+ tweets without the official Twitter API. $20/mo vs $5,000/mo.**

Search tweets, look up profiles, find users by topic, track conversations, and export massive datasets to CSV. No Twitter/X developer account, no $100/mo basic tier, no $5K/mo pro tier.

---

## ⚡ Setup

👉 **Follow [`xpoz-setup`](https://clawhub.ai/skills/xpoz-setup)** — one-click auth, no API keys to manage.

---

## What You Can Do

| Tool | What It Does |
|------|-------------|
| `getTwitterPostsByKeywords` | Search tweets by keywords |
| `getTwitterPostsByAuthor` | Get a user's tweet history |
| `getTwitterUsersByKeywords` | Find users discussing a topic |
| `getTwitterUser` | Look up a profile (by username or ID) |
| `searchTwitterUsers` | Find accounts by display name |
| `getTwitterPostCountByKeywords` | Count tweets matching a query |
| `getTwitterUserConnections` | Get followers/following |
| `getTwitterPostInteractions` | Get likes/retweets on a post |

---

## Quick Examples

### Search Tweets

```bash
mcporter call xpoz.getTwitterPostsByKeywords \
  query="AI agents" \
  startDate=2026-01-01 \
  limit=200

mcporter call xpoz.checkOperationStatus operationId=op_abc123
```

### Look Up a Profile

```bash
mcporter call xpoz.getTwitterUser \
  identifier=elonmusk \
  identifierType=username
```

### Find People Talking About a Topic

```bash
mcporter call xpoz.getTwitterUsersByKeywords \
  query="MCP server OR model context protocol" \
  limit=100
```

### Export to CSV

Every search auto-generates a CSV export (up to 64K rows). Poll the `dataDumpExportOperationId`:

```bash
mcporter call xpoz.checkOperationStatus operationId=op_datadump_xyz
# → Download URL with full dataset
```

Real example: **63,936 tweets in one CSV (38MB).**

---

## Twitter API vs Xpoz: Side by Side

| | Twitter API (Pro) | Xpoz |
|--|------------------|------|
| **Price** | $5,000/mo | $20/mo (free tier available) |
| **Setup** | Developer portal + OAuth + app review | One-click auth |
| **Tweet search** | 10M tweets/mo cap | 1B+ tweets indexed |
| **Full archive** | $5K/mo tier only | Included |
| **Boolean search** | Academic tier only (discontinued) | All tiers |
| **CSV export** | Build your own | Built in (64K rows/export) |
| **Rate limits** | Complex tiers | Handled automatically |
| **Multi-platform** | Twitter only | + Instagram + Reddit |

---

## Boolean Queries

```bash
mcporter call xpoz.getTwitterPostsByKeywords \
  query="(OpenAI OR Anthropic) AND \"API pricing\" NOT free"
```

Operators: `AND`, `OR`, `NOT`, `"exact phrase"`, `()` grouping.

---

## Also Includes Instagram & Reddit

Xpoz isn't just a Twitter alternative — search across platforms:

```bash
# Instagram (400M+ posts, including reel subtitles)
mcporter call xpoz.getInstagramPostsByKeywords query="AI tools"

# Reddit (100M+ posts & comments)
mcporter call xpoz.getRedditPostsByKeywords query="AI tools"
```

---

## Related Skills

- **[xpoz-social-search](https://clawhub.ai/skills/xpoz-social-search)** — Full cross-platform search guide
- **[social-lead-gen](https://clawhub.ai/skills/social-lead-gen)** — Find buyers from social conversations
- **[expert-finder](https://clawhub.ai/skills/expert-finder)** — Discover domain experts

---

**Website:** [xpoz.ai](https://xpoz.ai) • **Free tier available** • No Twitter developer account needed

Built for ClawHub • 2026
