# GitHub Actions: Comprehensive Guide

Welcome to the GitHub Actions CI/CD documentation! This guide explains core concepts and best practices for the workflows in this repository.

## Table of Contents

- [GitHub Actions Fundamentals](#github-actions-fundamentals)
- [Workflow Triggers](#workflow-triggers)
- [Jobs and Steps](#jobs-and-steps)
- [Matrix Builds](#matrix-builds)
- [Reusable Workflows](#reusable-workflows)
- [Best Practices](#best-practices)
- [Performance Optimization](#performance-optimization)

## GitHub Actions Fundamentals

### What are GitHub Actions?

GitHub Actions is an automation platform that lets you run workflows triggered by events in your repository. Workflows are defined in YAML files and live in `.github/workflows/`.

### Workflow File Structure

```yaml
name: Workflow Name                    # Display name in Actions tab

on:                                    # Triggers that start the workflow
  push:
  pull_request:

jobs:                                  # One or more jobs in the workflow
  job-name:
    runs-on: ubuntu-latest             # Runner (where the job runs)
    steps:                             # Sequential steps in the job
      - name: Step name
        run: command
```

### Runners

A runner is a server that runs your workflow jobs. GitHub provides hosted runners:

- **ubuntu-latest** - Ubuntu Linux (recommended, fastest)
- **windows-latest** - Windows Server
- **macos-latest** - macOS

CPU cores: 2-4 depending on the runner

## Workflow Triggers

### `on: push`

Triggered when code is pushed to the repository.

```yaml
on:
  push:
    branches:
      - main
      - develop
    paths:
      - 'src/**'          # Only run if files in src/ changed
```

### `on: pull_request`

Triggered when a pull request is opened, synchronized, or reopened.

```yaml
on:
  pull_request:
    branches:
      - main
```

### `on: workflow_dispatch`

Manual trigger from GitHub UI or CLI.

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        type: choice
        options:
          - dev
          - staging
          - prod
```

### `on: schedule`

Run at specific times using cron syntax.

```yaml
on:
  schedule:
    - cron: '0 2 * * *'    # Every day at 2:00 AM UTC
```

### `on: release`

Triggered when a release is created.

```yaml
on:
  release:
    types:
      - published
      - created
```

## Jobs and Steps

### Job Dependencies

Control job execution order using `needs`:

```yaml
jobs:
  setup:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Setting up..."

  test:
    runs-on: ubuntu-latest
    needs: setup              # This job waits for 'setup' to complete
    steps:
      - run: echo "Testing..."

  deploy:
    runs-on: ubuntu-latest
    needs: [setup, test]      # Wait for multiple jobs
    steps:
      - run: echo "Deploying..."
```

### Step Conditions

Use `if` to conditionally run steps:

```yaml
steps:
  - name: Build
    run: npm run build

  - name: Upload artifacts
    if: success()             # Only if previous steps succeeded
    uses: actions/upload-artifact@v3

  - name: Notify on failure
    if: failure()             # Only if any previous step failed
    run: echo "Build failed"
```

## Matrix Builds

Matrix strategy tests multiple configurations in parallel:

```yaml
strategy:
  matrix:
    node-version: ['18.x', '20.x', '22.x']
    os: [ubuntu-latest, macos-latest]

steps:
  - name: Setup Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
```

### Matrix with Include/Exclude

Fine-tune matrix combinations:

```yaml
strategy:
  matrix:
    include:
      - os: ubuntu-latest
        node-version: '20.x'
        coverage: true
      - os: macos-latest
        node-version: '20.x'
        coverage: false
    exclude:
      - os: windows-latest
        node-version: '18.x'
```

### Failing Fast

```yaml
strategy:
  fail-fast: true   # Cancel other matrix jobs if one fails
```

## Reusable Workflows

Reusable workflows reduce duplication across multiple workflows.

### Creating a Reusable Workflow

File: `.github/reusable/deploy.yml`

```yaml
name: Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: echo "Deploying to ${{ inputs.environment }}"
```

### Calling a Reusable Workflow

```yaml
jobs:
  deploy-prod:
    uses: ./.github/reusable/deploy.yml
    with:
      environment: prod
    secrets:
      deploy-token: ${{ secrets.DEPLOY_TOKEN }}
```

## Caching

Cache dependencies to speed up builds:

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

Key patterns:
- **Path**: Directory to cache (e.g., `node_modules/`, `~/.cache/`)
- **Key**: Unique identifier; typically includes hash of lock file
- **Restore-keys**: Fallback keys if exact key not found

## Artifacts

Share files between jobs or for inspection:

```yaml
# Upload artifact
- name: Upload build artifacts
  uses: actions/upload-artifact@v3
  with:
    name: dist-${{ github.sha }}
    path: dist/
    retention-days: 30

# Download in another job
- name: Download artifacts
  uses: actions/download-artifact@v3
  with:
    name: dist-${{ github.sha }}
    path: ./dist
```

## Best Practices

### 1. **Use Pinned Action Versions**

```yaml
# ✅ Good - Pinned to specific commit
- uses: actions/checkout@a81bbbf8298c0fa03ea29cdc473d45769f953675

# ⚠️  Less safe - Pinned to tag (can be retagged)
- uses: actions/setup-node@v4

# ❌ Never - Latest version (unpredictable)
- uses: actions/checkout@latest
```

### 2. **Set Timeouts**

Prevent workflows from running indefinitely:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30      # Job timeout
    steps:
      - name: Long running task
        timeout-minutes: 10   # Step timeout
        run: ./slow-script.sh
```

### 3. **Use Concurrency Groups**

Cancel older runs when new code is pushed:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 4. **Limit Permissions**

Use least privilege for `GITHUB_TOKEN`:

```yaml
permissions:
  contents: read            # Only what's needed
  pull-requests: write
```

### 5. **Mask Secrets in Logs**

Prevent accidental secret exposure:

```yaml
- name: Use secret
  env:
    SECRET: ${{ secrets.API_KEY }}
  run: |
    # Output will mask the secret value
    echo "Using secret: $SECRET"
```

## Performance Optimization

### 1. **Dependency Caching**

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'npm'
```

### 2. **Parallel Jobs**

Jobs run in parallel by default. Use matrix for efficient testing:

```yaml
strategy:
  matrix:
    node-version: ['18.x', '20.x', '22.x']
```

### 3. **Early Exit**

Fail fast to save CI time:

```yaml
strategy:
  fail-fast: true
```

### 4. **Smaller Runners**

Use smaller machines for simple jobs:

```yaml
runs-on: ubuntu-latest    # 2-4 cores, sufficient for most tasks
```

### 5. **Skip Unnecessary Workflows**

```yaml
on:
  push:
    paths:
      - 'src/**'          # Only run if src/ changed
    paths-ignore:
      - 'docs/**'         # Skip if only docs changed
      - '**.md'
```

## Common Patterns

### Context Variables

```yaml
- name: Log context info
  run: |
    echo "Repository: ${{ github.repository }}"
    echo "Branch: ${{ github.ref }}"
    echo "Commit: ${{ github.sha }}"
    echo "Actor: ${{ github.actor }}"
    echo "Event: ${{ github.event_name }}"
```

### Continue on Error

```yaml
- name: Maybe fail
  run: npm run risky-task
  continue-on-error: true   # Workflow continues even if this fails
```

### Conditional Workflow Execution

```yaml
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
```

---

For workflow-specific details, see [WORKFLOWS_REFERENCE.md](./WORKFLOWS_REFERENCE.md).

For security best practices, see [SECURITY_PRACTICES.md](./SECURITY_PRACTICES.md).
