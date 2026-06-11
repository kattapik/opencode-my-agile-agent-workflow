---
name: artifact-discipline
description: Keep runtime state in artifacts, retrieve documents through tools, and pass compact intent-only handoffs.
---

# Artifact Discipline

## Philosophy
Agents should pass intent, not document dumps. Runtime state belongs in artifacts, and artifacts should be retrieved through tools.

## Use When
- Work spans more than one stage or more than one subagent.
- You need durable context through compaction or session breaks.
- You want deterministic handoff instead of full prompt replay.

## Core Moves
- Load artifacts only when the user intent requires active feature context, status, review, archive, or handoff.
- Start from the smallest useful artifact tool, not the full bundle.
- Carry only goal, stage, constraints, and exit criteria in the prompt.
- Pull spec, notes, and evidence on demand.
- Write back structured updates instead of freeform memory.
- Refresh the handoff packet before delegating.

## Anti-Patterns
- Re-explaining the full feature in every handoff.
- Auto-loading artifact content at the start of unrelated chat topics.
- Treating prompt memory as the source of truth.
- Updating `status.yaml` manually when an artifact tool can do it.
- Mixing archived history with active execution state.

## Remember
If a subagent can resume safely after compaction, the harness is doing its job.
