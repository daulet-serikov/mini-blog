import {Layout as AntLayout} from 'antd'
import {Outlet} from 'react-router-dom'
import styles from './Layout.module.css'
import {Header} from './Header'

const {Header: AntHeader, Footer, Content} = AntLayout

export function Layout() {
  return (
    <AntLayout>
      <AntHeader>
        <Header />
      </AntHeader>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        The purpose of this application is to demonstrate <a href='https://www.linkedin.com/in/daulet-serikov/'>Daulet</a>'s skills. The source code and details can be found <a href='https://github.com/dauletserikov/mini-blog'>here</a>.
      </Footer>
    </AntLayout>
  )
}
