import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App Component", () => {
	it("renders the header with title", () => {
		render(<App />);
		const heading = screen.getByRole("heading", { level: 1 });
		expect(heading).toHaveTextContent("CI/CD GitHub Actions Examples");
	});

	it("renders the features section", () => {
		render(<App />);
		const heading = screen.getByText("Features Demonstrated");
		expect(heading).toBeInTheDocument();
	});

	it("renders the counter section", () => {
		render(<App />);
		const heading = screen.getByText("Interactive Counter Demo");
		expect(heading).toBeInTheDocument();
	});

	it("displays initial count as 0", () => {
		render(<App />);
		const countText = screen.getByText(/Current count: 0/i);
		expect(countText).toBeInTheDocument();
	});

	it("increments counter when button is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);

		const incrementButton = screen.getByTestId("increment-button");
		await user.click(incrementButton);

		expect(screen.getByText(/Current count: 1/i)).toBeInTheDocument();
	});

	it("resets counter when reset button is clicked", async () => {
		const user = userEvent.setup();
		render(<App />);

		const incrementButton = screen.getByTestId("increment-button");
		const resetButton = screen.getByTestId("reset-button");

		// Increment twice
		await user.click(incrementButton);
		await user.click(incrementButton);
		expect(screen.getByText(/Current count: 2/i)).toBeInTheDocument();

		// Reset
		await user.click(resetButton);
		expect(screen.getByText(/Current count: 0/i)).toBeInTheDocument();
	});

	it("renders workflow cards", () => {
		render(<App />);
		expect(screen.getByText("Basic CI")).toBeInTheDocument();
		expect(screen.getByText("Multi-Environment Deploy")).toBeInTheDocument();
		expect(screen.getByText("Security Scanning")).toBeInTheDocument();
	});

	it("renders docs link section", () => {
		render(<App />);
		const docsText = screen.getByText(/Check out the/i);
		expect(docsText).toBeInTheDocument();
	});
});
