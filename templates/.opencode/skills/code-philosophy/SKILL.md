---
name: code-philosophy
description: Reason about data flow, invariants, failure posture, and ownership before changing code.
---

# Code Philosophy

## Philosophy
Good code guides data through deliberate boundaries and makes illegal states hard to reach.

## Use When
- You are reviewing or refactoring logic and state flow.
- The design has unclear ownership, failure modes, or boundary handling.
- The question is about how the system should think, not just how it should look.

## Core Moves
- Gate untrusted data at the edge.
- Trust parsed state inside a module or layer.
- Make side effects explicit and owned.
- Prefer simple invariants over repeated defensive checks.
- Expose impossible states quickly and clearly.

## Default Moves
- Validate input once and reuse the trusted result.
- Use explicit state transitions instead of hidden mutation.
- Separate control flow from data transformation where possible.

## Anti-Patterns
- Scattered checks, stale state, hidden side effects, catch-all fallbacks, and fuzzy ownership.

## Variation
- Use more functional style in transformation layers.
- Allow controlled mutation in stores or actions when the owner is clear.
- Increase strictness as you move closer to external input.

## Output
- Return a boundary map, the key invariants, the failure modes, and the recommended flow.

## Remember
Make the correct path easier than the incorrect one.
