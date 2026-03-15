---
description: Systematically debug and fix issues. Use when encountering errors, bugs, or unexpected behavior.
---

# /debug Workflow

Systematically identify and fix bugs, errors, and unexpected behavior.

## When to Use

- Application is crashing
- Feature not working as expected
- Error messages appearing
- Performance issues
- Unexpected behavior

## Workflow Steps

### Step 1: Reproduce

```
Document the issue:
1. What is the expected behavior?
2. What is the actual behavior?
3. What are the exact steps to reproduce?
4. What environment? (browser, OS, version)
```

### Step 2: Gather Information

```
Collect evidence:
- Error messages and stack traces
- Logs and console output
- Recent code changes
- Environment differences
```

### Step 3: Hypothesize

```
Generate possible causes:
1. [Hypothesis 1] - Why it might be happening
2. [Hypothesis 2] - Alternative explanation
3. [Hypothesis 3] - Another possibility
```

### Step 4: Test Hypotheses

```
For each hypothesis:
1. Design a test to verify/falsify
2. Run the test
3. Document results
4. Narrow down root cause
```

### Step 5: Fix Root Cause

```
Once root cause is identified:
1. Implement the fix
2. Address the underlying issue, not just symptoms
3. Add safeguards to prevent recurrence
```

### Step 6: Verify Fix

```
Ensure the fix works:
1. Test the original reproduction steps
2. Test edge cases
3. Check for regressions
4. Run existing tests
```

### Step 7: Document

```
Record the fix:
- What was the issue?
- What was the root cause?
- What was the fix?
- How to prevent in future?
```

## Example

```
User: /debug login returns 500 error

Agent: I'll help you debug the login error.

**Step 1: Reproduce**
- Navigate to /login
- Enter valid credentials
- Click login
- Error: "500 Internal Server Error"

**Step 2: Gather Information**
- Stack trace points to auth.service.ts:45
- Recent commit modified password hashing
- Error: "Cannot read property 'hash' of undefined"

**Step 3: Hypothesize**
1. Password object is undefined
2. Hash function signature changed
3. Missing null check

**Step 4: Test**
- Checked password hashing library update
- Found: hash() now returns Promise, was sync

**Step 5: Fix**
- Added await to hash() call
- Added null check for password

**Step 6: Verify**
- Login works correctly
- Tests pass
- No regressions

**Fixed:** Added await to async password hashing function.
```

---

**Debug systematically, fix root causes, not symptoms.**
