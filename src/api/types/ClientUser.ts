import {User} from './User'

export type ClientUser = Omit<User, 'password'>
