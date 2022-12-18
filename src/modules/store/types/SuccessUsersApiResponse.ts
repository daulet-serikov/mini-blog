import {ApiResponse} from '../api/types/ApiResponse'
import {ClientUser} from '../api/types/ClientUser'

interface SuccessUsersApiResponse extends ApiResponse {
  data: ClientUser[]
}

export function isSuccessUsersApiResponse(
  response: ApiResponse
  ): response is SuccessUsersApiResponse {
    return response.status === 'success'
}
