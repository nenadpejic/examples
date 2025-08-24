import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";

const FALLBACK = "/";

export const Route = createFileRoute("/login/")({
	component: RouteComponent,
	// validateSearch: ({ redirect }) => {
	// 	if (typeof redirect === "string") {
	// 		return { redirect };
	// 	}
	// 	return {};
	// },
	beforeLoad: ({ context, search }) => {
		console.log("search", search);
		if (context.auth?.isAuthenticated) {
			throw redirect({ to: search.redirect || FALLBACK });
		}
	},
});

function RouteComponent() {
	const auth = useAuth();
	const router = useRouter();
	const navigate = Route.useNavigate();
	const search = Route.useSearch();

	const handleLogin = async () => {
		await auth.login();
		await router.invalidate();
		await navigate({ to: search.redirect || FALLBACK });
	};

	return (
		<div>
			<h1>Hello "/login/"!</h1>

			<button type="button" onClick={handleLogin}>
				Login
			</button>
		</div>
	);
}
