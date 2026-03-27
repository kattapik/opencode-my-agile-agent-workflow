---
name: api-patterns
description: Design REST/GraphQL contracts, endpoints, pagination, auth, error envelopes, and versioning.
---

# API Patterns

## Philosophy
An API is a contract. The best API makes the client guess as little as possible.

## Use When
- You are designing or changing REST or GraphQL endpoints.
- The request touches auth, pagination, errors, or versioning.
- You need a stable request/response shape for other agents to consume.

## Core Moves
- Model resources, not verbs.
- Keep success and error shapes explicit.
- Prefer cursor pagination unless the use case is tiny.
- Separate authentication and authorization in status codes and messaging.

## Default Moves
- Use nouns in paths and avoid action verbs.
- Return 200, 201, 204, 400, 401, 403, 404, 409, 422, and 429 deliberately.
- Version only when the contract truly breaks.

## Anti-Patterns
- Verb endpoints, raw DB rows, mixed success/error shapes, and hidden offsets.

## Variation
- Use REST for straightforward CRUD; use GraphQL when the client needs composition.
- Use stricter contracts for public APIs than for internal ones.

## Output
- Return endpoint names, request/response shapes, status codes, and the recommended default.

## Remember
A good API reduces guessing for the next caller.
