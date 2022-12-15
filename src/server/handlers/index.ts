import {posts} from './posts'
import {users} from './users'
import {login} from './login'
import {currentUser} from './currentUser'
import {registerHandler as register} from './register'

export const handlers = [
  posts,
  users,
  login,
  currentUser,
  register
]
