import {selectPostIds, useGetPostsQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../Post/Post'
import {Space, Skeleton, Typography} from 'antd'
import {useParams} from 'react-router-dom'

export const Profile = () => {
  const {isSuccess, isLoading} = useGetPostsQuery()
  const postIds = useAppSelector(selectPostIds)
  const {userId} = useParams()

  let content = (
    <>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
    </>
  )

  if (isSuccess && !isLoading) {
    content = (
      <>
        <Typography.Title>{`${userId}'s posts`}</Typography.Title>
        <Space direction='vertical'>
          {postIds.map(id => <Post key={id} id={id} />)}
        </Space>
      </>
    )
  }

  return content
}
