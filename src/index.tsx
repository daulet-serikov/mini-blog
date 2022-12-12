import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store/store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import {ConfigProvider, theme} from 'antd'

if (process.env.NODE_ENV === 'development') {
  const {worker} = require('./server/server')
  worker.start()
}

const router = createBrowserRouter(routes)

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider /* TODO{implement dart theme}theme={{algorithm: theme.darkAlgorithm}}*/>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
