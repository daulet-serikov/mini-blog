import {Col, Row, Button, Space, Dropdown, MenuProps} from 'antd'
import {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {Link, useNavigate} from 'react-router-dom'
import {modalToggled} from '../store/modalsSlice'
import {useAppDispatch} from '../store/hooks'
import {useGetUserQuery} from '../store/apiSlice'
import {useLogoutMutation} from '../logout/logoutSlice'

export function Header() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess
  } = useGetUserQuery()
  const [logout, {isLoading: isLogoutLoading}] = useLogoutMutation()

  let buttons = (
    <Button type='primary' loading>Loading</Button>
  )

  const items: MenuProps['items'] = [
    {
      label: 'My profile',
      key: '1',
      icon: <UserOutlined />,
      onClick: () => {
        navigate(`/${user}`)
      }
    },
    {
      label: 'Log out',
      key: '2',
      danger: true,
      icon: <LogoutOutlined />,
      onClick: () => {
        if (!isLogoutLoading) {
          logout()
          navigate('/')
        }
      }
    }
  ]

  if (!isUserLoading && isUserSuccess) {
    if (user) {
      buttons = (
        <Dropdown.Button
          onClick={() => dispatch(modalToggled('addPost'))}
          type='primary'
          trigger={['click']}
          menu={{items}}
        >
          Create post
        </Dropdown.Button>
      )
    } else {
      buttons = (
        <>
          <Button
            type='primary'
            onClick={() => dispatch(modalToggled('login'))}
          >
            Log in
          </Button>
          <Button onClick={() => dispatch(modalToggled('register'))}>
            Register
          </Button>
        </>
      )
    }
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
