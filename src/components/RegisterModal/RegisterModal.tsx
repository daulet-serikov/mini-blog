import {Button, Input, Modal, Form, Alert} from 'antd'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import styles from './RegisterModal.module.css'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useState} from 'react'
import {useRegisterMutation} from '../../store/slices/api/apiSlice'
import {User} from '../../types/server/User'

export function RegisterModal() {
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const open = useAppSelector(state => state.modals.register)
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [register, {isLoading}] = useRegisterMutation()


  const onSubmit = async (values: User) => {
    const result = await register(values).unwrap()

    if (result.status === 'error') {
      setErrorText(result.data ?? '')
      setShowError(true)
    } else {
      dispatch(modalToggled('register'))
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
      onCancel={() => dispatch(modalToggled('register'))}
      title='Register'
      footer={[
        <Button key='submit' type='primary' onClick={form.submit} loading={isLoading}>
          Submit
        </Button>
    ]}>
      {showError && <Alert type='error' description={errorText} />}
      <Form
        form={form}
        name='register'
        onFinish={onSubmit}
        labelCol={{span: 5}}
        wrapperCol={{span: 19}}
        validateTrigger={validateTrigger}
        onFinishFailed={onValidationFailed}
        className={styles.form}
        disabled={isLoading}
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
          <Input
            type='password'
          />
        </Form.Item>
        <Form.Item
          name='firstName'
          label='First name'
          normalize={value => value.trim()}
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
          normalize={value => value.trim()}
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
