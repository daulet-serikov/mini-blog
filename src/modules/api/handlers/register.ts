import {rest} from 'msw'
import {User} from '../../types/server/User'
import {configuration} from '../configuration'
import * as Yup from 'yup'
import {getUser, addUser} from '../database'

export const register = rest.post(`${configuration.apiPrefix}/register`, async (request, response, context) => {
  const data = await request.json<User>()

  try {
    await validate(data)
    await _register(data)
  } catch (error) {
    if (error instanceof Error) {
      return response(
        context.delay(configuration.delay),
        context.json({status: 'error', data: error.message})
      )
    }
  }

  // TODO move to try
  sessionStorage.setItem('username', data.username)

  return response(
    context.delay(configuration.delay),
    context.json({status: 'success'})
  )
})


async function validate(data: User) {
  if (!data.username?.trim()
      || !data.password
      || !data.firstName?.trim()
      || !data.lastName?.trim()) {
    throw new Error('The provided data is invalid')
  }

  try {
    await Yup.string().trim().min(5).max(15).matches(/^\w+$/).validate(data.username)
    await Yup.string().min(5).max(15).validate(data.password)
    await Yup.string().trim().min(3).max(20).validate(data.firstName)
    await Yup.string().trim().min(3).max(20).validate(data.lastName)
  } catch {
    throw new Error('The provided data is invalid')
  }
}

async function _register(data: User) {
  if (sessionStorage.getItem('username')) {
    throw new Error('You are logged in')
  }

  const user = await getUser(data.username)

  if (user) {
    throw new Error('The username is taken')
  }

  await addUser(data)
}
