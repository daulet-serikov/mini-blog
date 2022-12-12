import {rest} from 'msw'
import {configuration} from '../configuration'
import {getPosts} from '../database'

export const posts = rest.get(`${configuration.apiPrefix}/posts`, async (request, response, context) => {
  const posts = await getPosts()

  return response(
    context.delay(configuration.delay),
    context.json(posts)
  )
})
