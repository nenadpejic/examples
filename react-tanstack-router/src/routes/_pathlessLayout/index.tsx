import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_pathlessLayout/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<h1>Hello "/"!</h1>
		</div>
	);
}
