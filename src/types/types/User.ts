import {User as ClientUser} from '../User'

export interface User extends ClientUser {
  password: string
}
