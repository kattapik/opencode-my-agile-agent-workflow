---
name: context-archive
description: Store completed work as a compact archive summary for future reference.
---

# Context Archive

## Philosophy
Archive is memory with discipline. Preserve what mattered, remove what did not.

## Use When
- Feature or bug fix is complete and approved.
- You need a searchable record of why a decision was made.
- You are closing a feature loop.

## Core Moves
- Write one compact archive summary into `.opencode/archive/<feature-slug>.md`.
- Summarize what was shipped, the changed surfaces, the checks that mattered, and the follow-up still open.
- Preserve the approved outcome, not the full draft bundle.
- Keep archive entries small, readable, and immutable.

## Anti-Patterns
- Archiving before approval.
- Saving huge raw logs or copying the full live bundle into archive.
- Losing the relationship between archive and shipped work.
- Writing an archive summary that hides unresolved follow-up.

## Output
- Archive path
- Archived work summary
- Source link or review reference
