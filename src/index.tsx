import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import reportWebVitals from './reportWebVitals'
import {routes} from './routes'
import './index.css'
import {worker} from './api'
import {store} from './store/store'
import {apiSlice} from './store/apiSlice'
import {LoginModal} from './modules/login/LoginModal'
import {RegisterModal} from './modules/register/RegisterModal'
import {AddPostModal} from './modules/add-post/AddPostModal'

worker.start()

const container = document.getElementById('root')!
const root = createRoot(container)

const router = createBrowserRouter(routes)

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
