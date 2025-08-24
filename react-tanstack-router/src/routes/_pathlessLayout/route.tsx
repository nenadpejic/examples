import {
	createFileRoute,
	Link,
	Outlet,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import { useAuth } from "@/contexts/auth";

export const Route = createFileRoute("/_pathlessLayout")({
	component: RouteComponent,
	beforeLoad: ({ context, location }) => {
		if (!context.auth?.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function RouteComponent() {
	const auth = useAuth();
	const router = useRouter();
	const navigate = Route.useNavigate();

	const handleLogout = async () => {
		await auth.logout();
		await router.invalidate();
		await navigate({
			to: "/login",
			search: { redirect: router.latestLocation.href },
		});
	};

	return (
		<div style={{ height: "100svh", display: "flex", flexDirection: "column" }}>
			<header
				style={{
					padding: "1rem",
					borderBottom: "1px solid lightgray",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<h2>React | Tanstack Router</h2>
				<button type="button" onClick={handleLogout}>
					Logout
				</button>
			</header>
			<div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
				<nav
					style={{
						padding: "1rem",
						minWidth: "150px",
						borderRight: "1px solid lightgray",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<Link to="/">Home</Link>
					<Link to="/todos">Todos</Link>
				</nav>
				<div style={{ padding: "1rem", flexGrow: 1 }}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
