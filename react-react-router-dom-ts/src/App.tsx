import React, { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, useHistory, useLocation } from 'react-router-dom';
import './App.css';

const fakeAuth = {
  isAuth: false,
  signin(cb: () => void) {
    this.isAuth = true
    setTimeout(cb, 1000)
  },
  signout(cb: () => void) {
    this.isAuth = false
    setTimeout(cb, 1000)
  },
}

interface Props {
  path: string,
  component: () => JSX.Element
}

const PrivateRoute: React.FC<Props> = ({ path, component: Component }) => {

  return (
    <Route path={path} render={({ location }) => {
      console.log(location)
      return (
        fakeAuth.isAuth === true
          ? <Component />
          : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
      )
    }}>
    </Route>
  )
}

const Public = () => {

  return (
    <div>
      <h1>Public Page</h1>
    </div>
  )
}

const Protected = () => {
  const history = useHistory()

  const handleClickLogout = () => {
    fakeAuth.signout(() => history.push('/'))
  }

  return (
    <div>
      <h1>Protected Page</h1>

      <button onClick={handleClickLogout}>Logout</button>
    </div>
  )
}

const Login = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const { state } = useLocation()

  const handleClickLogin = () => {
    fakeAuth.signin(() => {
      setRedirectToReferrer(true)
    })
  }

  if (redirectToReferrer === true) {
    // @ts-ignore
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleClickLogin}>Login</button>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <ul>
          <li><Link to='/public'>To Public Page</Link></li>
          <li><Link to='/protected'>To Protected Page</Link></li>
        </ul>

        <Route exact path='/public' component={Public} />

        <Route exact path='/login' component={Login} />

        <PrivateRoute path='/protected' component={Protected} />

      </div>
    </BrowserRouter>
  );
}

export default App;
