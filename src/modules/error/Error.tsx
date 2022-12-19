import {
  Typography,
  Empty
} from 'antd'
import {Link} from 'react-router-dom'
import styles from './Error.module.css'

export function Error({text = 'Something is wrong'}) {
  return (
    <Empty className={styles.empty} description={
      <Typography.Paragraph>
        {text}<br /><Link to='/'>Go home</Link>
      </Typography.Paragraph>
    } />
  )
}
