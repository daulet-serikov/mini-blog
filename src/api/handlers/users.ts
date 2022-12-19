import {rest} from 'msw'
import {configuration} from '../configuration'
import {getUsers} from '../database'
import {ApiResponse} from '../types/ApiResponse'

export const users = rest.get(
  `${configuration.apiPrefix}/users`,
  async (_request, response, context) => {
    const users = await getUsers()

    return response(
      context.delay(configuration.delay),
      context.json<ApiResponse>({status: 'success', data: users})
    )
  }
)
