# Multi-Environment Deployment Strategy

This guide explains how to set up and manage deployments across development, staging, and production environments.

## Table of Contents

- [Environment Setup](#environment-setup)
- [GitHub Environments](#github-environments)
- [Protection Rules](#protection-rules)
- [Deployment Flow](#deployment-flow)
- [Environment Variables & Secrets](#environment-variables--secrets)
- [Approval Workflows](#approval-workflows)
- [Monitoring Deployments](#monitoring-deployments)

## Environment Setup

### Overview

This project uses three deployment environments:

| Environment | Purpose | Auto-Deploy | Approval | Visibility |
|---|---|---|---|---|
| **dev** | Development testing | ✅ On develop branch | ❌ None | Internal |
| **staging** | QA and pre-release testing | ❌ Manual only | ⚠️ Optional | Internal |
| **prod** | Live production | ❌ On release tags only | ✅ Required | Public |

### Setting Up GitHub Environments

Navigate to your repository settings to create environments:

1. Go to **Settings → Environments**
2. Click **New environment**
3. Enter environment name (e.g., "dev", "staging", "prod")
4. Configure protection rules (see below)

## GitHub Environments

### Creating an Environment

**In GitHub UI:**

1. Repository → Settings → Environments → New environment
2. Set environment name and URL (if applicable)
3. Configure protection rules

**Environment Properties:**

```yaml
environment:
  name: production
  url: https://example.com
```

### Deployment Status

GitHub tracks deployments for each environment:

- Deployment created when workflow runs
- Status updated during deployment
- History available in "Deployments" tab
- Linked to releases and commits

## Protection Rules

Production deployments require protection rules to prevent accidental deploys.

### Setting Up Protection Rules

**In GitHub UI → Settings → Environments → [environment name]:**

1. **Required reviewers**
   - ✅ Enable for production
   - Require N reviewers (usually 1)
   - Optionally dismiss stale reviews

2. **Deployment branches**
   - ✅ Allow main branch only for production
   - Allow develop for staging
   - Prevent deploying from feature branches

3. **Wait timer**
   - Add delay before deployment (e.g., 30 minutes)
   - Gives time to catch issues before deploy
   - Useful for production

### Example Configuration

**Production Environment Protection:**

```
✅ Required reviewers: 1
✅ Deployment branches: main only
✅ Wait timer: 30 minutes
```

**Staging Environment Protection:**

```
❌ Required reviewers: None
✅ Deployment branches: develop, main
❌ Wait timer: None
```

## Deployment Flow

### Development (Auto-Deploy)

```
Push to develop → deploy-dev.yml → Deploy to dev
```

**Characteristics:**
- Automatic on every push
- Immediate feedback
- Safe for development as failures don't block merges

### Staging (Manual Deploy)

```
Manually trigger → deploy-staging-manual.yml → Deploy to staging
```

**How to Trigger:**

1. Go to **Actions** tab
2. Select **Deploy - Staging (Manual)** workflow
3. Click **Run workflow**
4. Enter:
   - Branch/tag to deploy (e.g., "develop")
   - Approval message (optional)
5. Click **Run workflow**

### Production (Release-Based Deploy)

```
Create Release (tag) → deploy-prod-release.yml → Approve → Deploy to prod
```

**How to Create a Release:**

1. Go to **Releases** page (or Code tab → Releases)
2. Click **Create a new release**
3. Choose tag version (e.g., "v1.0.0")
4. Set release title and description
5. Mark as prerelease if needed
6. Click **Publish release**
7. Approve deployment when prompted

**Approval Process:**

1. Workflow triggers on release creation
2. Requires reviewer approval (GitHub environment protection)
3. Wait timer (if configured)
4. Reviewer approves in Actions tab or via GitHub review
5. Deployment proceeds

## Environment Variables & Secrets

### Repository Variables

Store shared configuration:

**Settings → Secrets and variables → Repository variables**

```yaml
# Example: shared API endpoints
API_ENDPOINT: "https://api.example.com"
```

### Environment-Specific Secrets

Store sensitive data per environment:

**Settings → Environments → [env name] → Environment secrets**

```
DEPLOY_TOKEN: [secret value]
DATABASE_URL: [environment-specific URL]
API_KEY: [environment-specific key]
```

### Using Secrets in Workflows

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  
steps:
  - name: Deploy
    env:
      DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
    run: ./deploy.sh
```

**Important:**
- Secrets are never printed to logs
- Create separate secrets per environment
- Rotate secrets periodically
- Use GitHub's secret scanning

### Example Environment Setup

**Development (dev):**
- `DEPLOY_TOKEN`: dev-specific token
- `DATABASE_URL`: dev database URL
- `ENVIRONMENT`: development

**Staging (staging):**
- `DEPLOY_TOKEN`: staging-specific token
- `DATABASE_URL`: staging database URL
- `ENVIRONMENT`: staging

**Production (prod):**
- `DEPLOY_TOKEN`: prod-specific token (highly restricted)
- `DATABASE_URL`: prod database URL
- `ENVIRONMENT`: production
- Optional OIDC token for cloud providers

## Approval Workflows

### Automatic Approval Requirements

**Production deployments require:**

1. ✅ **Required reviewer approval**
   - Set in environment protection rules
   - Reviewer must have push access
   - One approval is sufficient (customizable)

2. ✅ **Code must pass all checks**
   - All CI tests must pass
   - Linting must pass
   - Security scans must pass

3. ✅ **Must be on main branch**
   - Enforced via Git branch protection + environment rules
   - Prevents accidental deployments from feature branches

### Approving a Deployment

**Option 1: In GitHub UI**

1. Go to **Actions** tab
2. Find the deployment workflow run
3. Look for yellow approval button
4. Click **Approve and deploy** or **Reject**

**Option 2: In Deployment Tab**

1. Go to **Deployments** tab
2. Find pending deployment
3. Click review required
4. Approve or reject

## Monitoring Deployments

### Deployment Status

**In GitHub UI:**

1. **Actions tab**: See workflow runs and status
2. **Deployments tab**: See deployment history per environment
3. **Environments**: See current environment state

### Deployment Logs

**View logs:**

1. Actions tab → Click workflow run
2. Click specific job
3. View step-by-step logs

**Troubleshoot failures:**

- Check job logs for error messages
- Verify environment secrets exist
- Check branch/tag is correct
- Verify permissions (reviewer approval)

### Rollback

**If a deployment fails:**

1. Deploy the previous stable version
2. Manually run the deployment workflow with a previous tag
3. Push a fix and redeploy

**Prevent rollbacks:**

- Thorough testing in staging
- Careful review before approval
- Automated security scans

## Best Practices

### 1. **Use Semantic Versioning**

```
v1.0.0      # Major release
v1.1.0      # Minor release (new features)
v1.0.1      # Patch release (bugfixes)
v1.1.0-rc1  # Release candidate (prerelease)
```

### 2. **Require Multiple Reviewers for Prod**

```
Settings → Environments → prod → Require 1+ reviewer
```

### 3. **Set Wait Timers for Production**

```
Settings → Environments → prod → Wait timer: 30 minutes
```

Gives time to catch issues before deployment proceeds.

### 4. **Use Descriptive Release Names**

```
v1.2.0: Customer portal redesign + performance fixes
```

### 5. **Test in Staging First**

Always deploy to staging before production:

1. Create staging release or manually deploy
2. Run tests and validation
3. Get stakeholder approval
4. Create production release

### 6. **Monitor After Deployment**

- Check application logs
- Monitor error rates
- Verify key metrics
- Have rollback plan ready

### 7. **Document Deployment Runbook**

Create a runbook for production deployments:

```markdown
# Production Deployment Runbook

## Pre-Deployment Checklist
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Changelog updated
- [ ] Database migrations tested

## Deployment
1. Create release on GitHub
2. Approve deployment when prompted
3. Monitor logs during deployment

## Post-Deployment
- [ ] Health checks pass
- [ ] Error rates normal
- [ ] Key metrics unchanged
- [ ] Users report no issues

## Rollback Plan
If issues detected: `git tag v[previous] && git push origin v[previous]`
```

## Environment URL Configuration

Set environment URLs for easy access:

```yaml
environment:
  name: production
  url: https://app.example.com
```

The URL appears:
- In deployment status badges
- In GitHub UI
- In commit/release references

## Summary

| Step | Dev | Staging | Prod |
|------|-----|---------|------|
| **Trigger** | Auto on push | Manual dispatch | Auto on release |
| **Who deploys** | CI/CD | Any authorized user | CI/CD |
| **Approval needed** | ❌ No | ⚠️ Optional | ✅ Yes |
| **Risk level** | Low | Medium | High |
| **Frequency** | Every push | Weekly-ish | Monthly+ |

---

For security practices, see [SECURITY_PRACTICES.md](./SECURITY_PRACTICES.md).

For workflow details, see [WORKFLOWS_REFERENCE.md](./WORKFLOWS_REFERENCE.md).
