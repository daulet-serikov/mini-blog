import {ApiResponse} from '../api/types/ApiResponse'

interface UserSuccessApiResponse extends ApiResponse {
  data: string
}

export function isSuccessUserApiResponse(
  response: ApiResponse
  ): response is UserSuccessApiResponse {
    return response.status === 'success' && typeof response.data === 'string'
}
