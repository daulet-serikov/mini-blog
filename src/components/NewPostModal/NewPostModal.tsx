import {Button, Form, Input, Modal} from 'antd'
import styles from './NewPostModal.module.css'
const {TextArea} = Input

export function NewPostModal() {
  const [form] = Form.useForm()

  const onSubmit = () => {
    console.log('submitted')
  }

  return (
    <Modal open={false} title='New post' footer={[
      <Button key='submit' type='primary' onClick={form.submit}>
        Submit
      </Button>
    ]}>
      <Form
        name='new-post'
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
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
