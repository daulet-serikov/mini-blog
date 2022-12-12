import {rest} from 'msw'
import {config} from '../config'

export const user = rest.get(`${config.apiPrefix}/user`, (req, res, ctx) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')

  if (!isLoggedIn) {
    return res(
      ctx.delay(config.delay),
      ctx.json({
        username: null,
        errorMessage: 'Not authorized'
      })
    )
  }

  return res(
    ctx.delay(config.delay),
    ctx.json({
      errorMessage: null
    })
  )
})
