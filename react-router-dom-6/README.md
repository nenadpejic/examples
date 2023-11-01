# react-router-dom-6

Example project showcasing [React Router Dom](https://react.dev/) for building front-end apps.

This project was bootstrapped with [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), by running `$ yarn create vite@latest react --template react-swc-ts`.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app), by running `$ npx create-next-app`.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [ESLint](https://eslint.org/) - Linter
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [React Router Dom](https://reactrouter.com/) - Routing

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd react-router-dom-6
```

- Make sure to use the node version specified in `.nvmrc`. It is recommended to use `nvm` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

```sh
$ nvm use
```

- Intall dependencies. This project uses `npm`. [Official npm docs](https://www.npmjs.com/)

```sh
$ corepack enable
$ yarn install
# or
$ npm install
```

## Development

- Run local dev server

```sh
$ yarn dev
# or
$ npm run dev
```

## Build and Test

- Bundle for production

```sh
$ yarn run build
# or
$ npm run build
```

## Contributing

- Create a new feature branch

```sh
$ git checkout -b feat/<feature-name>
```

- Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

```sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
```

- Open a pull request and once approved merge by squashing commits

- Optional: Rebase beforehand

```sh
$ git rebase master HEAD~<number-of-commits> -i
```

## Deployment

## Guide

- Install react-router-dom

```sh
$ npm i react-router-dom
```

- Implement `BrowserRouter` in `main.tsx`

- Implement `Routes`, `Route`, `Link` in `App.tsx`

- You can use `useParams` hook to get acces to the slug. For example in `/todos/:id` the `id` as a param.

- In version 6 the ordering of similar routes doesn't matter, router will figure out which to use. For example `/todos/:id` and `/todos/new`

- In version 6 we can write nested routes.

```tsx
// App.tsx
<Routes>
  <Route path="/todos">
    <Route index element={<TodoList />} />
    <Route path=":id" element={<Todo />} />
    <Route path="new" element={<NewTodo />} />
  </Route>
</Routes>
```

- We can create layouts.

We create a layout component with an `Outlet` component. The `Outlet` component can take in a context as a prop. All child components will have access to that context with the `useOutletContext` hook.

```tsx
// TodoLayout.tsx
<>
  <Link to={'/todos/1'}>Todo 1</Link>
  <br />
  <Link to={'/todos/2'}>Todo 2</Link>
  <br />
  <Link to={'/todos/new'}>New Todo</Link>

  <Outlet context={{ foo: 'bar' }} />
</>
```

Then we add the layout component to the parent route.

```tsx
// App.tsx
<Routes>
  <Route path="/todos" element={<TodoLayout />}>
    <Route index element={<TodoList />} />
    <Route path=":id" element={<Todo />} />
    <Route path="new" element={<NewTodo />} />
  </Route>
</Routes>
```

Or, we can group the routes in a single component. NOTE: You need to add `/*` to the parent route path prop.

```tsx
// TodoRoutes.tsx
<Routes>
  <Route element={<TodoLayout />}>
    <Route index element={<TodoList />} />
    <Route path=":id" element={<Todo />} />
    <Route path="new" element={<NewTodo />} />
  </Route>
</Routes>
```

```tsx
// App.tsx
<Routes>
  <Route path="/todos/*" element={<TodoRoutes />} />
</Routes>
```

- We can use the `location` prop on the `Routes` component to say which route should be static and always shown

```tsx
<Routes location={'/todos'}>
  <Route path="/todos" element={<h1>Extra Content</h1>} />
</Routes>
```

- We can also define all the routes with the `useRoutes` hook and then just use them in the return.

```tsx
const routes = useRoutes([
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
])

return <>{routes}</>
```

- The `Link` component comes with a few props.

The `replace` boolean prop that makes it so it replaces the url in history so you cant go back to the page you came from.

```tsx
<Link to="/" replace>
  Home
</Link>
```

The `reloadDocument` boolean prop that reloads the page on visit.

The `state` prop that can be used to pass state to the page.

- We also have the `NavLink` component. It has the extra functionality of the `isActive` value that can be used for styling.

```tsx
<NavLink
  style={({ isActive }) => {
    return isActive ? { color: 'red' } : {}
  }}
  to="/"
>
  {({ isActive }) => {
    return isActive ? 'Active Home' : 'Home'
  }}
</NavLink>
```

If you dont want the parent route to have styles add the `end` prop to it.

- The `Navigate` component is similar to the `Link` component as in it has the same props but how it works is it automaticly navigates the user to the specified path.

- The `useNavigate` hook can be used to programaticly redirect the user.

- The `useSearchParams` hook can be used to get and set the query params from the url.

- The `useLocation` hook can be used to access the state we pass along through the links with the `state` prop.
