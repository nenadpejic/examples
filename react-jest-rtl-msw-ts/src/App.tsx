import React, { useState } from 'react';
import { addTodo, getAllTodos, Todo } from 'services/todos';
import './App.css';

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
    const _todo = {
      completed: false,
      title: 'New added todo',
      userId: 1
    }
    addTodo(_todo)
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
