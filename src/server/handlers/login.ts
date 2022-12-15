import {rest} from 'msw'
import {LoginCredential} from '../../types/LoginCredential'
import {configuration} from '../configuration'
import * as Yup from 'yup'
import {getUser} from '../database'

export const login = rest.post(`${configuration.apiPrefix}/login`, async (request, response, context) => {
  const credential = await request.json<LoginCredential>()

  try {
    await validate(credential)
    await authenticate(credential)
  } catch (error) {
    // TODO: simplify
    if (error instanceof Yup.ValidationError) {
      return response(
        context.delay(configuration.delay),
        context.json({status: 'error', data: 'The provided data is invalid'})
      )
    } else if (error instanceof Error) {
      return response(
        context.delay(configuration.delay),
        context.json({status: 'error', data: error.message})
      )
    }
  }

  sessionStorage.setItem('username', credential.username)

  return response(
    context.delay(configuration.delay),
    context.json({status: 'success'})
  )
})


async function validate(data: LoginCredential) {
  // TODO: get rid of variables
  // TODO: mark username as optional? check reg as well
  const username = data.username?.trim()
  const password = data.password

  if (!username || !password) {
    throw new Error('The provided data is invalid')
  }

  await Yup.string().trim().min(5).max(15).matches(/^\w+$/).validate(username)
  await Yup.string().min(5).max(15).validate(password)
}

async function authenticate(data: LoginCredential) {
  if (sessionStorage.getItem('username')) {
    throw new Error('You have already been logged in')
  }

  const user = await getUser(data.username)

  if (!user || user.password !== data.password) {
    throw new Error('The provided data is incorrect')
  }
}
