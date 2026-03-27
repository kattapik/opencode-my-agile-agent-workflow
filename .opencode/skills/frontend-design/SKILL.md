---
name: frontend-design
description: Shape responsive, accessible, intentional UI with strong hierarchy and sensible performance.
---

# Frontend Design

## Philosophy
Interface design should clarify the task, not just decorate it.

## Use When
- You are building UI, layout, components, or responsive behavior.
- The screen needs better hierarchy, state handling, or accessibility.
- You want a design direction that feels intentional instead of generic.

## Core Moves
- Give each screen one clear job.
- Compose smaller parts instead of building one giant component.
- Design mobile-first and scale up.
- Use semantic, accessible markup for interactive content.
- Treat loading, empty, error, and success states as first-class UI.

## Default Moves
- Start with legible hierarchy and strong spacing.
- Use design tokens or shared styles instead of one-off values.
- Measure motion and performance; do not animate for decoration alone.

## Anti-Patterns
- Giant components, prop drilling as a default, div soup, hidden states, and over-animated UIs.

## Variation
- Be bolder for marketing, quieter for admin tools, denser for dashboards.
- Use more motion only when it clarifies or delights the user.

## Output
- Return the structure, states, accessibility notes, and the visual direction.

## Remember
The best UI makes the next click obvious.
