import { useState } from "react";
import "./App.css";

function App(): JSX.Element {
	const [count, setCount] = useState(0);

	return (
		<div className="app">
			<header className="app-header">
				<h1>CI/CD GitHub Actions Examples</h1>
				<p>Comprehensive showcase of GitHub Actions workflows</p>
			</header>

			<main className="app-main">
				<section className="features">
					<h2>Features Demonstrated</h2>
					<ul className="feature-list">
						<li>✅ Automated Testing (Vitest)</li>
						<li>✅ Linting & Code Quality</li>
						<li>✅ Multi-Environment Deployments</li>
						<li>✅ Security Scanning</li>
						<li>✅ Performance Benchmarking</li>
						<li>✅ Release Automation</li>
						<li>✅ Scheduled Jobs</li>
						<li>✅ Documentation Generation</li>
					</ul>
				</section>

				<section className="counter">
					<h2>Interactive Counter Demo</h2>
					<p>Current count: {count}</p>
					<button
						className="button"
						onClick={() => setCount((c) => c + 1)}
						data-testid="increment-button"
					>
						Increment
					</button>
					<button
						className="button secondary"
						onClick={() => setCount(0)}
						data-testid="reset-button"
					>
						Reset
					</button>
				</section>

				<section className="workflows">
					<h2>Workflows Included</h2>
					<div className="workflow-grid">
						<div className="workflow-card">
							<h3>Basic CI</h3>
							<p>Lint, test, and build on PR</p>
						</div>
						<div className="workflow-card">
							<h3>Multi-Environment Deploy</h3>
							<p>Dev (auto), staging (manual), prod (release)</p>
						</div>
						<div className="workflow-card">
							<h3>Security Scanning</h3>
							<p>Dependabot & CodeQL integration</p>
						</div>
						<div className="workflow-card">
							<h3>Performance Tracking</h3>
							<p>Build metrics and benchmarking</p>
						</div>
						<div className="workflow-card">
							<h3>Release Automation</h3>
							<p>Automated versioning and changelog</p>
						</div>
						<div className="workflow-card">
							<h3>Scheduled Jobs</h3>
							<p>Nightly tests and dependency audit</p>
						</div>
					</div>
				</section>

				<section className="docs-link">
					<p>
						📖 Check out the <code>docs/</code> folder for comprehensive CI/CD
						guides and workflow documentation.
					</p>
				</section>
			</main>

			<footer className="app-footer">
				<p>Learn GitHub Actions best practices with real-world examples</p>
			</footer>
		</div>
	);
}

export default App;
