---
name: plan-writing
description: Structured planning and task breakdown techniques.
version: 1.0.0
---

# Plan Writing

Structured approaches to creating plans, breaking down tasks, and defining success criteria.

## Plan Structure

### Minimal Plan Template

```markdown
# PLAN: [Feature Name]

## What
Brief description of what we're building.

## Why
Business justification and user value.

## How
High-level technical approach.

## Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
```

### Comprehensive Plan Template

```markdown
# PLAN: [Feature Name]

## Executive Summary
One paragraph overview.

## Problem Statement
What problem are we solving?

## Proposed Solution
How will we solve it?

## User Stories
1. As a [user], I want [goal] so that [benefit]
2. ...

## Technical Design
### Architecture
[Diagram or description]

### API Design
[Endpoints/contracts]

### Data Model
[Schema/ERD]

## Implementation Plan
### Phase 1: Foundation
- [ ] Task 1.1
- [ ] Task 1.2

### Phase 2: Core Features
- [ ] Task 2.1
- [ ] Task 2.2

### Phase 3: Polish
- [ ] Task 3.1
- [ ] Task 3.2

## Dependencies
- Dependency 1
- Dependency 2

## Risks & Mitigations
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| ... | ... | ... | ... |

## Success Metrics
| Metric | Target | How Measured |
|--------|--------|--------------|
| ... | ... | ... |

## Timeline
- Phase 1: [dates]
- Phase 2: [dates]
- Phase 3: [dates]

## Open Questions
1. [Question] - Owner: [name]
2. [Question] - Owner: [name]

## Appendix
- [Supporting documents]
- [Research notes]
```

## Task Breakdown

### WBS (Work Breakdown Structure)

```
Feature: User Authentication
├── 1. Registration
│   ├── 1.1 Registration form UI
│   ├── 1.2 Form validation
│   ├── 1.3 API endpoint
│   ├── 1.4 Email verification
│   └── 1.5 Password hashing
├── 2. Login
│   ├── 2.1 Login form UI
│   ├── 2.2 JWT generation
│   ├── 2.3 Session management
│   └── 2.4 Logout flow
└── 3. Password Reset
    ├── 3.1 Forgot password form
    ├── 3.2 Reset token generation
    └── 3.3 Reset password form
```

### Task Sizing

| Size | Duration | Characteristics |
|------|----------|-----------------|
| **XS** | < 1 hour | Typo fix, config change |
| **S** | 1-4 hours | Simple component, small fix |
| **M** | 4-8 hours | Feature with multiple parts |
| **L** | 1-2 days | Complex feature, multiple files |
| **XL** | 2-5 days | Major feature, needs breakdown |

### Dependency Mapping

```markdown
Task Dependencies:

A ─────► B ─────► D
         │
         └───────► C ─────► E

Execution Order:
1. A (no dependencies)
2. B (depends on A)
3. C (depends on B)
4. D (depends on B)
5. E (depends on C)
```

## Success Criteria

### SMART Criteria

| Letter | Meaning | Example |
|--------|---------|---------|
| **S**pecific | Clear and precise | "Reduce load time" → "Reduce LCP to < 2.5s" |
| **M**easurable | Quantifiable | "Improve UX" → "Increase conversion by 10%" |
| **A**chievable | Realistic | Based on resources and constraints |
| **R**elevant | Aligned with goals | Supports business objectives |
| **T**ime-bound | Has deadline | "Complete by Q2" |

### Acceptance Criteria Template

```markdown
## User Story
As a [user type], I want [goal] so that [benefit]

## Acceptance Criteria
- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]
- [ ] Given [context], when [action], then [outcome]

## Edge Cases
- [ ] Handle [edge case]
- [ ] Handle [edge case]

## Non-Functional
- [ ] Performance: [requirement]
- [ ] Security: [requirement]
- [ ] Accessibility: [requirement]
```

## Risk Assessment

### Risk Matrix

```
              IMPACT
           Low    Med    High
         ┌──────┬──────┬──────┐
    High │Monitor│Plan  │Act   │
LIK      ├──────┼──────┼──────┤
    Med  │Accept │Monitor│Plan │
         ├──────┼──────┼──────┤
    Low  │Accept │Accept │Monitor│
         └──────┴──────┴──────┘
```

### Risk Register Template

```markdown
| ID | Risk | Likelihood | Impact | Score | Mitigation | Owner |
|----|------|------------|--------|-------|------------|-------|
| R1 | API changes | Medium | High | 6 | Version lock | Dev |
| R2 | Staff change | Low | High | 3 | Documentation | PM |
```

## Estimation Techniques

### Planning Poker

```
Team members estimate:
- Developer A: 5
- Developer B: 8
- Developer C: 5
- Developer D: 13

Discuss high/low outliers, reach consensus.
```

### Three-Point Estimation

```
Optimistic (O): 2 days
Most Likely (M): 4 days
Pessimistic (P): 8 days

Expected = (O + 4M + P) / 6 = (2 + 16 + 8) / 6 = 4.33 days
```

## Plan Review Checklist

- [ ] **Clear Objective**: What and why are clear
- [ ] **Complete Breakdown**: All tasks identified
- [ ] **Dependencies Mapped**: Order is logical
- [ ] **Sized Appropriately**: Tasks are achievable
- [ ] **Success Criteria**: Measurable outcomes defined
- [ ] **Risks Identified**: Major risks documented
- [ ] **Timeline Realistic**: Based on estimates
- [ ] **Stakeholders Aligned**: Key people approve

---

**A good plan eliminates ambiguity and enables execution.**
