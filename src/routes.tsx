import {Layout} from './layout/Layout'
import {Posts} from './modules/posts/Posts'
import {Profile} from './modules/profile/Profile'
import {RouteObject} from 'react-router-dom'
import {Error} from './modules/error/Error'

export const routes: RouteObject[] = [
  {
    path: '',
    element: <Layout />,
    errorElement: <Error />,
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
