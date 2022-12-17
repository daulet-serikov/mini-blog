import {rest} from 'msw'
import {configuration} from '../configuration'

export const user = rest.get(`${configuration.apiPrefix}/currentUser`, async (_request, response, context) => {
  const username = sessionStorage.getItem('username')

  if (!username) {
    return response(
      context.delay(configuration.delay),
      context.json({status: 'error'})
    )
  }

  return response(
    context.delay(configuration.delay),
    context.json({status: 'success', data: username})
  )
})
