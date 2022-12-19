import {ApiResponse} from '../../api/types/ApiResponse'
import {Post} from '../../api/types/Post'

interface SuccessAddPostApiResponse extends ApiResponse {
  status: 'success'
  data: Post
}

interface ErrorAddPostApiResponse extends ApiResponse {
  status: 'error'
  data: string
}

export type AddPostApiResponse = SuccessAddPostApiResponse | ErrorAddPostApiResponse

export function isSuccessAddPostApiResponse(
  response: AddPostApiResponse
  ): response is SuccessAddPostApiResponse {
    return response.status === 'success'
}
