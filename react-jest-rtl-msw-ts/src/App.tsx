import React, { useState } from 'react';
import { getAllTodos, Todo } from 'services/todos';
import './App.css';

export interface TodosState {
  isLoading: boolean
  todos?: Todo[]
  error?: { message: string }
}

function App() {
  const [todosState, setTodosState] = useState<TodosState>({
    isLoading: false,
    todos: undefined,
    error: undefined
  })

  const handleClickGetTodos = () => {
    getAllTodos()
      .then(todos => {
        setTodosState({
          ...todosState,
          todos
        })
      })
      .catch(error => {
        setTodosState({
          ...todosState,
          error
        })
      })
  }

  return (
    <div className="App">

      <button onClick={handleClickGetTodos}>Get Todos</button>

      <div>{todosState.error?.message}</div>

      <ul>
        {todosState.todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
