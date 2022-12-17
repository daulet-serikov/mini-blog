import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {RegisterFormValue} from '../../register/RegisterFormValue'
import {ApiResponse} from '../types/ApiResponse'

export const register = rest.post(
  `${configuration.apiPrefix}/register`,
  async (request, response, context) => {
    if (sessionStorage.getItem('username')) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'error', data: 'You are logged in'})
      )
    }

    const formValue = await request.json<Partial<RegisterFormValue>>()

    try {
      const user = await validate(formValue)
      await _register(user)

      sessionStorage.setItem('username', user.username)

      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'success'})
      )
    } catch (error) {
      if (error instanceof Error) {
        return response(
          context.delay(configuration.delay),
          context.json<ApiResponse>({status: 'error', data: error.message})
        )
      }
    }
  }
)

async function validate(formValue: Partial<RegisterFormValue>) {
  try {
    await Yup.string().trim().min(5).max(15).matches(/^\w+$/).validate(formValue.username)
    await Yup.string().min(5).max(15).validate(formValue.password)
    await Yup.string().trim().min(3).max(20).validate(formValue.firstName)
    await Yup.string().trim().min(3).max(20).validate(formValue.lastName)
  } catch {
    throw new Error('The provided data is invalid')
  }

  return formValue as RegisterFormValue
}

async function _register(formValue: RegisterFormValue) {
  const user = await database.getUser(formValue.username)

  if (user) {
    throw new Error('The username is taken')
  }

  await database.addUser(formValue)
}
