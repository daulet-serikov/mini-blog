import {Post as ServerPost} from './server/Post'

export interface Post extends ServerPost {
  id: number
}
