import { createFileRoute } from "@tanstack/react-router";
import { TodosTable } from "./todos-table";

export const Route = createFileRoute("/_pathlessLayout/todos/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>Hello "/todos/"!</h1>
			<TodosTable />
		</div>
	);
}
