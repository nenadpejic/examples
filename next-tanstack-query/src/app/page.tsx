"use client";

import { addTodo, getTodos } from "@/data/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ChangeEvent, useState } from "react";

const mockedTodos = [
	{
		userId: 1,
		id: 1,
		title: "delectus aut autem",
		completed: false,
	},
	{
		userId: 1,
		id: 2,
		title: "quis ut nam facilis et officia qui",
		completed: false,
	},
	{
		userId: 1,
		id: 3,
		title: "fugiat veniam minus",
		completed: false,
	},
];

export default function Home() {
	const [addTodoForm, setAddTodoForm] = useState({
		title: "",
		completed: false,
	});
	const queryClient = useQueryClient();
	const getTodosQuery = useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
		// initialData: mockedTodos,
		// placeholderData: mockedTodos,
	});
	const addTodoMutation = useMutation({
		mutationFn: addTodo,
		onSuccess: (data) => {
			// queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		addTodoMutation.mutate({
			payload: {
				title: addTodoForm.title,
				completed: addTodoForm.completed,
			},
		});
	};

	const handleChangeForm =
		(field: keyof typeof addTodoForm) => (e: ChangeEvent<HTMLInputElement>) => {
			const { type, value, checked } = e.target;

			setAddTodoForm((prev) => ({
				...prev,
				[field]: type === "checkbox" ? checked : value,
			}));
		};

	return (
		<div>
			<form className="w-[400px] p-2 mx-auto" onSubmit={handleAddTodo}>
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-4 items-center justify-items-start gap-4">
						<label htmlFor="title">Title</label>
						<input
							className="col-span-3 w-full border rounded-md px-3 py-1"
							id="title"
							type="text"
							onChange={handleChangeForm("title")}
						/>
					</div>
					<div className="grid grid-cols-4 items-center justify-items-start gap-4">
						<label htmlFor="completed">Completed</label>
						<input
							id="completed"
							type="checkbox"
							onChange={handleChangeForm("completed")}
						/>
					</div>
				</div>

				<div className="mt-4 flex items-center justify-end gap-2">
					<button
						className="bg-gray-900 hover:bg-gray-900/90 text-white rounded-md px-4 py-2 cursor-pointer dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-100/90"
						type="submit"
					>
						Add
					</button>
				</div>
			</form>

			<ul className="w-[400px] p-2 mx-auto">
				{getTodosQuery.data?.map((todo) => (
					<li className="truncate" key={todo.id}>
						{todo.title}
					</li>
				))}
			</ul>
		</div>
	);
}
