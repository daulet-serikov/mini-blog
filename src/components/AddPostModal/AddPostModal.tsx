import {Button, Form, Input, Modal} from 'antd'
import styles from './AddPostModal.module.css'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useState} from 'react'

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

  const onSubmit = () => {
    console.log('submitted')
  }

  return (
    <Modal open={open} onCancel={() => dispatch(modalToggled('addPost'))} title='New post' footer={[
      <Button key='submit' type='primary' onClick={form.submit}>
        Submit
      </Button>
    ]}>
      <Form
        name='addPost'
        onFinish={onSubmit}
        className={styles.form}
        form={form}
        layout='vertical'
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{required: true, message: 'Please provide the title'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Content'
          name='content'
          rules={[{required: true, message: 'Please provide some content'}]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
