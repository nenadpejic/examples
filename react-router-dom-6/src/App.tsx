import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import TodoLayout from './layouts/TodoLayout'
import TodoList from './pages/TodoList'
import Todo from './pages/Todo'
import NewTodo from './pages/NewTodo'
import NotFound from './pages/NotFound'

function App() {
  // Example of using the useRoutes hook
  // const routes = useRoutes([
  //   {
  //     path: '/',
  //     element: <NavLayout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <Home />,
  //       },
  //       {
  //         path: 'about',
  //         element: <About />,
  //       },
  //       {
  //         path: 'contact',
  //         element: <Contact />,
  //       },
  //     ],
  //   },
  // ])

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/todos">todos</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        {/*
        <Route path="/todos" element={<TodoList />} />
        <Route path="/todos/:id" element={<Todo />} />
        <Route path="/todos/new" element={<NewTodo />} />
        */}

        <Route path="/todos" element={<TodoLayout />}>
          <Route index element={<TodoList />} />
          <Route path=":id" element={<Todo />} />
          <Route path="new" element={<NewTodo />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Routes location={'/todos'}>
        <Route path="/todos" element={<h1>Extra Content</h1>} />
      </Routes>

      {/* {routes} */}
    </>
  )
}

export default App
