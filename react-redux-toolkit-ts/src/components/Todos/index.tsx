import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { deleteTodo, getTodos, postTodo, putTodo } from '../../redux/todos/todosActions';
import { Todo } from '../../redux/todos/todosTypes';
import styles from './Todos.module.css'

const Todos: React.FC = () => {
  const dispatch = useAppDispatch()
  const [newTodo, setNewTodo] = useState({ title: '', userId: '0', completed: false })

  const { todos, todo, error } = useAppSelector(state => state.todos)

  const handleClickGetTodos = () => {
    dispatch(getTodos())
  }

  const handleSetNewTodo = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewTodo({
      ...newTodo,
      [field]: value
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
    <div className={styles.todos}>
      <form onSubmit={handleSubmitPostTodo}>
        <fieldset>
          <legend>Get Todos</legend>
          <button type='button' onClick={handleClickGetTodos}>Get Todos</button>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend>Post Todo</legend>
          <div>
            <label htmlFor="todoTitle">Title:</label>
            <input id="todoTitle" type="text" placeholder='Title' required value={newTodo.title} onChange={handleSetNewTodo('title')} />
          </div>
          <div>
            <label htmlFor="todoUserId">User id:</label>
            <input id="todoUserId" type="number" required value={newTodo.userId} onChange={handleSetNewTodo('userId')} />
          </div>
          <div>
            <label htmlFor="todoCompleted">Completed:</label>
            <input id="todoCompleted" type="checkbox" checked={newTodo.completed} onChange={handleSetNewTodo('completed')} />
          </div>
          <button type='submit'>Post Todo</button>
        </fieldset>
      </form>

      <p className={styles.error}>{error?.message}</p>

      <p>Todo:</p>
      <div>
        {todo && <span className={todo.completed ? styles.completed : ''}>{todo.title}</span>}
      </div>

      <p>Todos:</p>
      <ul>
        {todos?.map(todo => (
          <li className={styles.item} key={todo.id} >
            <span className={todo.completed ? styles.completed : ''}>{todo.title}</span>
            <button type='button' onClick={() => handleClickEdit(todo)}>Edit</button>
            <button type='button' onClick={() => handleClickDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos