import {ApiUser as _User} from '../api/types/User'

export type User = Omit<_User, 'password'>
