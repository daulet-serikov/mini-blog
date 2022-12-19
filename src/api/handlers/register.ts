import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {RegisterFormValue} from '../../modules/register/RegisterFormValue'
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
      const validatedFormValue = validate(formValue)
      const user = await _register(validatedFormValue)

      sessionStorage.setItem('username', user.username)

      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'success', data: user})
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

function validate(formValue: Partial<RegisterFormValue>) {
  const schema = Yup.object({
    username: Yup.string().trim().min(5).max(15).matches(/^\w+$/),
    password: Yup.string().min(5).max(15),
    firstName: Yup.string().trim().min(3).max(20),
    lastName: Yup.string().trim().min(3).max(20)
  })

  try {
    schema.validateSync(formValue)
    formValue = schema.cast(formValue)
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

  return database.addUser(formValue)
}
