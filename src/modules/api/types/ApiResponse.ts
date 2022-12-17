export interface ApiResponse {
  status: 'success' | 'error'
  data?: any
}

export function isApiResponse(data: unknown): data is ApiResponse {
  const apiResponse = data as ApiResponse

  if (apiResponse.status === 'success' || apiResponse.status === 'error') {
    return true
  }

  return false
}
