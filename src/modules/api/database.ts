import {ApiUser} from './types/ApiUser'
import {User} from '../user/User'
import {ApiPost} from './types/ApiPost'
import {
  users as mockUsers,
  posts as mockPosts
} from './mock-data'

let database: IDBDatabase
let initialized = false

async function getDatabase() {
  if (!initialized) {
    await initialize()
  }

  return database
}

async function initialize() {
  return new Promise<void>(resolve => {
    const openRequest = indexedDB.open('mini-blog')

    openRequest.onupgradeneeded = () => {
      const database = openRequest.result
      database.createObjectStore('users', {keyPath: 'username'})
      database.createObjectStore('posts', {keyPath: 'id', autoIncrement: true})
    }

    openRequest.onsuccess = () => {
      database = openRequest.result
      initialized = true
      resolve()
    }
  })
}

populate()

async function populate() {
  if (localStorage.getItem('databasePopulated')) {
    return
  }

  const database = await getDatabase()
  const transaction = database.transaction(['users', 'posts'], 'readwrite')

  const users = transaction.objectStore('users')
  const posts = transaction.objectStore('posts')

  mockUsers.forEach(user => users.add(user))
  mockPosts.forEach(post => posts.add(post))

  localStorage.setItem('databasePopulated', 'true')
}

async function getObjectStore(store: string, mode: IDBTransactionMode) {
  const database = await getDatabase()
  return database.transaction(store, mode).objectStore(store)
}

export async function getPosts() {
  const posts = await getObjectStore('posts', 'readonly')
  const request = posts.getAll()

  return new Promise<ApiPost[]>(resolve => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

export async function getUsers(): Promise<User[]> {
  const users = await getObjectStore('users', 'readonly')
  const request = users.getAll()

  return new Promise(resolve => {
    request.onsuccess = () => {
      const apiUsers = request.result as ApiUser[]

      const users: User[] = apiUsers.map(user => {
        const {password: _, ...userWithPasswordOmitted} = user
        return userWithPasswordOmitted
      })

      resolve(users)
    }
  })
}

export async function addPost(post: ApiPost) {
  const posts = await getObjectStore('posts', 'readwrite')
  posts.add(post)
}

export async function getUser(username: string): Promise<ApiUser> {
  const users = await getObjectStore('users', 'readonly')
  const request = users.get(username)

  return new Promise<ApiUser>(resolve => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

export async function addUser(user: ApiUser) {
  const users = await getObjectStore('users', 'readwrite')
  users.add(user)
}
