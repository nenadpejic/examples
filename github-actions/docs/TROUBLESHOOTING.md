# Troubleshooting Guide

Common issues and solutions for CI/CD workflows.

## Table of Contents

- [General Debugging](#general-debugging)
- [Dependency Issues](#dependency-issues)
- [Build Failures](#build-failures)
- [Test Failures](#test-failures)
- [Deployment Failures](#deployment-failures)
- [Permission Issues](#permission-issues)
- [Performance Issues](#performance-issues)
- [Getting Help](#getting-help)

## General Debugging

### Viewing Workflow Logs

1. Go to **Actions** tab
2. Select the workflow run
3. Click the job name
4. Expand steps to see logs

### Enabling Debug Logging

Enable debug mode for detailed output:

```yaml
jobs:
  debug-job:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
        env:
          ACTIONS_STEP_DEBUG: true
```

Or via repository settings:
- Go to **Settings → Secrets → Repository secrets**
- Create `ACTIONS_STEP_DEBUG: true`

### Common Log Indicators

| Pattern | Meaning |
|---------|---------|
| ❌ `Error: Process completed with exit code 1` | Step failed |
| ⚠️ `warning: ...` | Non-fatal warning, may or may not be an issue |
| ⏱️ `canceled workflow run` | Workflow was manually stopped |
| 🔄 `run attempt 2 of 3` | Automatic retry happened |

### Re-run Workflow

Click **Re-run jobs** or **Re-run failed jobs** in Actions tab to retry.

## Dependency Issues

### npm Install Fails

**Error:** `npm ERR! code ERESOLVE`

**Cause:** Dependency version conflicts

**Solution:**
```bash
# Locally
npm install --force
# Commit updated package-lock.json
git add package-lock.json
git commit -m "chore: update dependencies"
```

Or in workflow:
```yaml
- name: Install dependencies
  run: npm install --force
```

### Cache Not Found

**Symptom:** Every workflow installs from scratch (no cache hit)

**Causes:**
- First run (expected)
- `package-lock.json` changed
- Different runner (Linux vs Windows)

**Check:**
- Look for "Restore cache" output
- "0 files restored from /...cache" = cache miss
- "N files restored from /...cache" = cache hit (good)

### Node Version Mismatch

**Error:** `node: command not found`

**Solution:**
```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'  # Make sure .nvmrc exists
```

**Verify .nvmrc:**
```bash
cat .nvmrc    # Should contain just version like "18.18.0"
```

## Build Failures

### Build Timeout

**Error:** Job exceeds timeout limit

**Check logs for:**
- Infinite loops in build script
- Network requests hanging
- Disk full

**Solutions:**
```yaml
# Increase timeout
timeout-minutes: 30

# Or investigate why build is slow
- name: Build with verbose logging
  run: npm run build -- --verbose
```

### Out of Disk Space

**Error:** `ENOSPC: no space left on device`

**Solutions:**
```yaml
# Clear cache before building
- run: npm cache clean --force

# Or clean GitHub Actions cache
- name: Clean workspace
  run: rm -rf node_modules .cache
```

### TypeScript Compilation Errors

**Error:** `error TS2307: Cannot find module`

**Solutions:**
1. Check import paths
2. Verify files exist
3. Run locally first: `npx tsc --noEmit`

### Vite Build Error

**Error:** `Failed to resolve entry module`

**Solution:**
```bash
# Check entry point in vite.config.ts
# Usually: src/main.tsx or src/main.ts
# Verify the file exists and is correct
```

## Test Failures

### Tests Pass Locally but Fail in CI

**Causes:**
- Different Node version
- Missing environment variables
- Timing issues (flaky tests)
- Case sensitivity on Linux vs macOS

**Debug:**
```bash
# Match CI environment exactly
nvm use                           # Use .nvmrc version
npm ci                            # Exact install like CI
npm test
```

### Test Timeout

**Error:** `Timeout - Async callback was not invoked`

**Solution:** Increase timeout

```typescript
// In test file
vi.setConfig({ testTimeout: 10000 })  // 10 seconds

// Or in vitest config
export default defineConfig({
  test: {
    testTimeout: 10000,
  }
})
```

### Flaky Tests (Intermittent Failures)

**Symptoms:** Test passes sometimes, fails other times

**Common causes:**
- Async operations without proper waiting
- Timing-dependent tests
- External API calls
- Database state issues

**Solutions:**
```typescript
// ❌ Bad - relies on timing
setTimeout(() => {
  expect(result).toBe(true)
}, 100)

// ✅ Good - wait for actual condition
await waitFor(() => {
  expect(result).toBe(true)
})
```

### Coverage Reports Not Generated

**Error:** Coverage directory empty or missing

**Solution:**
```yaml
- name: Run tests with coverage
  run: npm run test:coverage

# Verify coverage files exist
- run: ls -la coverage/
```

## Deployment Failures

### Missing Secrets

**Error:** `Variable not found: DEPLOY_TOKEN` or similar

**Solution:**
1. Go to **Settings → Secrets**
2. Add missing secret
3. Re-run workflow

**Verify secret exists:**
```yaml
- name: Check secret
  run: |
    if [ -z "${{ secrets.DEPLOY_TOKEN }}" ]; then
      echo "Secret not found!"
      exit 1
    fi
```

### Deployment Not Triggering

**Symptom:** Workflow doesn't run after push/tag

**Check:**
1. Correct branch/tag matched workflow `on:` trigger
2. Workflow file syntax valid (no YAML errors)
3. Workflow not disabled in Actions tab

**Validate YAML:**
```bash
# Online validator
# https://www.yamllint.com/

# Or locally with yamllint
yamllint .github/workflows/deploy.yml
```

### Approval Not Triggering

**Symptom:** No approval prompt appears

**Check:**
1. Environment protection rules configured
2. Require reviewers is enabled
3. Current user has push access

**Solution:**
- Re-run workflow
- Manually approve in Actions tab

### Deployment Approved but Not Running

**Cause:** Workflow has already completed (can't restart old runs)

**Solution:**
- Create new push/tag to trigger new workflow
- Or use "Re-run failed jobs" button

## Permission Issues

### GitHub Token Insufficient Permissions

**Error:** `Resource not accessible by integration` or `Permission denied`

**Cause:** `GITHUB_TOKEN` lacks required scopes

**Solution:**
```yaml
permissions:
  contents: read
  pull-requests: write          # Add needed permission
  deployments: write
  security-events: read
```

### Secret Not Visible to Job

**Error:** Secret exists but workflow can't access it

**Check:**
1. Secret in correct scope (repo vs environment)
2. Job references correct secret name
3. Secret name spelled correctly (case-sensitive)

### Cannot Push to Repository

**Error:** Workflow fails when trying to push code

**Solution:**
```yaml
- name: Setup Git
  run: |
    git config user.name "github-actions[bot]"
    git config user.email "github-actions[bot]@users.noreply.github.com"

- name: Push changes
  run: git push
  # Default GITHUB_TOKEN may not have write access
  # May need: git push https://${{ secrets.GITHUB_TOKEN }}@github.com/...
```

## Performance Issues

### Workflow Running Slowly

**Check:**
1. Dependency cache hits (should be >80%)
2. Matrix size (too many parallel jobs?)
3. Runner type (macOS is slower)

**Solutions:**
- Enable dependency caching
- Reduce matrix size
- Use Ubuntu runners
- Check for `npm install` without cache

### Cache Not Being Used

**Symptom:** Every run installs fresh, no cache hits

**Debug:**
```yaml
- name: Check cache
  run: ls -la ~/.npm/
```

**Solution:**
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'              # Enable caching
```

### Out of Minutes

**Error:** `GitHub Actions usage quota exceeded`

**Solution:**
- Use free tier limits: 2000 minutes/month for private repos
- Reduce workflow frequency
- Reduce matrix size
- Use faster runners (Linux vs macOS)
- Consider self-hosted runners for high usage

## Getting Help

### Useful Resources

1. **GitHub Docs**
   - [GitHub Actions Documentation](https://docs.github.com/en/actions)
   - [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)

2. **GitHub Community**
   - [Discussions](https://github.com/orgs/community/discussions)
   - [Issues on actions repos](https://github.com/actions)

3. **Local Testing**
   - Use `act` to test workflows locally: https://github.com/nektos/act

### Minimal Reproducible Example

When asking for help, provide:
1. Workflow YAML (with secrets redacted)
2. Error message/logs
3. Local reproduction steps
4. Expected vs actual behavior

### Check Workflow Status

**Where to find information:**
- **Actions tab**: Overall status and logs
- **Commits page**: Status badge on commit
- **Pull requests**: Check runs section
- **Deployments**: Deployment history and status

---

For workflow details, see [WORKFLOWS_REFERENCE.md](./WORKFLOWS_REFERENCE.md).

For general guidance, see [GITHUB_ACTIONS_GUIDE.md](./GITHUB_ACTIONS_GUIDE.md).
