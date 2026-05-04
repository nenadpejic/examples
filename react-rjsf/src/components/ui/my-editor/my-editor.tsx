import { Editor } from "@monaco-editor/react";
import { useCallback, useState } from "react";

const editorOptions = {
	minimap: {
		enabled: false,
	},
	automaticLayout: true,
};

type Props = {
	title: string;
	code: string;
	onChange: (data: any) => void;
};

export const MyEditor = ({ title, code, onChange }: Props) => {
	const [valid, setValid] = useState(true);

	const handleOnChange = useCallback(
		(code: string | undefined) => {
			if (!code) {
				return;
			}

			try {
				const parsedCode = JSON.parse(code);
				setValid(true);
				onChange(parsedCode);
			} catch {
				setValid(false);
			}
		},
		[onChange],
	);

	return (
		<div
			style={{
				border: "1px solid lightgray",
				borderRadius: 8,
				overflow: "hidden",
			}}
		>
			<p style={{ margin: 0, padding: 8, borderBottom: "1px solid lightgray" }}>
				{!valid && <span>Invalid </span>}
				{title}
			</p>

			<Editor
				language="json"
				theme="vs-light"
				height={400}
				value={code}
				onChange={handleOnChange}
				options={editorOptions}
			/>
		</div>
	);
};
