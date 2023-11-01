import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  BrowserRouter,
  // HashRouter // Used for seting hash urls "localhost:3000/#/todos"
  // unstable_HistoryRouter // Gives you direct access to the browser history
  // MemoryRouter // Stores routing in memory, the url never changes. Usefull for running tests since it is not connected to the browser
} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
