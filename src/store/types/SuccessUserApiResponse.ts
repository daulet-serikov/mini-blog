import {ApiResponse} from '../../api/types/ApiResponse'

interface SuccessUserApiResponse extends ApiResponse {
  data: string
}

export function isSuccessUserApiResponse(
  response: ApiResponse
  ): response is SuccessUserApiResponse {
    return response.status === 'success'
}
