import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it } from "vitest";
import { server } from "../test/setup";
import { Todos } from "./todos";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const mockTodos = [
	{ id: 1, userId: 1, title: "First todo", completed: false },
	{ id: 2, userId: 1, title: "Second todo", completed: true },
];

beforeEach(() => {
	server.use(
		http.get(API_URL, () => {
			return HttpResponse.json(mockTodos);
		}),
	);
});

describe("Todos", () => {
	it("displays loading state initially", () => {
		render(<Todos />);
		expect(screen.getByText(/loading/i)).toBeInTheDocument();
	});

	it("displays todos after loading", async () => {
		render(<Todos />);

		// Check that todos are rendered
		expect(await screen.findByText("First todo")).toBeInTheDocument();
		expect(screen.getByText("Second todo")).toBeInTheDocument();

		// Check that loading message is gone
		expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
	});

	it("displays error message when API call fails", async () => {
		// Override the default handler for this test only
		server.use(
			http.get(API_URL, () => {
				return new HttpResponse(null, { status: 500 });
			}),
		);

		render(<Todos />);

		// Check that error message is displayed
		expect(await screen.findByText(/error/i)).toBeInTheDocument();
	});
});
