import React, { useState } from 'react';
import { addTodo, getAllTodos } from 'services/todos';
import { Todo } from 'services/todos.types';

interface TodosState {
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
  const { isLoading, todos, error } = todosState

  const handleClickGetTodos = () => {
    setTodosState(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    getAllTodos()
      .then(todos => {
        setTodosState({
          isLoading: false,
          todos,
          error: undefined
        })
      })
      .catch(error => {
        setTodosState({
          isLoading: false,
          todos: undefined,
          error: error.response.data || error
        })
      })
  }

  const handleClickAddTodo = () => {
    setTodosState(prevState => ({
      ...prevState,
      isLoading: true,
    }))
    addTodo({
      body: {
        completed: false,
        title: 'New added todo',
        userId: 1
      }
    })
      .then(todo => {
        setTodosState(prevState => ({
          isLoading: false,
          todos: prevState.todos ? [
            ...prevState.todos,
            todo
          ] : [todo],
          error: undefined
        }))
      })
      .catch(error => {
        setTodosState({
          isLoading: false,
          todos: undefined,
          error: error.response.data || error
        })
      })
  }

  return (
    <div className="App">

      <button onClick={handleClickGetTodos}>Get Todos</button>

      <button onClick={handleClickAddTodo}>Add Todo</button>

      {isLoading && <p>Loading...</p>}

      {error && <p>{error.message}</p>}

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
