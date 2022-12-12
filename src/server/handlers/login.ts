import {rest} from 'msw'
import {configuration} from '../configuration'

export const login = rest.post(`${configuration.apiPrefix}/login`, (req, res, ctx) => {
  return res(
    ctx.delay(configuration.delay),
    ctx.status(200)
  )
})
