import {User as UserPost} from '../server/types/User'

export interface User extends UserPost {
  id: number
}
