import {ApiResponse} from '../api/types/ApiResponse'
import {ClientUser} from '../api/types/ClientUser'

interface SuccessRegisterApiResponse extends ApiResponse {
  status: 'success'
  data: ClientUser
}

interface ErrorRegisterApiResponse extends ApiResponse {
  status: 'error'
  data: string
}

export type RegisterApiResponse = SuccessRegisterApiResponse | ErrorRegisterApiResponse

export function isSuccessRegisterApiResponse(
  response: RegisterApiResponse
  ): response is SuccessRegisterApiResponse {
    return response.status === 'success'
}
