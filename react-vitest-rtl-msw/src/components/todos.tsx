import { useEffect, useState } from "react";

type Todo = {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
};

type TodosQuery = {
	data: Todo[] | null;
	isLoading: boolean;
	error: Error | null;
};

export const Todos = () => {
	const [todosQuery, setTodosQuery] = useState<TodosQuery>({
		data: null,
		isLoading: false,
		error: null,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: run on mount
	useEffect(() => {
		const fetchTodos = async () => {
			setTodosQuery({ ...todosQuery, isLoading: true });
			try {
				const response = await fetch(
					"https://jsonplaceholder.typicode.com/todos",
				);
				const data = await response.json();
				setTodosQuery({ data, isLoading: false, error: null });
			} catch (err) {
				const error =
					err instanceof Error ? err : new Error("An error occurred");
				setTodosQuery({
					...todosQuery,
					isLoading: false,
					error,
				});
			}
		};

		fetchTodos();
	}, []);

	return (
		<>
			{todosQuery.isLoading && <p>Loading...</p>}
			{todosQuery.error && <p>Error: {todosQuery.error.message}</p>}
			{todosQuery.data && (
				<ul>
					{todosQuery.data.map((todo) => (
						<li key={todo.id}>{todo.title}</li>
					))}
				</ul>
			)}
		</>
	);
};
