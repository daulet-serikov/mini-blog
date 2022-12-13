import {Card} from 'antd'
import {selectPostById, selectUserById, useGetUsersQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {EntityId} from '@reduxjs/toolkit'

export function Post({id}: {id: EntityId}) {
  const post = useAppSelector(state => selectPostById(state, id))

  const {isSuccess, isLoading} = useGetUsersQuery()
  const authorId = post ? post.authorId : 0
  const user = useAppSelector(state => selectUserById(state, authorId))

  return (
    <Card title={post?.title} extra={<>by <a href='#'>{user?.name}</a></>}>
      <p>{post?.content}</p>
    </Card>
  )
}
