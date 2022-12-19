import {ApiResponse} from '../../api/types/ApiResponse'
import {Post} from '../../api/types/Post'

interface SuccessPostsApiResponse extends ApiResponse {
  data: Post[]
}

export function isSuccessPostsApiResponse(
  response: ApiResponse
  ): response is SuccessPostsApiResponse {
    return response.status === 'success'
}
