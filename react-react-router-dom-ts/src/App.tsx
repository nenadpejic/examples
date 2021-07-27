import React, { useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
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

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {

  return (
    <Route {...rest} render={({ location }) => {
      return (
        fakeAuth.isAuth === true
          ? children
          : <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
      )
    }}>
    </Route>
  )
}

const Public: React.FC = () => {

  return (
    <div>
      <h1>Public Page</h1>
    </div>
  )
}

const Protected: React.FC = () => {
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

const Login: React.FC = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)

  const { state } = useLocation<{ from: string }>()

  const handleClickLogin = () => {
    fakeAuth.signin(() => {
      setRedirectToReferrer(true)
    })
  }

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <div>
      <h1>Login Page</h1>

      <button onClick={handleClickLogin}>Login</button>
    </div>
  )
}

const RedirectHere: React.FC = () => {
  return (
    <div>
      <h1>RedirectHere</h1>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ul>
          <li><Link to='/public'>To Public Page</Link></li>
          <li><Link to='/protected'>To Protected Page</Link></li>
          <li><Link to='/redirect'>{"To RedirectHere Page, from '/redirect' to '/redirect/here'"}</Link></li>
        </ul>

        <Route exact path='/public' component={Public} />

        <Route exact path='/login' component={Login} />

        <PrivateRoute exact path='/protected' children={<Protected />} />

        <PrivateRoute exact path='/redirect' children={<Redirect to="/redirect/here" />} />
        <PrivateRoute exact path='/redirect/here' children={<RedirectHere />} />

      </div>
    </BrowserRouter>
  );
}

export default App;
