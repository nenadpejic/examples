import { useOutletContext, useParams } from 'react-router-dom'
import { TodoLayoutOutletContext } from '../layouts/TodoLayout'

const Todo = () => {
  const { id } = useParams()
  const ctx = useOutletContext<TodoLayoutOutletContext>()

  return (
    <h1>
      Todo {id} {ctx.foo}
    </h1>
  )
}

export default Todo
