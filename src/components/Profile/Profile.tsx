import {
  useGetUsersQuery,
  useGetPostsQuery,
  selectUserById,
  selectPostIdsByUser
} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../Post/Post'
import {Space, Skeleton, Typography, Empty} from 'antd'
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
    if (!user && !postIds) {
      content = (
        <Empty className={styles.empty} description={
          <Typography.Paragraph>
            The user was not found.<br /><Link to='/'>Go home</Link>
          </Typography.Paragraph>
        } />
      )
    } else {
      content = (
        <>
          <Typography.Title>{`${userId}'s posts`}</Typography.Title>
          <Space direction='vertical'>
            {postIds.map(id => <Post key={id} id={id} />)}
          </Space>
        </>
      )
    }
  }

  return content
}
