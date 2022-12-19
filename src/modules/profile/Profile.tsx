import {useEffect} from 'react'
import {
  Space,
  Skeleton,
  Typography,
  Descriptions,
  Card,
  Button
} from 'antd'
import {LogoutOutlined} from '@ant-design/icons'
import {useParams, useNavigate} from 'react-router-dom'
import {
  useGetUsersQuery,
  useGetPostsQuery,
  useGetUserQuery,
  selectUserById,
  selectPostIdsByUser
} from '../../store/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../post/Post'
import {useLogoutMutation} from '../logout/logoutSlice'
import {Error} from '../error/Error'


export function Profile() {
  const {userId} = useParams()
  const navigate = useNavigate()

  const postIds = useAppSelector(state => selectPostIdsByUser(state, userId!))
  const user = useAppSelector(state => selectUserById(state, userId!))

  const {
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading
  } = useGetPostsQuery()

  const {
    isSuccess: isUsersSuccess,
    isLoading: isUsersLoading
  } = useGetUsersQuery()

  const {
    data: currentUser,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading
  } = useGetUserQuery()

  const [logout, {isLoading: isLogoutLoading}] = useLogoutMutation()

  useEffect(() => {
    if (user) {
      document.title = `${user.firstName} ${user.lastName} - Mini Blog`
    } else {
      document.title = 'Mini Blog'
    }
  }, [user])

  const isDataLoaded = !isPostsLoading && !isUsersLoading && !isUserLoading
    && isPostsSuccess && isUsersSuccess && isUserSuccess

  let content = (
    <>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 0}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
    </>
  )

  if (isDataLoaded) {
    if (!user) {
      content = <Error text='The user was not found' />
    } else {
      const isCurrentUserProfile = currentUser === user.username
      const postsTitle = isCurrentUserProfile ? 'My posts' : `${user.firstName}'s posts`

      const extra = isCurrentUserProfile ? (
        <Button
          danger
          type='text'
          icon={<LogoutOutlined />}
          onClick={() => {
            if (!isLogoutLoading) {
              logout()
              navigate('/')
            }
          }}
        >
          Log out
        </Button>
      ) : null

      content = (
        <Space direction='vertical'>
          <Card title='User Info' extra={extra}>
            <Descriptions>
              <Descriptions.Item label='Username'>{user.username}</Descriptions.Item>
              <Descriptions.Item label='First Name'>{user.firstName}</Descriptions.Item>
              <Descriptions.Item label='Last Name'>{user.lastName}</Descriptions.Item>
            </Descriptions>
          </Card>
          <Typography.Title>{postsTitle}</Typography.Title>
          <Space direction='vertical' style={{display: 'flex'}}>
            {postIds.map(id => <Post key={id} id={id} showAuthor={false} />)}
          </Space>
        </Space>
      )
    }
  }

  return content
}
