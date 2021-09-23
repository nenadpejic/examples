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

      {error &&
        <div style={{ color: 'red' }}>{error.message}</div>
      }

      <div style={{ position: 'relative' }}>
        {isLoading &&
          <div style={{ position: 'absolute', inset: '0px', backgroundColor: 'rgba(255, 255, 255, 0.75)', display: 'flex' }}>
            <span style={{ margin: 'auto' }}>Loading...</span>
          </div>
        }

        <button onClick={handleClickGetAllTodos}>Get All Todos</button>
        <button onClick={handleClickReset}>Reset</button>

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
