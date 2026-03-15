---
name: frontend-design
description: UI/UX patterns, component design, and frontend architecture best practices.
version: 1.0.0
---

# Frontend Design

Patterns and best practices for building maintainable frontend applications.

## Component Design Principles

### Single Responsibility

```typescript
// ❌ Does too much
function UserDashboard() {
  // Fetches data
  // Renders charts
  // Handles settings
  // Manages notifications
}

// ✅ Focused components
function UserDashboard() {
  return (
    <DashboardLayout>
      <UserProfile />
      <ActivityChart />
      <SettingsPanel />
      <NotificationList />
    </DashboardLayout>
  );
}
```

### Component Composition

```typescript
// ❌ Prop drilling
<Parent user={user} onUserChange={setUser} />

// ✅ Composition
<Card>
  <CardHeader title="Profile" />
  <CardSection>
    <UserProfile />
  </CardSection>
  <CardFooter>
    <EditButton />
  </CardFooter>
</Card>
```

### Controlled vs Uncontrolled

```typescript
// Controlled (parent manages state)
function ControlledInput({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// Uncontrolled (component manages state)
function UncontrolledInput({ defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue);
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

## State Management

### Local State (Default)

```typescript
// Component-level state
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState({});
```

### Lift State Up

```typescript
// When multiple components need the same state
function Parent() {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <List items={items} selected={selected} onSelect={setSelected} />
      <Details item={selected} />
    </>
  );
}
```

### Global State (Zustand)

```typescript
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
```

### Server State (React Query)

```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000,
});
```

## Styling Patterns

### Tailwind Best Practices

```typescript
// ❌ Inline everything
<div className="flex flex-col items-center justify-center p-4 m-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">

// ✅ Extract variants with cva
const cardVariants = cva("rounded-lg p-4", {
  variants: {
    variant: {
      default: "bg-white shadow",
      outlined: "border border-gray-200",
      elevated: "bg-white shadow-lg"
    }
  }
});

<div className={cardVariants({ variant })}>
```

### Responsive Design

```typescript
// Mobile-first approach
<div className="
  p-4           // Mobile: padding
  md:p-6        // Tablet: more padding
  lg:p-8        // Desktop: even more
  grid          
  grid-cols-1   // Mobile: 1 column
  md:grid-cols-2 // Tablet: 2 columns
  lg:grid-cols-3 // Desktop: 3 columns
">
```

## Performance Patterns

### Code Splitting

```typescript
// Route-based splitting
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

// Component-based splitting
const HeavyChart = lazy(() => import('./HeavyChart'));
```

### Memoization

```typescript
// Only when needed (measure first!)
const MemoizedList = memo(function List({ items }) {
  return items.map(item => <Item key={item.id} {...item} />);
});

// Memoize callbacks
const handleSubmit = useCallback((data) => {
  submit(data);
}, [submit]);

// Memoize computations
const sortedItems = useMemo(() => {
  return [...items].sort(compareFn);
}, [items]);
```

### Virtualization

```typescript
// For long lists
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList height={600} itemCount={items.length} itemSize={50}>
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
```

## Accessibility

### Semantic HTML

```typescript
// ❌ Divs everywhere
<div onClick={handleClick}>Click me</div>

// ✅ Semantic elements
<button onClick={handleClick}>Click me</button>
```

### ARIA Labels

```typescript
<button aria-label="Close dialog" onClick={onClose}>
  <XIcon />
</button>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

### Focus Management

```typescript
// Trap focus in modal
const modalRef = useRef();
useEffect(() => {
  modalRef.current?.focus();
}, []);
```

---

**Good frontend design balances UX, DX, and performance.**
