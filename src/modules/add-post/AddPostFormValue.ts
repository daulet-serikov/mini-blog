import {Post} from '../../api/types/Post'

export type AddPostFormValue = Omit<Post, 'id' | 'author' | 'publicationDate'>
