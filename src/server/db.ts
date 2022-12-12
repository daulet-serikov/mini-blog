import {User} from '../types/User'
import {Post} from '../types/Post'

let db: IDBDatabase
let initialized = false

async function getDb() {
  if (!initialized) {
    await initialize()
  }

  return db
}

async function initialize() {
  return new Promise<void>(resolve => {
    const openRequest = indexedDB.open('mini-blog')

    openRequest.onupgradeneeded = () => {
      db = openRequest.result
      db.createObjectStore('users', {keyPath: 'id', autoIncrement: true})
      db.createObjectStore('posts', {keyPath: 'id', autoIncrement: true})
    }

    openRequest.onsuccess = () => {
      db = openRequest.result

      const usersTransaction = db.transaction('users', 'readwrite')
      const users = usersTransaction.objectStore('users')

      const usersToAdd: User[] = [
        {name: 'Admin'},
        {name: 'Bob'},
        {name: 'Michael'}
      ]

      usersToAdd.forEach(users.add.bind(users))

      const postsTransaction = db.transaction('posts', 'readwrite')
      const posts = postsTransaction.objectStore('posts')

      const postsToAdd: Post[] = [
        {content: 'a', authorId: 0},
        {content: 'b', authorId: 1},
        {content: 'b', authorId: 2}
      ]

      postsToAdd.forEach(posts.add.bind(posts))

      initialized = true
      resolve()
    }
  })
}

async function getObjectStore(store: string, mode: IDBTransactionMode) {
  const db = await getDb()
  const transaction = db.transaction(store, mode)
  return transaction.objectStore(store)
}

export async function addUser(user: User) {
  const users = await getObjectStore('users', 'readwrite')
  users.add(user)
}

export async function addPost(post: Post) {
  const posts = await getObjectStore('posts', 'readwrite')
  posts.add(post)
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
