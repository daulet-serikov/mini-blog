import {User} from './types/User'
import {Post} from './types/Post'
import {users as mockUsers, posts as mockPosts} from './mock-data'

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
      database.createObjectStore('users', {keyPath: 'id', autoIncrement: true})
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

  return new Promise<Post[]>(resolve => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

export async function addPost(post: Post) {
  const posts = await getObjectStore('posts', 'readwrite')
  posts.add(post)
}

export async function addUser(user: User) {
  const users = await getObjectStore('users', 'readwrite')
  users.add(user)
}
