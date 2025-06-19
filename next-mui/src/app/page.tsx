import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import Copyright from "@/components/Copyright";
import ProTip from "@/components/ProTip";

export default function Home() {
	return (
		<Container maxWidth="lg">
			<Box
				sx={{
					my: 4,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="h4" component="h1" sx={{ mb: 2 }}>
					Material UI - Next.js App Router example in TypeScript
				</Typography>
				<Link href="/about" color="secondary" component={NextLink}>
					Go to the about page
				</Link>
				<ProTip />
				<Copyright />
			</Box>
		</Container>
	);
}
