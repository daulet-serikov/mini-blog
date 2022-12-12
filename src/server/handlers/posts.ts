import {rest} from 'msw'
import {config} from '../config'
import {getPosts} from '../db'

export const posts = rest.get(`${config.apiPrefix}/posts`, async (req, res, ctx) => {
  const posts = await getPosts()
  return res(
    ctx.delay(config.delay),
    ctx.json(posts)
  )
})
