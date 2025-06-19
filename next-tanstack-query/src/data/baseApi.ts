const BASE_URL = "https://jsonplaceholder.typicode.com";

type Query = Record<string, string | number | boolean>;

const getQueryParams = (query?: Query) => {
	if (!query) return "";
	const filteredQuery = Object.fromEntries(
		Object.entries(query).filter(([, v]) => v !== ""),
	);
	if (Object.keys(filteredQuery).length === 0) return "";

	return `?${Object.entries(filteredQuery)
		.map(([key, value]) => `${key}=${value}`, [])
		.join("&")}`;
};

type BaseApiProps = {
	endpoint: string;
	init?: RequestInit;
	query?: Query;
	baseUrl?: string;
};

export const baseApi = async <BaseApiRes>({
	endpoint,
	init,
	query,
	baseUrl = BASE_URL,
}: BaseApiProps): Promise<BaseApiRes> => {
	try {
		const url = `${baseUrl}${endpoint}${getQueryParams(query)}`;
		const res = await fetch(url, init);

		if (!res.ok) {
			const resError = await res.json();
			return Promise.reject(resError);
		}

		const resData = (await res.json()) as BaseApiRes;
		return resData;
	} catch (error) {
		return Promise.reject(error);
	}
};
