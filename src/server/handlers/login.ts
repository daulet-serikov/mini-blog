import {rest} from 'msw'
import {LoginCredential} from '../../types/LoginCredential'
import {configuration} from '../configuration'

export const login = rest.post(`${configuration.apiPrefix}/login`, async (request, response, context) => {
  const data = await request.json<LoginCredential>()
  console.log(data)

  return response(context.delay(configuration.delay), context.json({success: true}))
})
