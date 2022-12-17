import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {LoginFormValue} from '../types/LoginFormValue'
import {ApiResponse} from '../types/ApiResponse'

export const login = rest.post(
  `${configuration.apiPrefix}/login`,
  async (request, response, context) => {
    if (sessionStorage.getItem('username')) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'error', data: 'You have already been logged in'})
      )
    }

    const formValue = await request.json<LoginFormValue>()

    try {
      const validatedFormValue = await validate(formValue)

      await authenticate(validatedFormValue)

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


async function validate(formValue: LoginFormValue) {
  try {
    await Yup.string().trim().min(5).max(15).matches(/^\w+$/).validate(formValue.username)
    await Yup.string().min(5).max(15).validate(formValue.password)
  } catch {
    throw new Error('The provided data is invalid')
  }

  return formValue as Required<LoginFormValue>
}

async function authenticate(formValue: Required<LoginFormValue>) {
  const user = await database.getUser(formValue.username)

  if (!user || user.password !== formValue.password) {
    throw new Error('The provided data is incorrect')
  }

  sessionStorage.setItem('username', formValue.username)
}
