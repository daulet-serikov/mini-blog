import {Button, Input, Modal} from 'antd'
import {useAppSelector, useAppDispatch} from '../../store/hooks'
import styles from './RegisterModal.module.css'
import {modalToggled} from '../../store/slices/modalsSlice'

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
      nothing
    </Modal>
  )
}
