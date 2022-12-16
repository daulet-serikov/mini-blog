import {posts} from './posts'
import {users} from './users'
import {login} from './login'
import {currentUser} from './currentUser'
import {registerHandler as register} from './register'
import {addPostHandler as addPost} from './addPost'

export const handlers = [
  posts,
  users,
  login,
  currentUser,
  register,
  addPost
]
