import { NextPage } from 'next'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/hooks'
import { getTodos } from '../redux/todo/todoActions'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const { todos } = useAppSelector(state => state.todo)

  const handleGetTodos = () => {
    dispatch(getTodos())
  }

  return (
    <div className={styles.container}>

      <button onClick={handleGetTodos}>Get Todos</button>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

    </div>
  )
}

export default Home