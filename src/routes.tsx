import {Layout} from './modules/layout/Layout'
import {Posts} from './modules/posts/Posts'
import {Profile} from './modules/profile/Profile'
import {RouteObject} from 'react-router-dom'

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Posts />
      },
      {
        path: '/:userId',
        element: <Profile />
      }
    ]
  }
]
