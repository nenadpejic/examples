import { Link, Outlet } from 'react-router-dom'

export type TodoLayoutOutletContext = {
  foo: string
}

const TodoLayout = () => {
  const context: TodoLayoutOutletContext = { foo: 'bar' }

  return (
    <>
      <Link to={'/todos/1'}>Todo 1</Link>
      <br />
      <Link to={'/todos/2'}>Todo 2</Link>
      <br />
      <Link to={'/todos/new'}>New Todo</Link>

      <Outlet context={context} />
    </>
  )
}

export default TodoLayout
