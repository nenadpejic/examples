import type { AppContext, AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { makeStore } from '../redux/store'
import { getTodos } from '../redux/todo/todoActions'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const reduxStore = makeStore(pageProps.initialReduxState)

  return (
    <Provider store={reduxStore}>
      <Component {...pageProps} />
    </Provider>
  )
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Initialise redux store on the server side
  const reduxStore = makeStore()
  const dispatch = reduxStore.dispatch

  await dispatch(getTodos())

  return {
    pageProps: {
      initialReduxState: reduxStore.getState(),
    },
  }
}


export default MyApp
