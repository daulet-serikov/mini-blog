import {Layout} from './components/Layout/Layout'
import {Posts} from './components/Posts/Posts'
import {RouteObject} from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Posts />
      }
    ]
  }
]
