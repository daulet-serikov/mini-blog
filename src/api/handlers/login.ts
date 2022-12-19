import {rest} from 'msw'
import * as Yup from 'yup'
import {configuration} from '../configuration'
import * as database from '../database'
import {LoginFormValue} from '../../modules/login/LoginFormValue'
import {ApiResponse} from '../types/ApiResponse'

export const login = rest.post(
  `${configuration.apiPrefix}/login`,
  async (request, response, context) => {
    if (sessionStorage.getItem('username')) {
      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({
          status: 'error',
          data: 'You have already been logged in'
        })
      )
    }

    const formValue = await request.json<Partial<LoginFormValue>>()

    try {
      const credential = validate(formValue)

      await authenticate(credential)

      sessionStorage.setItem('username', credential.username)

      return response(
        context.delay(configuration.delay),
        context.json<ApiResponse>({status: 'success', data: credential.username})
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

function validate(formValue: Partial<LoginFormValue>) {
  const schema = Yup.object({
    username: Yup.string().trim().min(5).max(15).matches(/^\w+$/),
    password: Yup.string().min(5).max(15)
  })

  try {
    schema.validateSync(formValue)
    formValue = schema.cast(formValue)
  } catch {
    throw new Error('The provided data is invalid')
  }

  return formValue as LoginFormValue
}

async function authenticate(credential: LoginFormValue) {
  const user = await database.getUser(credential.username)

  if (!user || user.password !== credential.password) {
    throw new Error('The provided data is incorrect')
  }
}
