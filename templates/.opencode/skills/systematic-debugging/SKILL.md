---
name: systematic-debugging
description: Methodical approach to identifying and fixing bugs.
version: 1.0.0
---

# Systematic Debugging

A methodical approach to finding and fixing bugs efficiently.

## Debugging Methodology

### The Scientific Method

1. **Observe** - What's the symptom?
2. **Hypothesize** - What could cause this?
3. **Test** - Verify or disprove hypothesis
4. **Repeat** - Until root cause found
5. **Fix** - Address the root cause
6. **Verify** - Confirm fix works
7. **Document** - Record for future

## Step-by-Step Process

### Step 1: Reproduce

```markdown
Document exact steps:
1. Open browser
2. Navigate to /dashboard
3. Click "Export" button
4. Error appears

Environment:
- Browser: Chrome 120
- OS: macOS 14
- Node: v20.10.0
```

### Step 2: Gather Information

```bash
# Check logs
tail -f /var/log/app.log

# Check recent changes
git log --oneline -10

# Check error stack trace
Error: Cannot read property 'map' of undefined
    at exportData (src/utils/export.ts:45)
    at handleClick (src/components/ExportButton.tsx:23)
```

### Step 3: Hypothesize

```markdown
Possible causes (ranked by likelihood):
1. data is null/undefined when exportData is called
2. data structure changed but exportData not updated
3. Race condition in data loading
4. API returning unexpected format
```

### Step 4: Test Hypotheses

```typescript
// Add defensive logging
console.log('exportData called with:', { data, type: typeof data });

// Add type guard
if (!data || !Array.isArray(data)) {
  console.error('Invalid data for export:', data);
  return;
}
```

### Step 5: Fix Root Cause

```typescript
// ❌ Fix symptom only
const items = data?.items || []; // Hides the real problem

// ✅ Fix root cause
// Investigate WHY data is undefined and fix upstream
async function loadData() {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.status}`);
  }
  return response.json();
}
```

## Common Bug Patterns

### Null/Undefined Errors

```typescript
// ❌ Crashes on null
const name = user.profile.name;

// ✅ Safe access
const name = user?.profile?.name ?? 'Unknown';
```

### Race Conditions

```typescript
// ❌ Race condition
let data;
fetchData().then(result => { data = result; });
console.log(data); // undefined!

// ✅ Proper async handling
const data = await fetchData();
console.log(data);
```

### State Sync Issues

```typescript
// ❌ Stale closure
const [count, setCount] = useState(0);
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // Always 0!
  }, 1000);
  return () => clearInterval(interval);
}, []);

// ✅ Use ref or dependency
const countRef = useRef(count);
countRef.current = count;
// Or add count to dependencies
```

## Debugging Tools

### Console Debugging

```typescript
// Strategic logging
console.log('1. Before fetch');
const data = await fetch(url);
console.log('2. After fetch:', data);
const processed = processData(data);
console.log('3. After process:', processed);

// Performance timing
console.time('operation');
doSomething();
console.timeEnd('operation');
```

### Browser DevTools

```
1. Sources panel - Set breakpoints
2. Network panel - Check API calls
3. Console - Run expressions
4. React DevTools - Component tree
5. Performance - Record profile
```

### Node.js Debugging

```bash
# Inspector mode
node --inspect app.js

# Then open chrome://inspect
```

## Debugging Checklist

- [ ] **Reproduced**: Can consistently reproduce
- [ ] **Isolated**: Narrowed to specific area
- [ ] **Root cause**: Understand WHY
- [ ] **Fix implemented**: Addresses cause, not symptom
- [ ] **Verified**: Fix resolves the issue
- [ ] **No regressions**: Other functionality intact
- [ ] **Tests added**: Prevents future occurrences

## Anti-Patterns to Avoid

### Shotgun Debugging

```
❌ Change random things hoping it works
✅ Change one thing at a time, verify each
```

### Console.log Everything

```
❌ console.log everywhere
✅ Strategic, minimal logging with context
```

### Fix Symptom, Not Cause

```
❌ Add null check to hide error
✅ Find why null occurs and fix upstream
```

---

**Systematic debugging finds root causes faster.**
