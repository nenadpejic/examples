# Security Best Practices

Security is critical in CI/CD workflows. This guide covers protecting secrets, managing permissions, and preventing common vulnerabilities.

## Table of Contents

- [Secrets Management](#secrets-management)
- [GITHUB_TOKEN Permissions](#github_token-permissions)
- [Action Security](#action-security)
- [Script Injection Prevention](#script-injection-prevention)
- [OIDC & Cloud Authentication](#oidc--cloud-authentication)
- [Dependency Security](#dependency-security)
- [Workflow Audit](#workflow-audit)

## Secrets Management

### Types of Secrets

**GitHub Secrets:**
- Stored encrypted in GitHub
- Never printed to logs
- Per-repository or per-environment
- Limited to 64KB each

**OAuth Tokens (GITHUB_TOKEN):**
- Automatically created per workflow run
- Short-lived (expires after workflow completes)
- Scoped to repository
- Limited permissions by default

**External Secrets:**
- API keys from third-party services
- Database credentials
- Deployment tokens
- Should be stored in GitHub Secrets

### Creating Secrets

**Repository Secrets (Settings → Secrets → New repository secret):**

```
Name: API_KEY
Secret: [paste value]
```

**Environment Secrets (Settings → Environments → [env] → Environment secrets):**

```
Name: PROD_DEPLOY_TOKEN
Secret: [paste value]
```

### Using Secrets in Workflows

**✅ Correct Ways:**

```yaml
- name: Deploy
  env:
    API_KEY: ${{ secrets.API_KEY }}
  run: ./deploy.sh
```

```yaml
- name: Clone private repo
  run: |
    git clone https://${{ secrets.GH_TOKEN }}@github.com/org/repo.git
```

**❌ Incorrect Ways:**

```yaml
# DON'T - secret in command directly
- name: Deploy
  run: ./deploy.sh --token ${{ secrets.API_KEY }}  # Will appear in logs!

# DON'T - hardcoded values
- name: Deploy
  run: ./deploy.sh --token abc123def456
```

### Masking Secrets

Secrets are automatically masked. For custom sensitive data:

```yaml
- name: Log sensitive data
  run: |
    # Manually mask custom secrets
    echo "::add-mask::my-sensitive-value"
    echo "Using: my-sensitive-value"  # Output: Using: ***
```

### Secret Rotation

**When to rotate:**
- After suspected compromise
- Quarterly as policy
- When team member leaves
- After security incident

**How to rotate:**
1. Create new secret
2. Update workflows to use new secret
3. Test with new secret
4. Delete old secret

**Tracking:**
- Document rotation dates
- Use secret versioning in name if needed

## GITHUB_TOKEN Permissions

`GITHUB_TOKEN` is automatically created for each workflow. By default, it has broad access. Restrict it using **least privilege principle**.

### Default Permissions

Default access varies by trigger:
- `pull_request`: Read contents, write checks/pull requests
- `push`: Read/write contents
- `schedule`: Read contents

### Setting Minimal Permissions

```yaml
permissions:
  contents: read              # Only read repository content
  pull-requests: write        # Can write PR comments
  security-events: read       # Can read CodeQL results
```

### Permission Levels

```yaml
permissions:
  contents: read              # read-only or read-write
  pull-requests: write        # write-only or read-write
  deployments: write
  checks: write
  statuses: write
  packages: read|write
  security-events: read|write
  issues: write
```

### Principle of Least Privilege

Only grant permissions needed for the job:

```yaml
jobs:
  lint:
    permissions:
      contents: read          # Only need to read code
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint
```

```yaml
jobs:
  comment-pr:
    permissions:
      pull-requests: write    # Only need to comment
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: github.rest.issues.createComment({...})
```

## Action Security

### Pinning Action Versions

Always pin actions to specific commits (not tags or branches):

**✅ Secure (pinned to commit SHA):**
```yaml
- uses: actions/checkout@a81bbbf8298c0fa03ea29cdc473d45769f953675
```

**⚠️ Less Secure (pinned to tag, can be retagged):**
```yaml
- uses: actions/setup-node@v4
```

**❌ Insecure (latest, unpredictable):**
```yaml
- uses: actions/checkout@main
```

### Finding Commit SHAs

```bash
# Find commit SHA for a tag
git ls-remote --tags https://github.com/actions/checkout | grep v4.0.0
# Output: [commit-sha]    refs/tags/v4.0.0
```

### Auditing Actions

**Regularly audit actions:**
1. Check for security updates in dependabot alerts
2. Review action source code before using
3. Use official actions from `actions/` namespace
4. Avoid third-party actions from unknown sources

### Approved Actions List

Maintain a list of approved actions in CODEOWNERS or documentation:

```yaml
# Approved actions
- actions/checkout@*
- actions/setup-node@*
- actions/upload-artifact@*
- github/codeql-action@*

# Need review before using:
- actions/deploy-pages
- aws-actions/configure-aws-credentials
```

## Script Injection Prevention

Scripts can execute arbitrary code if not careful with user input. Always sanitize input.

### Vulnerable Pattern

```yaml
# ❌ DANGEROUS: User input in script
on:
  issues:
    types: [opened]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - name: Comment on issue
        run: |
          echo "${{ github.event.issue.title }}"
          # If title contains `; rm -rf /`, it executes!
```

### Safe Pattern 1: Use Environment Variables

```yaml
# ✅ SAFE: Use env variable, not inline
on:
  issues:
    types: [opened]

jobs:
  comment:
    runs-on: ubuntu-latest
    env:
      ISSUE_TITLE: ${{ github.event.issue.title }}
    steps:
      - name: Comment on issue
        run: |
          echo "$ISSUE_TITLE"  # Quoted and in env, safe
```

### Safe Pattern 2: Use Actions Instead of Scripts

```yaml
# ✅ SAFER: Use action that handles input safely
- uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        issue_number: context.issue.number,
        owner: context.repo.owner,
        repo: context.repo.repo,
        body: '${{ github.event.issue.title }}'
      });
```

### Safe Pattern 3: Quote Variables

```yaml
# ✅ SAFE: Properly quoted
- run: |
    TITLE="${{ github.event.issue.title }}"
    echo "Title: $TITLE"
```

### Rule of Thumb

- Untrusted inputs: PR titles, PR descriptions, issue body, commit messages
- Trust: Direct context variables like `github.sha`, `github.ref`
- When in doubt: Use environment variables and quote them

## OIDC & Cloud Authentication

For cloud providers (AWS, Azure, GCP), use OpenID Connect instead of long-lived secrets.

### Why OIDC?

- **Short-lived tokens**: Expire within workflow run
- **Minimal permissions**: Only needed permissions
- **Audit trail**: CloudTrail logs which runner deployed
- **No secrets to rotate**: Tokens are temporary

### Supported Providers

- AWS (AWS STS)
- Azure (Azure AD)
- Google Cloud (Workload Identity Federation)
- HashiCorp Vault
- JFrog Artifactory
- PyPI
- Octopus Deploy

### OIDC Setup (Example: AWS)

**In AWS:**
1. Create OIDC provider: `https://token.actions.githubusercontent.com`
2. Create role with trust relationship for your repo
3. Attach deployment policy

**In GitHub Workflow:**

```yaml
permissions:
  id-token: write              # Request OIDC token

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions
          aws-region: us-east-1

      - name: Deploy
        run: aws s3 sync dist/ s3://my-bucket/
```

**Benefits:**
- No AWS access keys stored as secrets
- Token valid only during workflow execution
- Automatic audit trail

### For This Project

This example uses GitHub Secrets for simplicity. In production with cloud providers, use OIDC.

## Dependency Security

### Dependency Scanning

**Enable Dependabot (Settings → Code security & analysis):**
- ✅ Enable Dependabot alerts
- ✅ Enable Dependabot security updates
- ✅ Enable dependency graph

### Vulnerable Dependencies

When Dependabot finds vulnerabilities:
1. Creates security alert
2. Optionally creates auto-fix PR
3. Shows in "Security" → "Dependabot alerts"

**Responding:**
1. Review the vulnerability
2. Merge auto-fix PR or manually update
3. Run tests to ensure compatibility
4. Deploy fix

### npm audit

Check for vulnerabilities manually:

```bash
npm audit                       # Show vulnerabilities
npm audit --audit-level=moderate  # Threshold
npm audit fix                   # Auto-fix
```

### License Compliance

Check licenses of dependencies:

```bash
npx license-checker
```

## Workflow Audit

### Code Owners for Workflows

Require review of workflow changes:

**.github/CODEOWNERS:**
```
.github/workflows/ @security-team
.github/reusable/ @security-team
```

### Require Reviews for Workflow Changes

**Settings → Code and automation → Branch protection:**
- ✅ Require pull request reviews
- ✅ Require code review from code owners
- ✅ Dismiss stale pull request approvals

### Audit Workflow Changes

**Actions Audit Log (Settings → Audit log):**
- View who ran workflows
- Track workflow changes
- See secret access

### Monitor for Suspicious Activity

Check for:
- Workflows running unexpectedly
- Unusual secret access
- Unexpected deployments
- Failed security scans ignored

## Security Checklist

- ✅ Repository secrets stored (not hardcoded)
- ✅ GITHUB_TOKEN permissions minimized
- ✅ Actions pinned to commit SHAs
- ✅ No script injection vulnerabilities
- ✅ Secrets not logged or printed
- ✅ Dependabot enabled
- ✅ Code owners defined for workflows
- ✅ Environment protection rules for prod
- ✅ Approvals required for prod deployment
- ✅ Audit logging enabled
- ✅ OIDC configured for cloud (if applicable)
- ✅ Regular dependency audits

## Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides)
- [OWASP CI/CD Security](https://owasp.org/www-community/CI-CD-Security)
- [GitHub Actions Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

---

For workflows using these secrets, see [WORKFLOWS_REFERENCE.md](./WORKFLOWS_REFERENCE.md).

For deployment approval workflows, see [DEPLOYMENT_STRATEGY.md](./DEPLOYMENT_STRATEGY.md).
