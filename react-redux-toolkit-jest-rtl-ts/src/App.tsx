import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllTodos } from 'redux/todos/todos.actions';
import './App.css';

function App() {
  const dispatch = useAppDispatch()

  const { todos, error } = useAppSelector(state => state.todos)

  const handleClickGetTodos = () => {
    dispatch(getAllTodos())
  }

  return (
    <div className="App">

      <button onClick={handleClickGetTodos}>Get Todos</button>

      <div>{error?.message}</div>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
