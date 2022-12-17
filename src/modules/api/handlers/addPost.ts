import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {Post} from '../types/Post'
import {ApiResponse} from '../types/ApiResponse'
import {AddPostFormValue} from '../../add-post/AddPostFormValue'

export const addPost = rest.post(
  `${configuration.apiPrefix}/addPost`,
  async (request, response, context) => {
    if (!sessionStorage.getItem('username')) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'error', data: 'You are not authorized to add posts'})
      )
    }

    const formValue = await request.json<Partial<AddPostFormValue>>()

    try {
      const validatedFormValue = await validate(formValue)

      const postToAdd: Omit<Post, 'id'> = {
        ...validatedFormValue,
        author: sessionStorage.getItem('username')!,
        publicationDate: new Date().toJSON()
      }

      const post = await add(postToAdd)

      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'success', data: post})
      )
    } catch (error) {
      if (error instanceof Error) {
        return response(
          context.delay(configuration.delay),
          context.json<ApiResponse>({status: 'error', data: error.message})
        )
      }
    }
  }
)

async function validate(formValue: Partial<AddPostFormValue>) {
  try {
    await Yup.string().trim().min(10).max(50).validate(formValue.title)
    await Yup.string().trim().min(10).max(300).validate(formValue.content)
  } catch {
    throw new Error('The provided data is invalid')
  }

  return formValue as AddPostFormValue
}

async function add(post: Omit<Post, 'id'>) {
  const posts = await database.getPosts()

  posts.forEach(existingPost => {
    if (existingPost.title === post.title || existingPost.content === post.content) {
      throw new Error('The post is not unique')
    }
  })

  return database.addPost(post)
}
