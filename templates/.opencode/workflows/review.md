---
description: Code review workflow for validating implementations. Use when reviewing code quality and standards compliance.
---

# /review Workflow

Comprehensive code review against project standards and best practices.

## When to Use

- After completing implementation
- Before merging PRs
- Quality assurance
- Standards compliance check

## Workflow Steps

### Step 1: Identify Scope

```
What to review:
- Recent changes
- Specific files
- Full codebase
- Specific concerns (security, performance, etc.)
```

### Step 2: Run Automated Checks

```
Automated quality gates:
- [ ] Linting passes
- [ ] TypeScript compiles
- [ ] Tests pass
- [ ] No security vulnerabilities
```

### Step 3: Manual Review

```
Code quality review:
- [ ] Code follows project conventions
- [ ] No anti-patterns detected
- [ ] Proper error handling
- [ ] Appropriate abstractions
- [ ] Clear naming
- [ ] Adequate comments
```

### Step 4: Domain-Specific Review

```
Based on code type:
- Frontend: Accessibility, performance, responsive
- Backend: Security, error handling, validation
- Database: Indexes, query efficiency, migrations
```

### Step 5: Generate Report

```
Review summary:
- Overall assessment
- Issues found (critical, major, minor)
- Recommendations
- Approval status
```

## Review Checklist

### General
- [ ] Code is readable and maintainable
- [ ] Functions have single responsibility
- [ ] No code duplication
- [ ] Proper error handling
- [ ] Appropriate logging

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Proper authentication checks
- [ ] SQL injection prevention
- [ ] XSS prevention

### Performance
- [ ] No N+1 queries
- [ ] Appropriate caching
- [ ] No memory leaks
- [ ] Efficient algorithms

### Testing
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] Edge cases covered

## Example

```
User: /review recent changes

Agent: I'll review the recent changes.

**Scope:** Last 5 commits (auth feature)

**Automated Checks:**
- [x] Lint: Pass
- [x] TypeScript: Pass
- [x] Tests: 12/12 Pass
- [x] Security: No vulnerabilities

**Code Review:**

✅ Good:
- Clear function naming
- Proper error handling
- Tests for edge cases

⚠️ Issues Found:

[MAJOR] auth.service.ts:45
- Password comparison not timing-safe
- Recommendation: Use bcrypt.compare()

[MINOR] login.tsx:23
- Missing loading state during submission
- Recommendation: Add isSubmitting state

**Verdict: CHANGES REQUESTED**

Please address the timing-safe comparison issue before merging.
```

---

**Review catches what automation misses.**
