import React from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getAllTodos, resetTodosGetAllState } from './redux/todos/todosActions';

function App() {
  const dispatch = useAppDispatch()

  const { isLoading, todos, error } = useAppSelector(state => state.todosGetAll)

  const handleClickGetAllTodos = () => {
    // @ts-ignore
    dispatch(getAllTodos())
  }

  const handleClickReset = () => {
    // @ts-ignore
    dispatch(resetTodosGetAllState())
  }

  return (
    <div className="App">

      <button onClick={handleClickGetAllTodos}>Get All Todos</button>
      <button onClick={handleClickReset}>Reset</button>

      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>{error.message}</p>}

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
