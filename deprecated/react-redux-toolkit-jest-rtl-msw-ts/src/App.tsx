import React from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hoooks';
import { getAllTodos } from 'redux/todos/todosGetAll/todosGetAllAction';
import { resetTodosGetAll } from 'redux/todos/todosGetAll/todosGetAllSlice';
import { Todo } from 'redux/todos/todoType';
import { updateTodo } from 'redux/todos/todoUpdate/todoUpdateAction';

function App() {
  const dispatch = useAppDispatch()

  const { isLoading: todosGetAllIsLoading, todos: todosGetAll, error: todosGetAllError } = useAppSelector(state => state.todosGetAll)
  const { isLoading: todoUpdateIsLoading, todo: todoUpdate, error: todoUpdateError } = useAppSelector(state => state.todoUpdate)

  const handleClickGetTodos = () => {
    dispatch(getAllTodos())
  }

  const handleClickReset = () => {
    dispatch(resetTodosGetAll())
  }

  const handleClickEdit = (todo: Todo) => {
    const { id, ..._body } = todo
    dispatch(updateTodo({
      params: {
        id: todo.id
      },
      body: {
        ..._body,
        completed: !todo.completed,
      }
    }))
  }

  return (
    <div className="App">

      <button onClick={handleClickGetTodos}>Get Todos</button>
      <button onClick={handleClickReset}>Reset</button>

      {(todosGetAllIsLoading || todoUpdateIsLoading) && <p role="progressbar">Loading...</p>}

      {todosGetAllError && <p>{todosGetAllError.message}</p>}
      {todoUpdateError && <p>{todoUpdateError.message}</p>}

      <ul>
        {todosGetAll?.map(todo => {
          if (todo.id === todoUpdate?.id) {
            return todoUpdate
          }
          return todo
        })
          .map(todo => {
            return (
              <li key={todo.id}>
                <span style={todo.completed ? { textDecoration: 'line-through' } : undefined}>{todo.title}</span>
                <button onClick={() => handleClickEdit(todo)}>Edit</button>
              </li>
            )
          })}
      </ul>
    </div>
  );
}

export default App;
