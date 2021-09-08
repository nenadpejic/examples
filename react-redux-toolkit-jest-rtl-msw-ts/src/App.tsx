import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hoooks';
import { getAllTodos } from 'redux/todos/todosGetAll/todosGetAllActions';
import './App.css';

function App() {
  const dispatch = useAppDispatch()

  const { isLoading, todos, error } = useAppSelector(state => state.todosGetAll)

  const handleClickGetTodos = () => {
    dispatch(getAllTodos())
  }

  return (
    <div className="App">

      <div>
        {isLoading && <p>Loading...</p>}

        <button onClick={handleClickGetTodos}>Get Todos</button>

        {error && <p>{error.message}</p>}

        <ul>
          {todos?.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
