import {Button, Input, Modal, Form, Alert} from 'antd'
import {useState} from 'react'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/modalsSlice'
import {isSuccessRegisterApiResponse} from './RegisterApiResponse'
import {RegisterFormValue} from './RegisterFormValue'
import {useRegisterMutation} from './registerSlice'

export function RegisterModal() {
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [form] = Form.useForm()

  const isModalOpened = useAppSelector(state => state.modals.register)
  const dispatch = useAppDispatch()

  const [register, {isLoading: isRegisterLoading}] = useRegisterMutation()

  const onSubmit = async (values: RegisterFormValue) => {
    const response = await register(values).unwrap()

    if (isSuccessRegisterApiResponse(response)) {
      dispatch(modalToggled('register'))
      form.resetFields()
      setShowError(false)
      setErrorText('')
    } else {
      setErrorText(response.data)
      setShowError(true)
    }
  }

  const onValidationFailed = () => {
    if (validateTrigger !== 'onChange') {
      setValidateTrigger('onChange')
    }
  }

  return (
    <Modal
      open={isModalOpened}
      onCancel={() => dispatch(modalToggled('register'))}
      title='Register'
      footer={[
        <Button key='submit' type='primary' onClick={form.submit} loading={isRegisterLoading}>
          Submit
        </Button>
      ]}
    >
      {showError && <Alert type='error' description={errorText} />}
      <Form
        form={form}
        name='register'
        onFinish={onSubmit}
        labelCol={{span: 5}}
        wrapperCol={{span: 19}}
        validateTrigger={validateTrigger}
        onFinishFailed={onValidationFailed}
        style={{marginTop: 20}}
        disabled={isRegisterLoading}
      >
        <Form.Item
          name='username'
          label='Username'
          normalize={value => value.trim()}
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 5, message: 'The minimum length is 5 characters'},
            {max: 15, message: 'The maximum length is 15 characters'},
            {pattern: /^\w+$/, message: 'The field contains invalid characters'}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 5, message: 'The minimum length is 5 characters'},
            {max: 15, message: 'The maximum length is 15 characters'}
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          name='firstName'
          label='First name'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 3, message: 'The minimum length is 3 characters'},
            {max: 20, message: 'The maximum length is 20 characters'}
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='lastName'
          label='Last name'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 3, message: 'The minimum length is 3 characters'},
            {max: 20, message: 'The maximum length is 20 characters'}
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
