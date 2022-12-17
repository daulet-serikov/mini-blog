import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './store/store'
import reportWebVitals from './reportWebVitals'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {routes} from './routes'
import {apiSlice} from './store/slices/api/apiSlice'
import {LoginModal} from './components/LoginModal/LoginModal'
import {RegisterModal} from './components/RegisterModal/RegisterModal'
import {AddPostModal} from './components/AddPostModal/AddPostModal'
import {worker} from './server/server'

worker.start()

const router = createBrowserRouter(routes)

const container = document.getElementById('root')!
const root = createRoot(container)

store.dispatch(apiSlice.endpoints.getUser.initiate())
store.dispatch(apiSlice.endpoints.getPosts.initiate())
store.dispatch(apiSlice.endpoints.getUsers.initiate())

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <LoginModal />
      <RegisterModal />
      <AddPostModal />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
