import {ApiResponse} from '../api/types/ApiResponse'
import {User} from '../api/types/User'

interface SuccessUsersApiResponse extends ApiResponse {
  data: Omit<User, 'password'>[]
}

export function isSuccessUsersApiResponse(
  response: ApiResponse
  ): response is SuccessUsersApiResponse {
    return response.status === 'success'
}
