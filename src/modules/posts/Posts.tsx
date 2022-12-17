import {selectPostIds, useGetPostsQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../Post/Post'
import {Space, Skeleton} from 'antd'

export const Posts = () => {
  const {isSuccess, isLoading} = useGetPostsQuery()
  const postIds = useAppSelector(selectPostIds)

  let content = (
    <>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
      <Skeleton active paragraph={{rows: 4}}/>
    </>
  )

  if (isSuccess && !isLoading) {
    content = (
      <Space direction='vertical'>
        {postIds.map(id => <Post key={id} id={id} />)}
      </Space>
    )
  }

  return content
}
