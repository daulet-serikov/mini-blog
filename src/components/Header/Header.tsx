import {Col, Row, Button, Space} from 'antd'
import {Link} from 'react-router-dom'
import styles from './Header.module.css'

export function Header() {

  let buttons = (
    <>
      <Button type='primary'>Log in</Button>
      <Button>Register</Button>
    </>
  )

  if (true) {
    buttons = (
      <>
        <Button type='primary'>Create post</Button>
        <Button>My profile</Button>
      </>
    )
  }

  return (
    <Row>
      <Col span={12}>
        <Link to='/' className={styles.projectName}>
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
