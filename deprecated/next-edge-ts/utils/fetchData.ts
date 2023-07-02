// async function fetchData<T>(endpoint: string) {
const fetchData = async <T extends unknown>(endpoint: string): Promise<T> => {
  const response = await fetch(
    `https://hacker-news.firebaseio.com/v0/${endpoint}.json`,
    { method: "GET" }
  );
  const data = await response.json();
  return data;
};

export default fetchData;
