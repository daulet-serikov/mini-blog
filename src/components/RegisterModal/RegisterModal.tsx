import {LockOutlined, UserOutlined} from '@ant-design/icons'
import {Button, Input, Modal} from 'antd'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import styles from './RegisterModal.module.css'
import {modalToggled} from '../../store/slices/modalsSlice'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

export function RegisterModal() {
  const open = useAppSelector(state => state.modals.register)
  const dispatch = useAppDispatch()

  const onSubmit = () => {
    console.log('not implemented')
  }

  return (
    <Modal
      open={open}
      onCancel={() => dispatch(modalToggled('register'))}
      title='Register'
      footer={[
        <Button key='submit' type='primary' onClick={onSubmit}>
          Submit
        </Button>
    ]}>
      <Formik
        initialValues={{
          username: '',
          password: '',
          firstName: '',
          lastName: ''
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .trim()
            .matches(/^\w+$/, 'Allowed characters a-zA-Z0-9_')
            .min(5, 'Must be 5 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          password: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          firstName: Yup.string()
            .trim()
            .min(5, 'Must be 5 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .trim()
            .min(5, 'Must be 5 characters or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required')
        })}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2))
        }}
      >
        <Form>
            <Field name='username' />
            <ErrorMessage name='username' component='div' />
            <Field name='password' />
            <ErrorMessage name='password' component='div' />
            <Field name='firstName' />
            <ErrorMessage name='firstName' component='div' />
            <Field name='lastName' />
            <ErrorMessage name='lastName' component='div' />
            <button type='submit'>
              Submit
            </button>
          </Form>
      </Formik>
    </Modal>
  )
}
