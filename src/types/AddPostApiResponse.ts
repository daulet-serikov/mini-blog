import {Post} from './Post'

export interface AddPostApiResponse {
  status: 'success' | 'error'
  data?: Post | string // TODO improve
}
