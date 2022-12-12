import {rest} from 'msw'
import {config} from '../config'

export const login = rest.post(`${config.apiPrefix}/login`, (req, res, ctx) => {
  return res(
    ctx.delay(config.delay),
    ctx.status(200)
  )
})
