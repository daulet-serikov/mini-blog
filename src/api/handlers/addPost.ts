import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {PostWithoutId} from '../types/PostWithoutId'
import {ApiResponse} from '../types/ApiResponse'
import {AddPostFormValue} from '../../modules/add-post/AddPostFormValue'

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
      const validatedFormValue = validate(formValue)

      const postToAdd: PostWithoutId = {
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

function validate(formValue: Partial<AddPostFormValue>) {
  const schema = Yup.object({
    title: Yup.string().trim().min(10).max(50),
    content: Yup.string().trim().min(10).max(300)
  })

  try {
    schema.validateSync(formValue)
    formValue = schema.cast(formValue)
  } catch {
    throw new Error('The provided data is invalid')
  }

  return formValue as AddPostFormValue
}

async function add(post: PostWithoutId) {
  const posts = await database.getPosts()

  posts.forEach(existingPost => {
    if (existingPost.title === post.title || existingPost.content === post.content) {
      throw new Error('The post is not unique')
    }
  })

  return database.addPost(post)
}
