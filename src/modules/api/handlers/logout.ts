import {rest} from 'msw'
import {configuration} from '../configuration'
import {ApiResponse} from '../types/ApiResponse'

export const logout = rest.post(
  `${configuration.apiPrefix}/logout`,
  (_request, response, context) => {
    if (!sessionStorage.getItem('username')) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'error', data: 'You have already been logged out'})
      )
    }

    sessionStorage.removeItem('username')

    return response(
      context.delay(configuration.delay),
      context.json<ApiResponse>({status: 'success'})
    )
  }
)
