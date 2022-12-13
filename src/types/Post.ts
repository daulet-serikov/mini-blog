import {Post as ServerPost} from '../server/types/Post'

export interface Post extends ServerPost {
  id: number
}
