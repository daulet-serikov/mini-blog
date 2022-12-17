import {Col, Row, Button, Space, Dropdown, MenuProps} from 'antd'
import {Link} from 'react-router-dom'
import {modalToggled} from '../../store/slices/modalsSlice'
import {useAppDispatch} from '../../store/hooks'
import {useGetCurrentUserQuery} from '../../store/slices/api/apiSlice'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'

export function Header() {
  const dispatch = useAppDispatch()
  const {data: currentUser} = useGetCurrentUserQuery()

  let buttons = (
    <>
      <Button type='primary' onClick={() => dispatch(modalToggled('login'))}>Log in</Button>
      <Button onClick={() => dispatch(modalToggled('register'))}>Register</Button>
    </>
  )

  const items: MenuProps['items'] = [
    {
      label: 'My profile',
      key: '1',
      icon: <UserOutlined />
    },
    {
      label: 'Log out',
      key: '2',
      danger: true,
      icon: <LogoutOutlined />
    }
  ]

  const menuProps = {
    items,
    onClick: () => {console.log(1)}
  }

  if (currentUser) {
    /* TODO: place closing angle braces at the new line*/
    buttons = (
      <Dropdown.Button
        onClick={() => dispatch(modalToggled('addPost'))}
        type='primary'
        trigger={['click']}
        menu={menuProps}
      >
        Create post
      </Dropdown.Button>
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
