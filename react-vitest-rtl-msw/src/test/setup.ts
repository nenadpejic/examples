import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";

export const server = setupServer();

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	cleanup();
	server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
