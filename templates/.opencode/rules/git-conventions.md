# Git Conventions

Standardized git workflow and commit conventions.

## Branch Strategy

### Branch Types

| Type | Pattern | Purpose |
|------|---------|---------|
| Feature | `feature/description` | New features |
| Fix | `fix/description` | Bug fixes |
| Refactor | `refactor/description` | Code improvements |
| Docs | `docs/description` | Documentation |
| Release | `release/v1.0.0` | Release preparation |
| Hotfix | `hotfix/description` | Production fixes |

### Branch Workflow

```
main ─────●─────●─────●─────●─────→
          \           /
feature/a  ●───●───●  merge
               
          \       /
feature/b  ●───●───●  merge
```

## Commit Messages

### Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code refactoring |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |
| `perf` | Performance improvement |

### Examples

```bash
# Feature
feat(auth): add JWT refresh token support

# Fix
fix(api): handle null response from user service

# Breaking change
feat(api)!: change user endpoint response format

BREAKING CHANGE: The /api/user endpoint now returns
a different structure. See migration guide.
```

## Pull Request Process

### PR Title

Use the same format as commit messages:

```
feat(auth): add JWT refresh token support
```

### PR Description

```markdown
## What
Brief description of changes.

## Why
Why this change is needed.

## How
Technical approach taken.

## Testing
- [ ] Unit tests added
- [ ] Integration tests added
- [ ] Manual testing done

## Screenshots
[If applicable]

## Checklist
- [ ] Code follows conventions
- [ ] Tests pass
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. Create PR with description
2. Assign reviewers
3. Address review comments
4. Get approval
5. Squash and merge

## Merge Strategies

### Squash and Merge (Default)

- Combines all commits into one
- Clean history on main
- PR description preserved

### Rebase and Merge

- Preserves individual commits
- Linear history
- Use for feature branches with clean commits

### Merge Commit

- Preserves branch history
- Use for release branches
- Creates merge commit

## Git Aliases

```bash
# Useful aliases
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.lg "log --oneline --graph"
git config --global alias.unstage "reset HEAD --"
```

---

**Consistent git practices enable smooth collaboration.**
