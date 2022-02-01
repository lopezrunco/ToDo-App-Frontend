import 'bootswatch/dist/minty/bootstrap.min.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals()
