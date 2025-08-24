import { createFileRoute } from "@tanstack/react-router";
import { ErrorAlert } from "@/components/ErrorAlert";
import type { Todo } from "@/data/todos";
import { useQuery } from "@/hooks/useQuery";

export const Route = createFileRoute("/_pathlessLayout/todos/$todoId/")({
	// loader: async ({ params }) => {
	// 	return fetchPost(params.todoId);
	// },
	component: TodoDetailsPage,
});

function TodoDetailsPage() {
	const { todoId } = Route.useParams();
	const todoQuery = useQuery<Todo>(
		`https://jsonplaceholder.typicode.com/todos/${todoId}`,
	);

	return (
		<div>
			<h1>Hello "/todos/$todoId/"!</h1>
			{todoQuery.isLoading && <p>Loading...</p>}
			{todoQuery.error && <ErrorAlert error={todoQuery.error} />}
			{todoQuery.data && <pre>{JSON.stringify(todoQuery.data, null, 2)}</pre>}
		</div>
	);
}
