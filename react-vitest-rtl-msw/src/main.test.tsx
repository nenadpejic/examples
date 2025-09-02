import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock react-dom/client
vi.mock("react-dom/client", () => ({
	createRoot: vi.fn(() => ({
		render: vi.fn(),
	})),
}));

// Mock App component
vi.mock("./App", () => ({
	default: vi.fn(() => null),
}));

// Mock modules with side effects
vi.mock("./index.css", () => ({}));

describe("main", () => {
	beforeEach(() => {
		// Clear document body before each test
		document.body.innerHTML = "";
		// Reset modules before each test
		vi.resetModules();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("throws error when root element is not found", async () => {
		await expect(async () => {
			await import("./main.tsx");
		}).rejects.toThrow("Root element not found");
	});

	it("renders App in StrictMode when root element exists", async () => {
		// Create root element
		const root = document.createElement("div");
		root.id = "root";
		document.body.appendChild(root);

		// Import and execute main
		await import("./main.tsx");

		// Verify createRoot was called with root element
		expect(createRoot).toHaveBeenCalledWith(root);

		// Get the render function that was returned from createRoot
		const renderFn = vi.mocked(createRoot).mock.results[0].value.render;

		// Verify render was called and check the structure
		expect(renderFn).toHaveBeenCalledWith(
			expect.objectContaining({
				type: StrictMode,
				props: expect.objectContaining({
					children: expect.any(Object),
				}),
			}),
		);
	});
});
