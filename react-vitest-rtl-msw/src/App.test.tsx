import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

// Mock the Todos component since we'll test it separately
vi.mock("./components/todos", () => ({
	Todos: () => {
		return <div data-testid="mocked-todos">Mocked Todos</div>;
	},
}));

describe("App", () => {
	it("renders without crashing", () => {
		render(<App />);
		expect(screen.getByTestId("mocked-todos")).toBeInTheDocument();
	});
});
