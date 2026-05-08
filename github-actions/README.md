# CI/CD GitHub Actions Examples

Comprehensive showcase of GitHub Actions workflows and CI/CD best practices.

## 🎯 Overview

This project demonstrates all major GitHub Actions features and CI/CD patterns through real-world examples:

- ✅ **Automated Testing** - Vitest with coverage reporting
- ✅ **Code Quality** - Linting & formatting checks
- ✅ **Build Automation** - Multi-version matrix builds
- ✅ **Multi-Environment Deployment** - dev (auto) → staging (manual) → prod (release)
- ✅ **Security Scanning** - Dependency vulnerabilities & SAST with CodeQL
- ✅ **Performance Tracking** - Build metrics and performance benchmarking
- ✅ **Release Automation** - Version management and changelog generation
- ✅ **Scheduled Jobs** - Nightly tests and dependency audits
- ✅ **Documentation Generation** - Auto-deploy docs to GitHub Pages
- ✅ **Reusable Workflows** - DRY principle for workflow composition

## 📚 Documentation

**Start here:** [GitHub Actions Guide](./docs/GITHUB_ACTIONS_GUIDE.md)

### Core Guides

1. **[GitHub Actions Guide](./docs/GITHUB_ACTIONS_GUIDE.md)**
   - Fundamentals, triggers, jobs, matrix builds, reusable workflows
   - Best practices and performance optimization

2. **[Workflows Reference](./docs/WORKFLOWS_REFERENCE.md)**
   - Detailed breakdown of all 8 workflows
   - Triggers, steps, features, and use cases

3. **[Deployment Strategy](./docs/DEPLOYMENT_STRATEGY.md)**
   - Multi-environment setup (dev/staging/prod)
   - Protection rules and approval workflows
   - Environment variables and secrets management

4. **[Security Practices](./docs/SECURITY_PRACTICES.md)**
   - Secrets management and GITHUB_TOKEN permissions
   - Action security and script injection prevention
   - OIDC for cloud authentication

5. **[Performance Optimization](./docs/PERFORMANCE_OPTIMIZATION.md)**
   - Dependency caching strategies
   - Matrix optimization and parallel execution
   - Artifact management and runner selection

6. **[Troubleshooting Guide](./docs/TROUBLESHOOTING.md)**
   - Common issues and solutions
   - Debug techniques and performance analysis

## 🛠 Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime (LTS versions 18, 20, 22)
- [NPM](https://www.npmjs.com/) - Package manager
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Fast build tool
- [Vitest](https://vitest.dev/) - Unit testing framework
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [GitHub Actions](https://github.com/features/actions) - CI/CD platform

## 📦 Installation

### Prerequisites

- Node.js 18+ (specified in `.nvmrc`)
- npm 10+ or equivalent
- Git

### Setup

Clone the repository:

```sh
git clone https://github.com/nenadpejic/examples.git
cd github-actions
```

Use the Node version specified in `.nvmrc` (recommended with `nvm`):

```sh
nvm use                    # Automatically uses version from .nvmrc
```

Install dependencies:

```sh
npm install
```

## 🚀 Quick Start

### Development

Start the local development server:

```sh
npm run dev
```

Opens http://localhost:3000 with hot module reloading.

### Testing

Run the test suite:

```sh
npm test                   # Run all tests
npm run test:ui            # Interactive test UI
npm run test:coverage      # Generate coverage report
```

### Linting

Che🔄 GitHub Actions Workflows

### Automated Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **ci-lint.yml** | Push, PR | ESLint + Prettier checks |
| **ci-test.yml** | Push, PR | Vitest with coverage |
| **ci-build.yml** | Push, PR | Build on Node 18/20/22 × Ubuntu/macOS |
| **pr-validation.yml** | PR | Orchestrates all CI checks |
| **deploy-dev.yml** | Push to develop | Auto-deploy to dev |
| **deploy-staging-manual.yml** | Manual dispatch | Deploy to staging (with approval) |
| **deploy-prod-release.yml** | Release created | Deploy to production (requires approval) |
| **security-scan.yml** | Push, PR, weekly | Dependabot + CodeQL scanning |
| **performance-benchmark.yml** | Push, PR | Build/test performance metrics |
| **release-automation.yml** | Manual dispatch | Auto-version & changelog |
| **scheduled-checks.yml** | Nightly, manual | Comprehensive test suite |
| **docs-deploy.yml** | Push to main | Deploy docs to GitHub Pages |

### Required for Pull Requests

When opening a PR, these checks must pass:
- ✅ Linting (ESLint + Prettier)
- ✅ Tests (Vitest)
- ✅ Build (Vite)
- ✅ Security scan (CodeQL + Dependabot)

## 🎯 Contributing

1. **Create a feature branch:**
   ```sh
   git checkout -b feat/your-feature-name
   ```

2. **Make changes and run locally:**
   ```sh
   npm run lint:fix      # Fix linting issues
   npm run format        # Format code
   npm test              # Run tests
   npm run build         # Verify build
   ```

3. **Commit following [Conventional Commits](https://www.conventionalcommits.org/):**
   ```sh
   git add .
   git commit -m "feat: add amazing feature"
   git commit -m "fix: resolve bug"
   git commit -m "docs: update readme"
   ```

4. **Push and create a PR:**
   ```sh
   git push origin feat/your-feature-name
   ```
   - All automated checks must pass
   - PR will be reviewed
   - Merge via squash commits

## 🚢 Deployment

### To Development
```sh
# Automatic when pushing to develop branch
git push origin develop
```

### To Staging
```sh
# Manual via GitHub Actions UI
# Actions → Deploy - Staging (Manual) → Run workflow
```

### To Production
```sh
# Create a release (triggers production deployment)
# Releases → Create a new release
# Tag: v1.0.0 (semantic versioning)
# Requires reviewer approval
```

See [DEPLOYMENT_STRATEGY.md](./docs/DEPLOYMENT_STRATEGY.md) for detailed deployment instructions.

## 📖 Project Structure

```
.github/
├── workflows/              # GitHub Actions workflow files
│   ├── ci-*.yml           # Continuous integration workflows
│   ├── deploy-*.yml       # Deployment workflows
│   └── reusable/          # Reusable workflow templates
├── CODEOWNERS             # Code review requirements
└── dependabot.yml         # Automated dependency updates

docs/                       # Comprehensive CI/CD documentation
├── GITHUB_ACTIONS_GUIDE.md
├── WORKFLOWS_REFERENCE.md
├── DEPLOYMENT_STRATEGY.md
├── SECURITY_PRACTICES.md
├── PERFORMANCE_OPTIMIZATION.md
└── TROUBLESHOOTING.md

src/                        # React + TypeScript application
├── App.tsx
├── App.css
└── main.tsx

tests/                      # Vitest test files
├── App.test.tsx
└── setup.ts

vite.config.ts             # Vite configuration
vitest.config.ts           # Vitest configuration
tsconfig.json              # TypeScript configuration
.eslintrc.js               # ESLint configuration
.prettierrc.json           # Prettier configuration
```

## 🔐 Security

- Dependency scanning via Dependabot
- SAST with CodeQL
- Environment protection rules for production
- Secrets management via GitHub Secrets
- OIDC-ready for cloud authentication

See [SECURITY_PRACTICES.md](./docs/SECURITY_PRACTICES.md) for details.

## ⚡ Performance

- npm dependency caching
- Matrix build optimization
- Parallel job execution
- Build performance tracking

See [PERFORMANCE_OPTIMIZATION.md](./docs/PERFORMANCE_OPTIMIZATION.md) for optimization techniques.

## 📋 Checklist for Using This as a Template

- [ ] Update repository name and description
- [ ] Configure GitHub Environments (Settings → Environments):
  - [ ] Create `dev`, `staging`, `prod` environments
  - [ ] Add protection rules for production
- [ ] Add secrets (Settings → Secrets):
  - [ ] Add environment-specific deploy tokens if needed
- [ ] Enable CodeQL (if private repo):
  - [ ] Settings → Code security → Enable CodeQL
- [ ] Enable Dependabot (if private repo):
  - [ ] Settings → Code security → Enable Dependabot
- [ ] Enable GitHub Pages for docs (if desired):
  - [ ] Settings → Pages → Source: deploy from branch
- [ ] Update README with your project details
- [ ] Add initial commit and push to trigger workflows

## 🆘 Troubleshooting

Check [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) for:
- Common workflow issues and solutions
- Debugging techniques
- Performance analysis
- FAQ

## 📚 Learning Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides)
- [Act - Test workflows locally](https://github.com/nektos/act)

## 📄 License

This is an example project for learning purposes.
