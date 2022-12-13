import {Layout as AntLayout} from 'antd'
import {Outlet} from 'react-router-dom'
import {Col, Row} from 'antd'
const {Header, Footer, Content} = AntLayout

export function Layout() {
  return (
    <AntLayout>
      <Header>Header</Header>
      <Content>
        <Row justify='center'>
          <Col span={20}>
            <Outlet />
          </Col>
        </Row>
      </Content>
      <Footer>Footer</Footer>
    </AntLayout>
  )
}
