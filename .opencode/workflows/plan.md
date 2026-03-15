---
description: Create structured task breakdowns and plans. Use when starting complex work.
---

# /plan Workflow

Create detailed plans and task breakdowns for complex work.

## When to Use

- Starting a new feature
- Breaking down complex tasks
- Creating project roadmaps
- Need clear direction before coding

## Workflow Steps

### Step 1: Understand the Goal

```
Clarify the objective:
1. What are we building?
2. Why does it matter?
3. What are the constraints?
4. What does success look like?
```

### Step 2: Gather Requirements

```
Document requirements:
- Functional requirements
- Non-functional requirements
- Constraints
- Assumptions
```

### Step 3: Break Down Tasks

```
Decompose into atomic tasks:
1. Each task should be completable in < 1 day
2. Tasks should have clear deliverables
3. Dependencies should be identified
4. Effort estimates should be included
```

### Step 4: Sequence Tasks

```
Order by dependencies:
- What must be done first?
- What can be done in parallel?
- What's the critical path?
```

### Step 5: Define Success Criteria

```
How will we know we're done?
- Measurable outcomes
- Acceptance criteria
- Quality gates
```

### Step 6: Document the Plan

```
Create plan document:
- Overview
- Requirements
- Tasks
- Dependencies
- Timeline
- Success criteria
```

## Plan Template

```markdown
# PLAN: [Feature Name]

## Overview
Brief description.

## Requirements
### Functional
- [ ] Requirement 1
- [ ] Requirement 2

### Non-Functional
- Performance: [target]
- Security: [requirements]

## Tasks
### Phase 1: [Name]
| Task | Size | Dependencies |
|------|------|--------------|
| 1.1 [Task] | S | None |
| 1.2 [Task] | M | 1.1 |

### Phase 2: [Name]
| Task | Size | Dependencies |
|------|------|--------------|
| 2.1 [Task] | S | 1.2 |

## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Risks
| Risk | Mitigation |
|------|------------|
| [Risk] | [Action] |
```

## Example

```
User: /plan shopping cart feature

Agent: I'll create a plan for the shopping cart feature.

**Goal Clarification:**
- Add shopping cart to e-commerce site
- Users can add/remove items
- Persist across sessions
- Calculate totals with tax

**Requirements:**
- Add to cart from product page
- View cart with quantities
- Update quantities
- Remove items
- Calculate subtotal, tax, total
- Persist for logged-in users

**Tasks:**
| Task | Size | Dependencies |
|------|------|--------------|
| 1.1 Create CartItem type | XS | None |
| 1.2 Create CartStore | S | 1.1 |
| 1.3 Create AddToCart button | S | 1.2 |
| 1.4 Create CartPage | M | 1.2 |
| 1.5 Create CartItem component | S | 1.1 |
| 1.6 Implement quantity update | S | 1.4 |
| 1.7 Implement remove item | S | 1.4 |
| 1.8 Implement totals calculation | S | 1.1 |
| 1.9 Add persistence | M | 1.2 |
| 1.10 Add tests | M | All |

**Success Criteria:**
- [ ] Users can add/remove items
- [ ] Cart persists across sessions
- [ ] Totals calculate correctly
- [ ] All tests pass

**Plan saved to: context/shopping-cart/PLAN.md**
```

---

**Good plans make execution straightforward.**
