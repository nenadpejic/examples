import { Link } from "@tanstack/react-router";
import { ErrorAlert } from "@/components/ErrorAlert";
import type { Todo } from "@/data/todos";
import { useQuery } from "@/hooks/useQuery";

export const TodosTable = () => {
	const todosQuery = useQuery<Todo[]>(
		"https://jsonplaceholder.typicode.com/todos",
	);

	return (
		<>
			{todosQuery.isLoading && <p>Loading...</p>}
			{todosQuery.error && <ErrorAlert error={todosQuery.error} />}
			{todosQuery.data && (
				<table style={{ width: "100%" }}>
					<thead>
						<tr>
							<th style={{ textAlign: "start" }} scope="col">
								User Id
							</th>
							<th style={{ textAlign: "start" }} scope="col">
								Id
							</th>
							<th style={{ textAlign: "start" }} scope="col">
								Title
							</th>
							<th style={{ textAlign: "start" }} scope="col">
								Completed
							</th>
						</tr>
					</thead>
					<tbody>
						{todosQuery.data?.map((todo) => {
							return (
								<tr key={todo.id}>
									<td>{todo.userId}</td>
									<td>{todo.id}</td>
									<td>
										<Link to={`${String(todo.id)}`}>{todo.title}</Link>
									</td>
									<td>{todo.completed ? "T" : "F"}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
		</>
	);
};
