import { baseApi } from "./baseApi";

const PATH = "/todos";

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

export const getTodos = async () => {
	return baseApi<Todo[]>({ endpoint: PATH });
};

type AddTodoArg = {
	payload: {
		title: string;
		completed: boolean;
	};
};

export const addTodo = async ({ payload }: AddTodoArg) => {
	return baseApi<Todo>({
		endpoint: PATH,
		init: {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Content-Type": "application/json",
			},
		},
	});
};
