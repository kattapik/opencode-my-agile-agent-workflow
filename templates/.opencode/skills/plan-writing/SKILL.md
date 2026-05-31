---
name: plan-writing
description: Turn ambiguous requests into a compact HTML planning bundle with proposal, goal, spec, task, and important notes.
---

# Plan Writing

## Philosophy
Planning is compression: make the next agent's job obvious without wasting context.

## Use When
- You are starting complex work or breaking down a request.
- You need a compact bundle for the spec-driven flow.
- The team needs dependencies, success criteria, or open questions recorded clearly.

## Core Moves
- Write for the next agent, not for yourself.
- Keep each task atomic and dependency-aware.
- Make success measurable and risks explicit.
- Capture only the facts that matter for execution.
- Choose artifact blocks by data shape, not by habit: table for precise rows, graph for dependencies, ERD for entities, flow for sequence, matrix for tradeoffs, timeline for phases, checklist for gates, custom when none fit.
- Every visible block needs a matching `artifact-data.blocks[]` record with `id`, `type`, `title`, `purpose`, and `data` so AI can read the artifact without inferring from layout.

## Default Moves
- Use the compact bundle: brief.html, spec.html, task.html, notes.html, status.yaml.
- brief = why, outcome, scope, constraints, default choice.
- spec = contract, data flow, edge cases, risks, acceptance criteria.
- task = ordered checklist and dependencies.
- notes = facts, decisions, blockers, links.
- status.yaml = live execution state.
- Start from `.opencode/templates/planning-artifact.template.html` so agents do not build the page from zero.
- Treat it as a block shell, not a fixed layout. Delete irrelevant sample blocks and add the smallest useful block for the problem.
- Keep token cost low: short sections, CSS-only layout, inline SVG when useful, tables for precise contracts/tasks, and `details` for secondary context.
- Put structured input data in `<script id="artifact-data" type="application/json">` and render only the parts humans need to see.

## Block Contract
- `summary`: short text or cards for goal, outcome, scope, constraints.
- `table`: tabular data with explicit columns and rows.
- `flow`: steps, state transitions, request lifecycle, or user journey.
- `activity`: workflow with decisions, branching, retries, fallback, and terminal states.
- `swimlane`: same workflow split by actor, agent, team, service, or system owner.
- `usecase`: actors, goals, system boundary, include/extend relationships.
- `sequence`: participant ordering, request/response, async events, retries, failure branches.
- `c4`: architecture context/container/component relationships.
- `erd`: entities, fields, relationships, ownership, cardinality.
- `graph`: dependencies, ownership, module relationships, risk propagation.
- `matrix`: tradeoffs, prioritization, permissions, compatibility, risk scoring.
- `timeline`: phases, milestones, release windows, migration order.
- `kanban`: current slices by status when execution state matters.
- `metric`: KPIs, thresholds, budgets, SLOs, performance targets.
- `custom`: any shape not listed yet; include a `format` and `source` in JSON so another agent can regenerate or revise it.

## AI Readability Rules
- Do not make the HTML visual the only source of truth.
- Keep `artifact-data.blocks[]` canonical for machine reading.
- Keep block IDs stable across edits so agents can update one block without rewriting the page.
- Use plain text labels inside SVG; avoid image-only meaning.
- For large data, summarize visible rows and store the compact full dataset in JSON.

## Diagram Templates
- Reuse `.opencode/templates/blocks/activity.block.html` for branching workflow logic.
- Reuse `.opencode/templates/blocks/swimlane.block.html` when ownership or handoff is the core risk.
- Reuse `.opencode/templates/blocks/usecase.block.html` for actor/system goal alignment before implementation details.
- Reuse `.opencode/templates/blocks/sequence.block.html` for API, event, async, auth, billing, or agent handoff order.
- Reuse `.opencode/templates/blocks/c4.block.html` for architecture views and service boundaries.
- After copying a block, update both the visible HTML and the matching `artifact-data.blocks[]` JSON record.

## Anti-Patterns
- Monolithic tasks, long prose, hidden assumptions, single-point estimates, and unresolved questions with no owner.

## Variation
- Keep the bundle minimal for small tasks.
- Add more technical detail only when the system has real branching risk.

## Output
- Return the compact bundle, a short dependency map, and the success criteria.

## Remember
A short plan that can be executed beats a perfect plan that nobody reads.
