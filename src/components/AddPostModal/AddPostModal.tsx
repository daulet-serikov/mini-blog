import {Button, Form, Input, Modal, Alert} from 'antd'
import styles from './AddPostModal.module.css'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useState} from 'react'
import {useAddPostMutation} from '../../store/slices/api/apiSlice'

// TODO move somewhere?
export interface PostFields {
  title: string
  content: string
}

export function AddPostModal() {
  const [form] = Form.useForm()
  const open = useAppSelector(state => state.modals.addPost)
  const dispatch = useAppDispatch()
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [addPost, {isLoading}] = useAddPostMutation() // TODO rename isLoading

  const onSubmit = async (values: PostFields) => {
    const result = await addPost(values).unwrap()

    if (result.status === 'error') {
      setErrorText(typeof result.data === 'string' ? result.data! : '') // TODO improve
      setShowError(true)
    } else {
      dispatch(modalToggled('addPost'))
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
    <Modal open={open} onCancel={() => dispatch(modalToggled('addPost'))} title='New post' footer={[
      <Button key='submit' type='primary' onClick={form.submit} loading={isLoading}>
        Submit
      </Button>
    ]}>
      {showError && <Alert type='error' description={errorText} />}
      <Form
        name='addPost'
        onFinish={onSubmit}
        className={styles.form}
        form={form}
        layout='vertical'
        disabled={isLoading}
        validateTrigger={validateTrigger}
        onFinishFailed={onValidationFailed}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 10, message: 'The minimum length is 10 characters'},
            {max: 50, message: 'The maximum length is 50 characters'}
          ]}
          normalize={value => value.trim()}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Content'
          name='content'
          rules={[
            {required: true, message: 'The field cannot be empty'},
            {min: 10, message: 'The minimum length is 10 characters'},
            {max: 300, message: 'The maximum length is 300 characters'}
          ]}
          normalize={value => value.trim()}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
