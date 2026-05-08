# Workflows Reference

Detailed breakdown of all workflows included in this project.

## Table of Contents

- [Basic CI Workflows](#basic-ci-workflows)
  - [ci-lint.yml](#ci-lintyml)
  - [ci-test.yml](#ci-testyml)
  - [ci-build.yml](#ci-buildyml)
  - [pr-validation.yml](#pr-validationyml)
- [Deployment Workflows](#deployment-workflows)
  - [deploy-dev.yml](#deploy-devyml)
  - [deploy-staging-manual.yml](#deploy-staging-manualyml)
  - [deploy-prod-release.yml](#deploy-prod-releaseyml)
- [Advanced Workflows](#advanced-workflows)
  - [security-scan.yml](#security-scanyml)
  - [performance-benchmark.yml](#performance-benchmarkyml)
  - [release-automation.yml](#release-automationyml)
  - [scheduled-checks.yml](#scheduled-checksyml)
  - [docs-deploy.yml](#docs-deployyml)

---

## Basic CI Workflows

### ci-lint.yml

**Triggers:** `push` (main, develop), `pull_request`

**Purpose:** Validates code style and formatting across the project.

**Key Steps:**
1. Checkout code
2. Setup Node.js with dependency caching
3. Install dependencies
4. Run ESLint (code quality checks)
5. Check code formatting with Prettier
6. Report overall lint status

**Key Features:**
- Uses `concurrency` to cancel older runs when new code is pushed
- Provides clear feedback on lint failures
- Runs on every PR to maintain code standards

**When to Use:** Always required for PRs to ensure consistent code style.

---

### ci-test.yml

**Triggers:** `push` (main, develop), `pull_request`

**Purpose:** Runs the test suite with Vitest and generates coverage reports.

**Key Steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run tests with coverage (`vitest --coverage`)
5. Upload coverage to Codecov
6. Comment on PR with test results (on PRs only)

**Key Features:**
- Coverage reporting for code quality metrics
- PR comments for immediate feedback
- `github-script` action to automate PR comments
- Status check for test results

**When to Use:** Essential for every code change to prevent regressions.

---

### ci-build.yml

**Triggers:** `push` (main, develop), `pull_request`

**Purpose:** Builds the application using Vite across multiple Node.js versions and operating systems.

**Key Steps:**
1. Setup Node.js (matrix: 18.x, 20.x, 22.x)
2. Setup OS (ubuntu-latest, macos-latest)
3. Type-check with TypeScript
4. Build with Vite
5. Verify build artifacts exist
6. Upload build artifacts (ubuntu + 20.x only)

**Key Features:**
- **Matrix strategy** tests on 3 Node versions × 2 OS (with exclusions)
- `fail-fast: false` ensures all combinations are tested
- Artifacts retention for 1 day (inspection/deployment)
- Build artifact upload for faster deployment workflows

**When to Use:** Ensures builds work consistently across environments.

---

### pr-validation.yml

**Triggers:** `pull_request`

**Purpose:** Orchestrates all required CI checks for PR approval.

**Key Steps:**
1. Call `ci-lint.yml` workflow
2. Call `ci-test.yml` workflow
3. Call `ci-build.yml` workflow
4. Validate all checks passed
5. Report overall status

**Key Features:**
- Uses `needs` to establish dependencies
- Demonstrates workflow composition
- Single status check for merge requirements
- Fails if any upstream workflow fails

**When to Use:** Set as required status check before merging PRs.

---

## Deployment Workflows

### deploy-dev.yml

**Triggers:** `push` to `develop` branch

**Purpose:** Auto-deploy to development environment on every push.

**Key Steps:**
1. Checkout code
2. Call reusable `deploy.yml` workflow with environment=dev
3. Notify deployment success/failure

**Key Features:**
- Automatic deployment (minimal friction)
- Safe for development as it auto-heals on next push
- No approval needed
- Fast feedback for developers

**When to Use:** Enable rapid testing and integration.

---

### deploy-staging-manual.yml

**Triggers:** `workflow_dispatch` (manual trigger)

**Purpose:** Manually deploy a specific branch/tag to staging for testing.

**Key Steps:**
1. Accept input: ref (branch/tag) and approval message
2. Checkout specific ref
3. Build application
4. Deploy to staging
5. Comment on commit with deployment info
6. Optional: Send Slack notification

**Key Features:**
- `workflow_dispatch` with custom inputs
- Environment protection (requires approval)
- Deployment tracking in GitHub
- Audit trail (who deployed what when)

**When to Use:** Before release testing or QA validation.

---

### deploy-prod-release.yml

**Triggers:** `release` (published or created)

**Purpose:** Deploy to production when a GitHub Release is created.

**Key Steps:**
1. Checkout code at release tag
2. Verify main branch deployment
3. Run full test suite
4. Type-check
5. Build for production
6. Deploy
7. Create deployment status
8. Comment on release with deployment info

**Key Features:**
- Tag-based deployment (safest)
- Runs full test suite before deploy
- Production environment protection (requires reviewer approval)
- Deployment status tracking
- Release comments for audit trail

**When to Use:** Production releases only.

---

## Advanced Workflows

### security-scan.yml

**Triggers:** `push` (main, develop), `pull_request`, `schedule` (weekly)

**Purpose:** Comprehensive security scanning including dependencies, SAST, and supply chain checks.

**Jobs:**
1. **dependency-scan**: `npm audit` for vulnerability detection
2. **codeql-scan**: Static analysis using CodeQL
3. **supply-chain-check**: Package integrity verification
4. **security-report**: Aggregated summary

**Key Features:**
- Multiple security layers
- CodeQL SAST (finds security bugs, quality issues)
- Dependency vulnerability scanning
- PR comments with security summary
- Scheduled weekly runs for continuous monitoring

**When to Use:** Automated on every PR and push; essential for production code.

---

### performance-benchmark.yml

**Triggers:** `push` (main, develop), `pull_request`

**Purpose:** Track build and test performance metrics to detect regressions.

**Key Steps:**
1. Measure build time and dist size
2. Measure test execution time
3. Create benchmark JSON data
4. Upload artifacts for trend analysis
5. Comment on PR with metrics
6. Check for performance regressions (thresholds)

**Key Features:**
- Performance metrics collection
- Artifact storage (90 days) for trend analysis
- Regression detection (warns if thresholds exceeded)
- PR comments for visibility
- Helps maintain performance standards

**When to Use:** Continuous performance monitoring.

---

### release-automation.yml

**Triggers:** `workflow_dispatch` (manual)

**Purpose:** Automate version bumping, changelog generation, and GitHub Release creation.

**Inputs:**
- Release type: major, minor, patch
- Prerelease flag (for alpha/beta releases)

**Key Steps:**
1. Parse current version from package.json
2. Calculate new version
3. Update package.json
4. Generate changelog from commit history
5. Commit version update
6. Create git tag
7. Push changes and tags
8. Create GitHub Release
9. Generate summary

**Key Features:**
- Semantic versioning automation
- Changelog generation from commits
- Git tags and releases
- Prerelease support
- Audit trail in git history and releases

**When to Use:** Before every production release.

---

### scheduled-checks.yml

**Triggers:** `schedule` (nightly), `workflow_dispatch`

**Purpose:** Comprehensive checks run on a schedule to catch issues not caught in regular CI.

**Jobs:**
1. **nightly-tests**: Full test suite with coverage
2. **dependency-audit**: Vulnerability audit
3. **type-check**: TypeScript type checking
4. **matrix-build**: Build on multiple Node versions
5. **scheduled-summary**: Aggregated report

**Key Features:**
- Runs nightly (catches issues overnight)
- Multiple test environments (matrix)
- Comprehensive checks without time pressure
- Summary report
- Optional failure notifications

**When to Use:** Automated nightly; optional manual trigger for verification.

---

### docs-deploy.yml

**Triggers:** `push` to `main` (if docs/ changed), `workflow_dispatch`

**Purpose:** Generate and deploy documentation to GitHub Pages.

**Key Steps:**
1. Checkout code
2. Install dependencies
3. Generate JSDoc documentation
4. Create documentation site
5. Setup GitHub Pages
6. Upload pages artifact
7. Deploy to GitHub Pages

**Key Features:**
- Auto-documentation generation
- GitHub Pages deployment
- HTML site generation from markdown
- Triggered only on doc changes
- Public documentation hosting

**When to Use:** Automatically on documentation updates.

---

## Workflow Selection Guide

| Scenario | Workflow(s) |
|----------|-----------|
| Making code changes | ci-lint, ci-test, ci-build |
| Opening a PR | pr-validation (required) |
| Pushing to develop | deploy-dev (auto) |
| Testing on staging | deploy-staging-manual (manual) |
| Creating a release | release-automation, then deploy-prod-release (auto on tag) |
| Nightly checks | scheduled-checks (auto) |
| Security audits | security-scan (auto on every push/PR + weekly) |
| Performance tracking | performance-benchmark (auto on every push/PR) |
| Documentation updates | docs-deploy (auto) |

---

For security practices, see [SECURITY_PRACTICES.md](./SECURITY_PRACTICES.md).

For deployment strategy, see [DEPLOYMENT_STRATEGY.md](./DEPLOYMENT_STRATEGY.md).
