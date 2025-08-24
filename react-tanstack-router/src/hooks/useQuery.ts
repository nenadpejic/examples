import { useEffect, useState } from "react";

type Query<T> = {
	data: null | T;
	isLoading: boolean;
	error: null | Error;
};

const defaultQuery: Query<unknown> = {
	data: null,
	isLoading: false,
	error: null,
};

export const useQuery = <T>(url: string) => {
	const [query, setQuery] = useState<Query<T>>(defaultQuery);

	useEffect(() => {
		if (!url) return;

		const fetchData = async () => {
			try {
				setQuery({ ...defaultQuery, isLoading: true });
				const res = await fetch(url);
				if (!res.ok) {
					const error = await res.json();
					throw Error(error, { cause: { status: res.status } });
				}
				const todos = await res.json();
				setQuery({ ...defaultQuery, data: todos });
			} catch (error) {
				if (error instanceof Error) {
					setQuery({ ...defaultQuery, error });
				}
			}
		};

		fetchData();
	}, [url]);

	return query;
};
