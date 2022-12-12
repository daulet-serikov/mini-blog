import {rest} from 'msw'
import {configuration} from '../configuration'

export const user = rest.get(`${configuration.apiPrefix}/user`, (req, res, ctx) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn')

  if (!isLoggedIn) {
    return res(
      ctx.delay(configuration.delay),
      ctx.json({
        username: null,
        errorMessage: 'Not authorized'
      })
    )
  }

  return res(
    ctx.delay(configuration.delay),
    ctx.json({
      errorMessage: null
    })
  )
})
