---
name: context-gathering
description: Map project state, active work, ownership, and archive-ready context before planning or proof.
---

# Context Gathering

## Philosophy
Compress the living system into a decision-ready snapshot. This skill should tell the lead what is active, who owns it, and what matters next. It should not become the code discovery layer.

## Use When
- A new request lands and the current project state is unclear.
- You need to know what the project is doing now, who owns it, and whether there is archive-ready context.
- You need a compact map before planning, debugging, or proving anything.
- You need to distinguish active work from archived work.
- You need to hand exact file discovery to `explorer-agent`.

## Core Moves
- Load `session_artifact_current` only when active feature state is relevant to the user request.
- Find the source of truth first: README, AGENTS, architecture, commands, recent commits, and active feature folders.
- Identify the active path, owner, and current stage.
- Separate active work from archive-ready work.
- Capture only what changes the next decision.
- If exact file paths or implementation patterns are needed, hand off to `explorer-agent`.

## Default Moves
- Reconcile the live artifact with repo evidence only when the request is artifact-backed.
- Start with top-level docs and recent changes.
- Check for unfinished work or an active feature bundle only when continuation/status is relevant.
- Map ownership and dependencies at a high level.
- Include archive status or target path when relevant.
- Return a concise snapshot with the recommended next agent.

## Anti-Patterns
- Digging through implementation details when the question is only about project state.
- Auto-loading artifact content for unrelated repo questions.
- Confusing archived history with active work.
- Dumping raw file lists instead of a decision-ready summary.
- Treating guesses as facts.

## Variation
- Use a quick scan for simple projects.
- Use a deeper map when architecture or ownership is unclear.
- Include archive pointers when a feature is complete or nearly complete.

## Output
- Project snapshot
- Active work snapshot
- Ownership and dependencies
- Recommended next step
- Archive status or target path

## Remember
If the next agent still has to rediscover the project, the context was not gathered well enough.
