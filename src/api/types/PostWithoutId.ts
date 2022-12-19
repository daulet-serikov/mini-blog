import {Post} from './Post'

export type PostWithoutId = Omit<Post, 'id'>
