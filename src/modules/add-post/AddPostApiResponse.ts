import {ApiResponse} from '../api/types/ApiResponse'
import {Post} from '../api/types/Post'

interface AddPostSuccessApiResponse extends ApiResponse {
  status: 'success'
  data: Post
}

interface AddPostErrorApiResponse extends ApiResponse {
  status: 'error'
  data: string
}

export type AddPostApiResponse = AddPostSuccessApiResponse | AddPostErrorApiResponse

export function isAddPostSuccessApiResponse(
  response: AddPostApiResponse
  ): response is AddPostSuccessApiResponse {
    return response.status === 'success'
}
