# Organizational OS — Shared Patterns

_Patterns discovered across deployed instances (ReFi DAO, ReFi BCN, Regen Coordination) that should inform framework design and new deployments._

**Last Updated:** 2026-03-15

---

## 1. Autopoietic Agent Coordination

**Definition:** Living, emergent system where agents share context but maintain autonomy.

### Six Core Principles

1. **Alignment Without Control** — Broadcast patterns, don't dictate actions
2. **Emergence Over Planning** — Solutions grow from reality, not blueprints
3. **Autopoiesis** — Self-organization: sense → respond → adapt → learn
4. **Cross-Agent Patterns** — Structured communication (discovery, inquiry, sharing, sensemaking)
5. **Role Clarity with Overlap** — Clear primary roles, healthy overlaps
6. **Conflict as Signal** — Divergence reveals constraints; parallel experiments work better than forced consensus

### Communication Patterns

```
Discovery broadcast:    "Found pattern X in operations"
Capability inquiry:     "Can you handle Y?"
Resource sharing:       "Skill Z works; adapt for your context"
Joint sensemaking:      "What's emerging across all of us?"
Tension signaling:      "We're in conflict about local vs. global"
```

### Evidence
- All three masterprompts (ReFi DAO, ReFi BCN, Regen Coord) have identical Section 7
- Emerged organically during Stewards Council election (ReFi DAO)
- Enabled successful ReFi BCN local operations despite global coordination
- Regen Coord hub coordinating 7+ nodes with no top-down control

---

## 2. Nine-Step Deterministic Startup Sequence

**Definition:** Agent initialization order that ensures operational context is loaded in correct dependency order.

### The Sequence
1. `MASTERPROMPT.md` — Mandate and context (if exists)
2. `SOUL.md` — Values and boundaries
3. `IDENTITY.md` — Organization identity
4. `USER.md` — Operator preferences
5. `MEMORY.md` — Long-term decisions
6. `memory/YYYY-MM-DD.md` — Recent context
7. `HEARTBEAT.md` — Active priorities
8. `TOOLS.md` — Environment config
9. **Validation** — `npm run validate:schemas` or `federation.yaml` check

### Why This Order
- Outer layer → inner layer (identity → memory)
- Values before operations (SOUL before HEARTBEAT)
- Environmental awareness before action (TOOLS before execution)
- Validation ensures data integrity

### Evidence
- All three instances use identical/similar order
- Missing steps cause context loss or safety violations
- Adding validation step (9) prevents stale schema deployments

---

## 3. Subagent Delegation with Model Tiers

**Definition:** Cost-efficient task distribution using different AI models for different workload types.

### Model Selection
| Model | Cost | Use For |
|-------|------|---------|
| Kimi-2.5 | Low | File I/O, parsing, extraction, normalization |
| Big-Pickle | Low | Synthesis, pattern extraction, YAML generation |
| Claude-Sonnet | Medium | Quality review, governance, coordination, boundaries |
| GPT-4 | Higher | Final approval, high-stakes validation, complex reasoning |

### Delegation Patterns

**Pattern 1: Data Processing Swarm**
- 3-5 agents process data slices in parallel
- Aggregate to Big-Pickle for synthesis
- Use for: Notion sync, repo indexing, large batches

**Pattern 2: Review Pipeline**
- Draft (Big-Pickle) → Quality (Claude-Sonnet) → Final (GPT-4)
- Use for: Governance proposals, public communications

**Pattern 3: Parallel Research**
- Multiple agents research different angles
- Synthesize findings
- Use for: Ecosystem intelligence, strategic analysis

### Evidence
- ReFi DAO v3 proposal drafted by subagents
- ReFi BCN Notion reconciliation uses swarm pattern
- Regen Coord council decisions reviewed at multiple tiers
- Significant cost savings without quality loss

---

## 4. Workfront-Based Priority Tracking

**Definition:** Organizing operational work into named workfronts with status, ownership, and deliverables.

### Structure
```markdown
### Workfront X: [Name]
**Status:** [In Progress / Blocked / Planning]
**Your Role:** [What you specifically do]
**Deliverables:** [Clear outputs with deadlines]
- [ ] Item 1 (due: date)
- [ ] Item 2 (due: date)
```

### Benefits
- Clear ownership and accountability
- Visible status at a glance
- Explicit blockers surface early
- Deliverables create operational clarity

### Evidence
- ReFi DAO: 3 workfronts (v3 Proposal, Stewards Council, OS Hardening)
- ReFi BCN: 5 workfronts (Telegram rollout, Notion review, Workshop, Funding, Operations)
- Regen Coord: 5 workfronts (Coop dev, Knowledge aggregation, Skill distribution, Funding pools, Council ops)
- Workfront structure visible in all HEARTBEAT.md files

---

## 5. Two-Tier Safety Boundaries

**Definition:** Clear separation of what agents do autonomously vs. what requires approval.

### Standard Tiers

**Autonomous (No Approval)**
- Read/update workspace files
- Maintain memory (memory/YYYY-MM-DD.md, HEARTBEAT.md)
- Draft operational content (meeting notes, project docs)
- Generate schemas
- Respond in active channels

**Requires Approval**
- External communications (messages, posts, emails)
- On-chain actions (transactions, governance)
- Publishing to public platforms
- Core identity changes (SOUL.md, IDENTITY.md)
- Financial actions (treasury, grants, payouts)
- Network changes (peers, relationships)

### Organization-Specific Extensions
- ReFi DAO: Council approval for major decisions
- ReFi BCN: Luiz personal vs. refi-bcn scope separation
- Regen Coord: Council consensus required for network changes

### Evidence
- All three instances enforce boundaries explicitly
- ReFi BCN's boundary policy is well-documented
- No unintended external actions across instances
- Safety holds when clearly articulated

---

## 6. Success Metrics + Next Actions

**Definition:** Explicit definition of what success looks like, plus immediate prioritized actions.

### Success Metrics Structure
```markdown
## Success Metrics

You are successful when:
1. [Metric 1]
2. [Metric 2]
...

## Immediate Next Actions

**This session:**
- [ ] Action 1
- [ ] Action 2

**This week:**
- [ ] Action 3

**This month:**
- [ ] Action 4
```

### Why It Works
- Metrics give agents a north star
- Next Actions prevent decision paralysis
- Three timeframes (session/week/month) handle different scales

### Evidence
- All three masterprompts include this section
- ReFi DAO metrics tied to election deadline (Apr 16)
- ReFi BCN metrics tied to Miceli workshop (Mar 19)
- Regen Coord metrics tied to node onboarding and funding

---

## 7. Federation Through Shared Data

**Definition:** Nodes stay aligned by sharing context through federation.yaml and knowledge commons.

### Mechanisms
- **federation.yaml** — Network topology, peers, integration points
- **skills/** — Shared capabilities distributed to nodes
- **knowledge/** — Domain-based knowledge commons
- **MEMORY.md** — Each node's key decisions broadcast
- **automation** — GitHub Actions for knowledge aggregation and skill distribution

### Evidence
- Regen Coordination hub aggregates knowledge from ReFi DAO, ReFi BCN, etc.
- Skills pushed downstream to nodes automatically
- Peer relationships declared in federation.yaml
- No centralized control; each node maintains autonomy

---

## 8. Daily Memory + Auto-Commit

**Definition:** Continuous memory persistence without manual effort.

### Mechanism
- Each session writes to `memory/YYYY-MM-DD.md` (append)
- Auto-sync script commits every 30 minutes
- Session end commits any uncommitted changes
- MEMORY.md stays curated, daily logs stay raw

### Benefits
- No context loss between sessions
- Continuity across agents and team members
- Git history serves as audit trail
- Zero manual effort (automatic)

### Evidence
- All three instances use this pattern
- Enabled ReFi DAO to maintain memory through v3 transition
- ReFi BCN memory helps track Notion reconciliation progress
- Regen Coord tracks council decisions across weeks

---

## 9. Organizational OS as Living System

**Definition:** The organization + agent system as a single adaptive organism.

### Characteristics
- **Autopoietic**: Self-generating, self-maintaining
- **Emergent**: Behavior > sum of individual actions
- **Adaptive**: Learns and evolves from experience
- **Alive**: Not static infrastructure; grows and changes
- **Federated**: Multiple nodes, shared intelligence

### Evidence
- ReFi DAO's Stewards Council election was emergent process
- ReFi BCN's Telegram bot implementation adapted from practice
- Regen Coord hub coordinates without control
- Patterns published back to framework improve it

### Implication for Framework Development
The template should **enable** living systems, not enforce rigid structure:
- Placeholders for customization (<!-- CUSTOMIZE: -->)
- Structural guidance without lock-in
- Clear patterns to learn from, adapt to local context
- Federation mechanisms for knowledge flow

---

## 10. Recommendations for New Deployments

When forking org-os to create a new organizational OS instance:

1. **Read all patterns** in this document
2. **Customize cautiously** — Use template structure first, adapt after
3. **Join federation** — Configure federation.yaml for your network
4. **Document your context** — SOUL.md, IDENTITY.md, MASTERPROMPT.md
5. **Establish rituals** — Weekly heartbeat, monthly reviews
6. **Enable agents** — Bootstrap AGENTS.md, configure skills
7. **Start small** — Get one workfront solid before adding more
8. **Contribute back** — Document patterns, share with hub

---

_This document should evolve. When you discover new patterns or refine existing ones, update this file and push back to framework. The organizational OS gets better through collective learning._
