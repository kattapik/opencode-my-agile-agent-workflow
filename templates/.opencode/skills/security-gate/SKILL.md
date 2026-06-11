---
name: security-gate
description: Decide when a change needs security review, redteam validation, or escalation.
---

# Security Gate

## Philosophy
Security is a gate that keeps unsafe behavior from becoming the default path. Use this skill to classify risk early, choose the right reviewers, and keep the system operable.

## Use When
- A request touches auth, permissions, secrets, uploads, billing, webhooks, or public data surfaces.
- You need to decide whether `@security-auditor` alone is enough or whether a redteam phase is required.
- The blast radius or trust boundary is unclear.

## Core Moves
- Identify the trust boundary and the asset at risk.
- Classify the likely impact: exposure, takeover, privilege escalation, abuse, or denial.
- Pick the lightest safe path: no gate, security review, or full redteam validation.
- Define the proof required before approval.
- Keep the result short enough for `feature-lead` to act on immediately.

## Output
- Risk level
- Required reviewers
- Redteam needed or not
- Validation checklist
- Escalation path

## Anti-Patterns
- Treating all sensitive work as the same risk.
- Asking for redteam when a simple review is enough.
- Letting security checks become vague or endless.
