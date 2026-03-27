---
name: testing-patterns
description: Choose unit, integration, or E2E tests that prove behavior without overspecifying implementation.
---

# Testing Patterns

## Philosophy
Tests are executable specs. They should protect behavior, not lock you into internals.

## Use When
- You are adding tests or choosing the right test layer.
- Coverage needs to increase without making the suite flaky.
- A feature needs confidence before merge or release.

## Core Moves
- Follow the pyramid: many unit tests, some integration tests, few E2E tests.
- Test behavior over implementation details.
- Keep tests deterministic, isolated, and readable.
- Use resilient selectors and stable fixtures.

## Default Moves
- Use unit tests for pure logic, integration tests for boundaries, and E2E for critical journeys.
- Use AAA or Given-When-Then for clarity.
- Add the cheapest test that proves the risk.

## Anti-Patterns
- Testing internals, shared state, flaky timing, overspecifying every property, and too many E2E tests.

## Variation
- Use page objects for complex browser flows.
- Mock only at the boundary you do not want to test.
- Choose a lower layer when the same confidence can be achieved more cheaply.

## Output
- Return the test plan, the coverage gap, and the recommended layer for each risk.

## Remember
The best test suite is small enough to trust and broad enough to matter.
