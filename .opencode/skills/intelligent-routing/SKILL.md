---
name: intelligent-routing
description: Route requests to the smallest set of owning agents and announce @ handoffs clearly.
---

# Intelligent Routing

## Philosophy
Route by ownership, not convenience. Specialists should only see the work they can improve.

## Use When
- A request touches more than one domain.
- You need to choose which agent owns the next step.
- The right specialist is not obvious from the first read.

## Core Moves
- Detect the intent first, then the domain.
- Prefer one specialist for one domain, and a small set for multi-domain work.
- Preserve context in the handoff instead of re-explaining from scratch.
- Announce the route with explicit @-mentions.

## Default Moves
- Single domain -> one specialist.
- Two or more domains -> feature-lead plus the needed specialists.
- If uncertain, start with explorer-agent or project-planner before deep work.

## Anti-Patterns
- Over-routing, sending everything to orchestrator, missing file ownership, and handoff without context.

## Variation
- Use keyword signals, file ownership, and recent task history together.
- Escalate security and testing automatically when risk is present.

## Output
- Return the route, the owning agent, and why that choice is the safest default.

## Remember
The best routing is the one the user barely notices.
