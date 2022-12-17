import {rest} from 'msw'
import {configuration} from '../configuration'
import * as database from '../database'

export const posts = rest.get(
  `${configuration.apiPrefix}/posts`,
  async (_request, response, context) => {
    const posts = await database.getPosts()

    return response(
      context.delay(configuration.delay),
      context.json(posts)
    )
  }
)
