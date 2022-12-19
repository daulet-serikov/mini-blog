import {Button, Form, Input, Modal, Alert} from 'antd'
import {useState} from 'react'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/modalsSlice'
import {isSuccessAddPostApiResponse} from './AddPostApiResponse'
import {AddPostFormValue} from './AddPostFormValue'
import {useAddPostMutation} from './addPostSlice'

export function AddPostModal() {
  const [validateTrigger, setValidateTrigger] = useState('onFinish')
  const [showError, setShowError] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [form] = Form.useForm()

  const isModalOpened = useAppSelector(state => state.modals.addPost)
  const dispatch = useAppDispatch()

  const [addPost, {isLoading: isAddPostLoading}] = useAddPostMutation()

  const onSubmit = async (values: AddPostFormValue) => {
    const response = await addPost(values).unwrap()

    if (isSuccessAddPostApiResponse(response)) {
      dispatch(modalToggled('addPost'))
      form.resetFields()
      setShowError(false)
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
      onCancel={() => dispatch(modalToggled('addPost'))}
      title='New post'
      footer={[
        <Button key='submit' type='primary' onClick={form.submit} loading={isAddPostLoading}>
          Submit
        </Button>
      ]}
    >
      {showError && <Alert type='error' description={errorText} />}
      <Form
        name='addPost'
        onFinish={onSubmit}
        style={{marginTop: 20}}
        form={form}
        layout='vertical'
        disabled={isAddPostLoading}
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
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
