import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Form, Input, Modal, Alert} from 'antd'
import styles from './LoginModal.module.css'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useState} from 'react'
import {LoginCredential} from '../../types/LoginCredential'
import {useLoginMutation} from '../../store/slices/api/apiSlice'

export function LoginModal() {
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [form] = Form.useForm()
  const open = useAppSelector(state => state.modals.login)
  const dispatch = useAppDispatch()
  const [login, {isLoading}] = useLoginMutation()

  const onSubmit = async (values: LoginCredential) => {
    const result = await login(values).unwrap()

    if (result.status === 'error') {
      setErrorText(result.data ?? '')
      setShowError(true)
    } else {
      dispatch(modalToggled('login'))
      form.resetFields()
      setShowError(false)
    }
  }

  const onValidationFailed = () => {
    if (validateTrigger !== 'onChange') {
      setValidateTrigger('onChange')
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => dispatch(modalToggled('login'))}
      title='Log in'
      footer={[
        <Button key='submit' type='primary' onClick={form.submit} loading={isLoading}>
          Submit
        </Button>
    ]}>
      {showError && <Alert type='error' description={errorText} />}
      <Form
        name='login'
        onFinish={onSubmit}
        onFinishFailed={onValidationFailed}
        className={styles.form}
        form={form}
        validateTrigger={validateTrigger}
        disabled={isLoading}
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
