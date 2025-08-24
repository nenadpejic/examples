type Props = {
	error: Error;
};

export const ErrorAlert = ({ error }: Props) => {
	return (
		<div
			style={{
				padding: "1rem",
				border: "1px solid lightgray",
				borderRadius: "1rem",
				color: "red",
			}}
		>
			<p style={{ fontWeight: 500 }}>{error.name}</p>
			{!!error.cause && <pre>{JSON.stringify(error.cause, null, 2)}</pre>}
			<pre>{error.message}</pre>
		</div>
	);
};
