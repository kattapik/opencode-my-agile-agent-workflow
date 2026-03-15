---
description: Deploy application to production or staging. Use when ready to release.
---

# /deploy Workflow

Deploy applications to production, staging, or other environments.

## When to Use

- Ready to release to production
- Deploying to staging for testing
- Rolling out a new version
- Setting up CI/CD

## Workflow Steps

### Step 1: Pre-Deployment Check

```
Verify readiness:
- [ ] All tests pass
- [ ] Code reviewed and approved
- [ ] Changelog updated
- [ ] Environment variables configured
- [ ] Database migrations ready (if needed)
```

### Step 2: Build

```
Prepare the build:
1. Install dependencies
2. Run build command
3. Verify build output
4. Check bundle size
```

### Step 3: Deploy

```
Execute deployment:
1. Choose deployment target
2. Deploy to environment
3. Monitor deployment progress
4. Verify deployment success
```

### Step 4: Post-Deployment Verification

```
Verify the deployment:
1. Health check endpoints
2. Smoke tests
3. Key user flows
4. Error monitoring
```

### Step 5: Monitor

```
Watch for issues:
- Error rates
- Response times
- Resource usage
- User feedback
```

## Deployment Targets

### Vercel

```bash
# Install CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t app:latest .

# Run container
docker run -p 3000:3000 app:latest
```

### Kubernetes

```bash
# Apply manifests
kubectl apply -f k8s/

# Verify deployment
kubectl get pods
```

### AWS

```bash
# Deploy to ECS
aws ecs update-service --cluster prod --service app --force-new-deployment

# Or use SAM/CDK
sam deploy --guided
```

## Rollback Plan

```
If deployment fails:
1. Identify the issue
2. Rollback to previous version
3. Investigate in development
4. Fix and redeploy

Rollback commands:
- Vercel: vercel rollback
- Docker: docker tag app:previous app:latest
- K8s: kubectl rollout undo deployment/app
```

## Example

```
User: /deploy to production

Agent: I'll help you deploy to production.

**Pre-Deployment Check:**
- [x] All tests pass
- [x] Code reviewed
- [x] Changelog updated
- [x] Environment configured

**Build:**
- Installing dependencies...
- Building application...
- Bundle size: 245KB (within budget)

**Deploy:**
- Target: Vercel
- Environment: production
- Deploying...

**Verification:**
- Health check: ✅
- Smoke tests: ✅
- Key flows: ✅

**Deployed Successfully!**
URL: https://app.example.com
```

---

**Deploy with confidence, rollback with ease.**
