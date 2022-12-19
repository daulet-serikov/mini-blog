import {Button, Form, Input, Modal, Alert} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {useState} from 'react'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/modalsSlice'
import {LoginFormValue} from './LoginFormValue'
import {useLoginMutation} from './loginSlice'
import {isSuccessLoginApiResponse} from './LoginApiResponse'

export function LoginModal() {
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [form] = Form.useForm()

  const isModalOpened = useAppSelector(state => state.modals.login)
  const dispatch = useAppDispatch()

  const [login, {isLoading: isLoginLoading}] = useLoginMutation()

  const onSubmit = async (values: LoginFormValue) => {
    const response = await login(values).unwrap()

    if (isSuccessLoginApiResponse(response)) {
      dispatch(modalToggled('login'))
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
      onCancel={() => dispatch(modalToggled('login'))}
      title='Log in'
      footer={[
        <Button key='submit' type='primary' onClick={form.submit} loading={isLoginLoading}>
          Submit
        </Button>
      ]}
    >
      {showError && <Alert type='error' description={errorText} />}
      <Form
        name='login'
        onFinish={onSubmit}
        onFinishFailed={onValidationFailed}
        style={{marginTop: 20}}
        form={form}
        validateTrigger={validateTrigger}
        disabled={isLoginLoading}
      >
        <Form.Item
          name='username'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 5, message: 'The minimum length is 5 characters'},
            {max: 15, message: 'The maximum length is 15 characters'},
            {pattern: /^\w+$/, message: 'The field contains invalid characters'}
          ]}
          normalize={value => value.trim()}
        >
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Name' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 5, message: 'The minimum length is 5 characters'},
            {max: 15, message: 'The maximum length is 15 characters'}
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type='password'
            placeholder='Password'
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
