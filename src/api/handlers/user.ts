import {rest} from 'msw'
import {configuration} from '../configuration'
import {ApiResponse} from '../types/ApiResponse'

export const user = rest.get(
  `${configuration.apiPrefix}/user`,
  (_request, response, context) => {
    const username = sessionStorage.getItem('username')

    if (!username) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'error'})
      )
    }

    return response(
      context.delay(configuration.delay),
      context.json<ApiResponse>({status: 'success', data: username})
    )
  }
)
