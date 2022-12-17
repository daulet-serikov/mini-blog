import {Post} from './Post'
import {User} from './User'

export interface ApiResponse {
  status: 'success' | 'error'
  data?: string | Post | Post[] | Omit<User, 'password'>[]
}

export function isApiResponse(data: unknown): data is ApiResponse {
  const apiResponse = data as ApiResponse

  return apiResponse.status === 'success' || apiResponse.status === 'error'
}
