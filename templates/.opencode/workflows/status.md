---
description: Check project status, health, and metrics. Use for quick project overview.
---

# /status Workflow

Get a quick overview of project status, health, and key metrics.

## When to Use

- Starting a work session
- Quick project health check
- Before/after changes
- Daily standup preparation

## Workflow Steps

### Step 1: Analyze Codebase

```
Gather information:
- Project structure
- Technology stack
- File counts
- Code statistics
```

### Step 2: Check Quality

```
Run quality checks:
- Linting status
- Type check status
- Test status
- Build status
```

### Step 3: Check Dependencies

```
Review dependencies:
- Outdated packages
- Security vulnerabilities
- Unused dependencies
```

### Step 4: Generate Report

```
Create status summary:
- Project health score
- Key metrics
- Recommendations
```

## Example Output

```markdown
# Project Status

## Overview
- **Type**: Next.js Application
- **Framework**: React 18
- **Language**: TypeScript

## Statistics
- Files: 245
- Lines of code: ~15,000
- Components: 42
- Pages: 12
- API Routes: 8

## Quality Checks
| Check | Status |
|-------|--------|
| Lint | ✅ Pass |
| TypeScript | ✅ Pass |
| Tests | ✅ 156/156 |
| Build | ✅ Success |

## Dependencies
- **Total**: 48
- **Outdated**: 3
- **Vulnerabilities**: 0

## Test Coverage
- Statements: 82%
- Branches: 78%
- Functions: 85%
- Lines: 81%

## Recommendations
1. Update 3 outdated packages
2. Improve branch coverage to 80%+
3. Consider adding E2E tests

## Health Score: 85/100
```

---

**Know your project's health at a glance.**
