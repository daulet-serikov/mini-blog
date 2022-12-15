import {Col, Row, Button, Space, Dropdown, MenuProps} from 'antd'
import {DownOutlined, UserOutlined} from '@ant-design/icons'
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

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      )
    }
  ]

  if (currentUser) {
    /* TODO: place closing angle braces at the new line*/
    buttons = (
      <Dropdown.Button
        onClick={() => dispatch(modalToggled('addPost'))}
        type='primary'
        icon={<UserOutlined />}
        trigger={['click']}
        dropdownRender={() => (
          <Space style={{padding: 8}}>
            <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
              2nd menu item (disabled)
            </a>
            <Button type='link' onClick={() => dispatch(modalToggled('addPost'))}>Click me!</Button>
          </Space>
        )}
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
