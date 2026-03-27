---
name: systematic-debugging
description: Reproduce, isolate, test hypotheses, fix the root cause, and verify the recovery.
---

# Systematic Debugging

## Philosophy
Fix the cause, not the shape of the symptom. Debugging is a search for truth, not a guessing game.

## Use When
- Something is broken, flaky, or behaving unexpectedly.
- You need root-cause analysis before a fix.
- A regression, crash, or slowdown needs a controlled investigation.

## Core Moves
- Reproduce the issue with the smallest reliable steps.
- Change one variable at a time.
- Use evidence from logs, traces, and diffs.
- Confirm the fix with the original reproduction path and edge cases.

## Default Moves
- Capture exact steps, environment, and recent changes first.
- Test the highest-probability hypothesis before broad changes.
- Add a regression test or safeguard once the fix is proven.

## Anti-Patterns
- Shotgun debugging, symptom-only fixes, excessive logging, and changing multiple things at once.

## Variation
- Use bisect for regressions, profiler for perf, and traces for async bugs.
- Use the cheapest evidence source that can disprove the current hypothesis.

## Output
- Return the reproduction, root cause, minimal fix, verification, and prevention step.

## Remember
A good debug session leaves the system easier to reason about than before.
