import {Col, Row, Button, Space} from 'antd'
import {Link} from 'react-router-dom'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useAppDispatch} from '../../store/hooks'
import {useGetCurrentUserQuery} from '../../store/slices/api/apiSlice'

export function Header() {
  const dispatch = useAppDispatch()
  const {data: currentUser} = useGetCurrentUserQuery()

  let buttons = (
    <>
      <Button type='primary' onClick={() => dispatch(modalToggled('login'))}>Log in</Button>
      <Button onClick={() => dispatch(modalToggled('register'))}>Register</Button>
    </>
  )

  if (currentUser) {
    buttons = (
      <>
        <Button type='primary' onClick={() => dispatch(modalToggled('addPost'))}>Create post</Button>
        <Button>My posts</Button>
      </>
    )
  }

  return (
    <Row>
      <Col span={12}>
        <Link to='/' style={{fontSize: '18px'}}>
          Mini Blog
        </Link>
      </Col>
      <Col span={12}>
        <Row justify='end'>
          <Col>
            <Space>
              {buttons}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
