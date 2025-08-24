import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout/todos/$todoId/edit/")({
	component: EditTodoPage,
});

function EditTodoPage() {
	const params = Route.useParams();
	return <div>Hello "/todos/$todoId/edit/"!</div>;
}
