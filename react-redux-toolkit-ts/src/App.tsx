import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { deleteTodo, getTodos, postTodo, putTodo } from 'redux/todos/todosActions';
import { resetTodosState } from 'redux/todos/todosSlice';
import { Todo } from 'redux/todos/todosTypes';

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const { todos, todo, error, isLoading } = useAppSelector(state => state.todos)

  const [newTodo, setNewTodo] = useState({ title: '', userId: '', completed: false })

  const handleClickGetTodos = () => {
    dispatch(getTodos())
  }

  const handleClickReset = () => {
    dispatch(resetTodosState())
  }

  const handleSetNewTodo = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewTodo({
      ...newTodo,
      [key]: value
    })
  }

  const handleSubmitPostTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const _newTodo = {
      ...newTodo,
      userId: parseInt(newTodo.userId)
    }
    dispatch(postTodo(_newTodo))
  }

  const handleClickEdit = (todo: Todo) => {
    const _todo = {
      ...todo,
      completed: !todo.completed,
    }
    dispatch(putTodo(_todo))
  }

  const handleClickDelete = (id: number) => {
    dispatch(deleteTodo(id))
  }

  return (
    <div className="App">

      <button type='button' onClick={handleClickGetTodos}>Get Todos</button>
      <button type='button' onClick={handleClickReset}>Reset</button>

      <form className={'card'} onSubmit={handleSubmitPostTodo}>
        <div>
          <label htmlFor="todo-title">Title:</label>
          <input id="todo-title" type="text" placeholder='Title' required value={newTodo.title} onChange={handleSetNewTodo('title')} />
        </div>
        <div>
          <label htmlFor="todo-user-id">UserId:</label>
          <input id="todo-user-id" type="text" required placeholder='UserId' value={newTodo.userId} onChange={handleSetNewTodo('userId')} />
        </div>
        <div>
          <label htmlFor="todo-completed">Completed:</label>
          <input id="todo-completed" type="checkbox" checked={newTodo.completed} onChange={handleSetNewTodo('completed')} />
        </div>
        <button type='submit'>Post Todo</button>
      </form>

      {error && <p>{error?.message}</p>}

      {isLoading && <p>Loading...</p>}

      {todo && (
        <div className={'card'} >
          <span>Id: {todo.id}</span>
          <span>Title: {todo.title}</span>
          <span>Completed: {todo.completed}</span>
          <span>UserId: {todo.userId}</span>
        </div>
      )}

      <ul>
        {todos?.map(todo => (
          <li key={todo.id} >
            <span style={todo.completed ? { textDecoration: 'line-through' } : undefined}>{todo.title}</span>
            <button type='button' onClick={() => handleClickEdit(todo)}>Edit</button>
            <button type='button' onClick={() => handleClickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
