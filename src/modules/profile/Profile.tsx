import {
  useGetUsersQuery,
  useGetPostsQuery,
  selectUserById,
  selectPostIdsByUser
} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../Post/Post'
import {Space, Skeleton, Typography, Empty, Descriptions, Card} from 'antd'
import {useParams, Link} from 'react-router-dom'
import styles from './Profile.module.css'

export const Profile = () => {
  const {userId} = useParams()
  const {isSuccess: isPostsSuccess, isLoading: isPostsLoading} = useGetPostsQuery()
  const {isSuccess: isUsersSuccess, isLoading: isUsersLoading} = useGetUsersQuery()
  const postIds = useAppSelector(state => selectPostIdsByUser(state, userId ?? ''))
  const user = useAppSelector(state => selectUserById(state, userId ?? ''))

  let content = (
    <>
      <Skeleton active paragraph={{rows: 1}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
    </>
  )

  if (isPostsSuccess && !isPostsLoading && isUsersSuccess && !isUsersLoading) {
    if (!user) {
      content = (
        <Empty className={styles.empty} description={
          <Typography.Paragraph>
            The user was not found.<br /><Link to='/'>Go home</Link>
          </Typography.Paragraph>
        } />
      )
    } else {
      content = (
        <Space direction='vertical'>
          <Card title='User Info'>
            <Descriptions>
              <Descriptions.Item label='Username'>{user.username}</Descriptions.Item>
              <Descriptions.Item label='First Name'>{user.firstName}</Descriptions.Item>
              <Descriptions.Item label='Last Name'>{user.lastName}</Descriptions.Item>
            </Descriptions>
          </Card>
          <Typography.Title>{`${user.firstName}'s posts`}</Typography.Title>
          <Space direction='vertical'>
            {postIds.map(id => <Post key={id} id={id} showAuthor={false} />)}
          </Space>
        </Space>
      )
    }
  }

  return content
}
