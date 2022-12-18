import {Post} from './Post'
import {ClientUser} from './ClientUser'

export interface ApiResponse {
  status: 'success' | 'error'
  data?: string | Post | Post[] | ClientUser[] | ClientUser
}

export function isApiResponse(data: unknown): data is ApiResponse {
  const apiResponse = data as ApiResponse

  return apiResponse.status === 'success' || apiResponse.status === 'error'
}
