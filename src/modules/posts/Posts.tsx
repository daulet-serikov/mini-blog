import {Space, Skeleton} from 'antd'
import {selectPostIds, useGetPostsQuery, useGetUsersQuery} from '../store/apiSlice'
import {useAppSelector} from '../store/hooks'
import {Post} from '../post/Post'

export function Posts() {
  const {
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading
  } = useGetPostsQuery()

  const {
    isSuccess: isUsersSuccess,
    isLoading: isUsersLoading
  } = useGetUsersQuery()

  const postIds = useAppSelector(selectPostIds)

  const isDataLoaded = !isPostsLoading && !isUsersLoading && isPostsSuccess && isUsersSuccess

  let content = (
    <>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
    </>
  )

  if (isDataLoaded) {
    content = (
      <Space direction='vertical' style={{display: 'flex', marginTop: 8}}>
        {postIds.map(id => <Post key={id} id={id} />)}
      </Space>
    )
  }

  return content
}
