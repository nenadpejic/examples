"use client";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useColorScheme } from "@mui/material/styles";
import { useId } from "react";

export default function ModeSwitch() {
	const { mode, setMode } = useColorScheme();
	const labelId = useId();
	const selectId = useId();

	if (!mode) {
		return null;
	}

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "flex-end",
				mt: 1,
				p: 1,
			}}
		>
			<FormControl>
				<InputLabel id={labelId}>Theme</InputLabel>
				<Select
					labelId={labelId}
					id={selectId}
					value={mode}
					onChange={(event) => setMode(event.target.value as typeof mode)}
					label="Theme"
				>
					<MenuItem value="system">System</MenuItem>
					<MenuItem value="light">Light</MenuItem>
					<MenuItem value="dark">Dark</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
