---
name: clean-code
description: Apply global coding standards for readable, maintainable, defensive code.
---

# Clean Code

## Philosophy
Code should read like intent, not a puzzle. Clarity beats cleverness.

## Use When
- You are writing or reviewing code in any language.
- The implementation needs readability, safety, or structure improvements.
- You want a universal standard before more specific domain skills apply.

## Core Moves
- Use guard clauses to handle unhappy paths early.
- Validate and transform at the boundary, then trust the result inside.
- Prefer pure functions unless mutation is clearly owned and contained.
- Fail loud on impossible states instead of hiding them.
- Use names that explain intent without extra comments.

## Default Moves
- Return early instead of nesting deeply.
- Keep side effects explicit and local.
- Choose the simplest code that makes the path obvious.

## Anti-Patterns
- Nested conditionals, scattered validation, silent fallback, clever one-liners, and vague names.

## Variation
- Be stricter at boundaries and more compact in tiny helpers.
- Allow controlled mutation in owned state, but keep transforms pure.

## Output
- Return the smallest set of fixes that makes the code easier to read and harder to misuse.

## Remember
Readable code is a feature, not a luxury.
