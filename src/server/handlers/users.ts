import {rest} from 'msw'
import {configuration} from '../configuration'
import {getUsers} from '../database'

export const users = rest.get(`${configuration.apiPrefix}/users`, async (request, response, context) => {
  const users = await getUsers()

  return response(
    context.delay(configuration.delay),
    context.json(users)
  )
})
