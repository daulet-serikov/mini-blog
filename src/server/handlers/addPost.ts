import {rest} from 'msw'
import {configuration} from '../configuration'
import * as Yup from 'yup'
import {getPosts, addPost} from '../database' // TODO import * as database
import {Post} from '../../types/server/Post'

interface RequestPost {
  title?: string
  content?: string
}

// TODO long line
export const addPostHandler = rest.post(`${configuration.apiPrefix}/addPost`, async (request, response, context) => {
  const requestPost = await request.json<RequestPost>()

  try {
    await validate(requestPost)

    const post: Post = {
      ...requestPost as Required<Post>,
      author: sessionStorage.getItem('username')!,
      publicationDate: new Date().toJSON()
    }

    await add(post)

    return response(
      context.delay(configuration.delay),
      context.json({status: 'success', data: post})
    )
  } catch (error) {
    if (error instanceof Error) {
      return response(
        context.delay(configuration.delay),
        context.json({status: 'error', data: error.message})
      )
    }
  }
})

async function validate(post: RequestPost) {
  if (!sessionStorage.getItem('username')) {
    throw new Error('You are not authorized to add posts')
  }

  // TODO get rid of such
  if (!post.title?.trim() || !post.content?.trim()) {
    throw new Error('The provided data is invalid')
  }

  try {
    await Yup.string().min(10).max(50).validate(post.title)
    await Yup.string().trim().min(10).max(300).validate(post.content)
  } catch {
    throw new Error('The provided data is invalid')
  }
}

async function add(post: Post) {
  const posts = await getPosts()

  posts.forEach(existringPost => {
    if (existringPost.title === post.title || existringPost.content === post.content) {
      throw new Error('The post is not unique')
    }
  })

  await addPost(post)
}
