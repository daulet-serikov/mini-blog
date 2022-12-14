import {User as ClientUser} from '../../types/User'

export interface User extends ClientUser {
  password: string
}
