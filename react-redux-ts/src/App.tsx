import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getAllTodos } from './redux/todos/todosActions';

function App() {
  const dispatch = useAppDispatch()

  const { isLoading, todos, error } = useAppSelector(state => state.todosGetAll)

  const handleClickGetAllTodos = () => {
    // @ts-ignore
    dispatch(getAllTodos())
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
