// TODO rename file
export interface ApiResponse {
  status: 'success' | 'error'
  data?: string // TODO improve?
}

export function isApiResponse(data: unknown): data is ApiResponse {
  const apiResponse = data as ApiResponse
  const statusCondition = apiResponse.status === 'success' || apiResponse.status === 'error'
  const dataCondition = typeof apiResponse.data === 'string' || typeof apiResponse.data === 'undefined'

  if (statusCondition && dataCondition) {
    return true
  }

  return false
}
