import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './Components/ThemeProvider.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>

  <ThemeProvider>
    <App />
  </ThemeProvider>
  </Provider>
  // </React.StrictMode>,
)
