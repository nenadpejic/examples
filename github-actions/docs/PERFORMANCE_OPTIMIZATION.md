# Performance Optimization

Optimize CI/CD pipeline efficiency to reduce build times and costs.

## Table of Contents

- [Dependency Caching](#dependency-caching)
- [Matrix Optimization](#matrix-optimization)
- [Parallel Execution](#parallel-execution)
- [Artifact Management](#artifact-management)
- [Runner Selection](#runner-selection)
- [Workflow Optimization](#workflow-optimization)
- [Build Caching](#build-caching)

## Dependency Caching

Caching dependencies is the most impactful performance optimization.

### npm Cache

**Setup Node.js with caching:**

```yaml
- uses: actions/setup-node@v4
  with:
    node-version-file: '.nvmrc'
    cache: 'npm'              # Automatically cache npm dependencies
```

**Behind the scenes:**
1. Creates cache key from `package-lock.json` hash
2. On first run: installs dependencies, caches `node_modules/`
3. On subsequent runs: restores from cache (seconds instead of minutes)

**Cache size:**
- Typical React project: 200-500 MB
- Cache storage: 5 GB per repository (free tier limit)

### Manual Cache Control

For more control:

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

**Key pattern breakdown:**
- `${{ runner.os }}` - OS (Linux, Windows, macOS)
- `npm` - Identifier for cache type
- `${{ hashFiles(...) }}` - Hash of lock file (changes when deps change)

**Restore keys:**
- Fallback keys if exact key not found
- `${{ runner.os }}-npm-` - Matches any npm cache for this OS

### Cache Invalidation

Cache is automatically invalidated when `package-lock.json` changes. Rebuild on purpose:

```bash
rm package-lock.json
npm install                    # Regenerate lock file
git add package-lock.json
git commit -m "chore: refresh dependencies"
```

### Cache Hits Ratio

**Monitor cache effectiveness:**
- View in workflow summary
- Aim for >80% cache hits on main branch
- First PR run may miss cache

## Matrix Optimization

Matrix strategy can speed up or slow down pipelines depending on configuration.

### Reducing Matrix Size

**❌ Large matrix (6 jobs):**
```yaml
strategy:
  matrix:
    node-version: ['16.x', '18.x', '20.x']
    os: [ubuntu-latest, macos-latest]
```

**✅ Optimized matrix (3 jobs):**
```yaml
strategy:
  matrix:
    include:
      - node-version: '18.x'
        os: ubuntu-latest
      - node-version: '20.x'
        os: ubuntu-latest
      - node-version: '20.x'
        os: macos-latest
```

**Rationale:**
- Test all Node versions on Linux (fastest)
- Test latest Node on macOS (validates cross-OS)
- Reduces from 6 to 3 parallel jobs

### LTS Versions Only

```yaml
node-version: ['18.x', '20.x', '22.x']  # LTS only, not odd versions
```

### Exclude Expensive Combinations

```yaml
strategy:
  matrix:
    node-version: ['18.x', '20.x']
    os: [ubuntu-latest, windows-latest, macos-latest]
  exclude:
    - os: windows-latest      # Windows is slow, test on Linux only
      node-version: '18.x'    # Test Windows on latest only
```

## Parallel Execution

Jobs run in parallel by default. Optimize job dependencies.

### Independent Jobs

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps: [...]

  test:
    runs-on: ubuntu-latest
    steps: [...]

  build:
    runs-on: ubuntu-latest
    steps: [...]

  # All three run simultaneously
```

**Time:** max(lint, test, build) instead of sum

### Dependent Jobs

Use `needs` only when necessary:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build              # Wait for build to complete
    runs-on: ubuntu-latest
    steps:
      - run: npm test
```

### Fail Fast

Cancel remaining jobs if one fails:

```yaml
strategy:
  fail-fast: true             # Default is true
```

Saves time and CI minutes if failure is detected early.

## Artifact Management

### Small Artifacts

Keep artifacts small and targeted:

**❌ Large artifacts:**
```yaml
- uses: actions/upload-artifact@v3
  with:
    path: .                   # Everything (can be huge)
    retention-days: 30
```

**✅ Optimized artifacts:**
```yaml
- uses: actions/upload-artifact@v3
  with:
    path: dist/               # Only what's needed
    retention-days: 1         # Delete after 1 day
```

### Retention Policy

```yaml
retention-days: 1             # Delete after 1 day (fastest)
retention-days: 7             # Default, 7 days
retention-days: 90            # Long-term storage
```

**Considerations:**
- Shorter retention = less storage used
- Longer retention = more flexibility for debugging

### Download Artifacts

Only download if needed:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          path: dist/
          name: build-${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      # Only download if deploying
      - uses: actions/download-artifact@v3
        with:
          name: build-${{ github.sha }}
```

## Runner Selection

Choose appropriate runners for your jobs.

### Ubuntu Latest (Recommended)

```yaml
runs-on: ubuntu-latest        # Fastest, cheapest, most available
```

**Specs:**
- 2-4 vCPUs
- 7 GB RAM
- Docker pre-installed
- Fastest startup time

### macOS Latest

```yaml
runs-on: macos-latest         # Slower, more expensive
```

**When to use:**
- Testing on macOS
- Building iOS/macOS apps
- Cross-platform validation

**Cost:** 10x more expensive than Linux

### Windows Latest

```yaml
runs-on: windows-latest       # Slowest, most expensive
```

**When to use:**
- .NET applications
- Windows-specific testing
- PowerShell scripts

### Self-Hosted Runners (Advanced)

For custom hardware or specific requirements:

```yaml
runs-on: [self-hosted, custom-label]
```

**Tradeoffs:**
- Pro: Full control, faster for specific workloads
- Con: Maintenance burden, security risk

## Workflow Optimization

### Combine Related Steps

**❌ Many small jobs:**
```yaml
jobs:
  lint:
    steps: [setup, lint]

  test:
    steps: [setup, test]

  build:
    steps: [setup, build]
# 3 × setup overhead
```

**✅ Single job with multiple steps:**
```yaml
jobs:
  ci:
    steps:
      - setup
      - lint
      - test
      - build
# 1 × setup overhead
```

**Tradeoff:** Less granularity, but faster.

### Use Shell Defaults

Set defaults to reduce repetition:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        shell: bash
        working-directory: ./project
    steps:
      - run: npm install      # Uses ~/project working dir
```

### Conditional Steps

Skip unnecessary steps:

```yaml
- name: Maybe deploy
  if: github.ref == 'refs/heads/main'  # Only on main
  run: npm run deploy

- name: Report coverage
  if: always()                # Even if previous steps failed
  run: npm run coverage
```

## Build Caching

Cache build artifacts between runs.

### Vite Build Cache

```yaml
- name: Cache build
  uses: actions/cache@v3
  with:
    path: dist/
    key: vite-build-${{ hashFiles('src/**') }}
    restore-keys: vite-build-

- name: Build
  run: npm run build
```

**Benefit:** Skip full rebuild if source unchanged.

### Incremental Builds

Use TypeScript incremental compilation:

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

Cache the build info:

```yaml
- name: Cache TypeScript build
  uses: actions/cache@v3
  with:
    path: .tsbuildinfo
    key: ts-build-${{ hashFiles('src/**/*.ts') }}
```

## Performance Benchmarking

Track performance over time.

### Measure Job Duration

```yaml
- name: Measure build time
  run: |
    START=$(date +%s)
    npm run build
    END=$(date +%s)
    DURATION=$((END - START))
    echo "Build took ${DURATION}s"
```

### Detect Regressions

```yaml
- name: Check build time
  run: |
    BUILD_TIME=$(npm run build --silent)
    if [ "$BUILD_TIME" -gt 60 ]; then
      echo "⚠️ Build slower than 60s: ${BUILD_TIME}s"
    fi
```

## Performance Checklist

- ✅ npm cache enabled (`cache: 'npm'`)
- ✅ Matrix optimized (only necessary combinations)
- ✅ Independent jobs run in parallel
- ✅ Artifact retention minimized
- ✅ Ubuntu runner for most jobs
- ✅ Related steps combined
- ✅ Shell defaults configured
- ✅ Unnecessary steps skipped
- ✅ Build cache configured
- ✅ Performance tracked

## Typical Performance

**With optimization:**
- Lint: 1-2 minutes
- Test: 2-5 minutes
- Build (single): 1-3 minutes
- Build (matrix 3×): 3-5 minutes (parallel)
- Total PR check: 5-10 minutes

**Without optimization:**
- Same jobs: 20-30 minutes (no cache, serial execution)

## Resources

- [GitHub Actions: Caching Dependencies](https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows)
- [Runner Specs](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)
- [Artifact Management](https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts)

---

For workflow optimization techniques in practice, see [WORKFLOWS_REFERENCE.md](./WORKFLOWS_REFERENCE.md).
