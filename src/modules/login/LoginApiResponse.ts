import {ApiResponse} from '../../api/types/ApiResponse'

interface SuccessLoginApiResponse extends ApiResponse {
  status: 'success'
  data: string
}

interface ErrorLoginApiResponse extends ApiResponse {
  status: 'error'
  data: string
}

export type LoginApiResponse = SuccessLoginApiResponse | ErrorLoginApiResponse

export function isSuccessLoginApiResponse(
  response: LoginApiResponse
  ): response is SuccessLoginApiResponse {
    return response.status === 'success'
}
