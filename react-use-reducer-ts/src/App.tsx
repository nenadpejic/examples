import React, { useReducer } from "react";
import todosGetAllReducer, {
  todosGetAllState,
} from "reducers/todos/todosGetAll.reducer";

function App() {
  const [{ isLoading, error, todos }, dispatch] = useReducer(
    todosGetAllReducer,
    todosGetAllState
  );

  const handleClickGetAllTodos = () => {
    dispatch({ type: "pending" });
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "fulfilled", payload: data }))
      .catch((error) =>
        dispatch({
          type: "rejected",
          error: { message: error.response?.data?.message || error.message },
        })
      );
  };

  return (
    <div className="App">
      <button onClick={handleClickGetAllTodos}>Get All Todos</button>

      {isLoading && <div>Loading...</div>}

      {error && <div>{error.message}</div>}

      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
