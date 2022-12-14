import {Card, Typography} from 'antd'
import {selectPostById, selectUserById, useGetUsersQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {EntityId} from '@reduxjs/toolkit'
import {Link} from 'react-router-dom'

export function Post({id}: {id: EntityId}) {
  const post = useAppSelector(state => selectPostById(state, id))

  const {isSuccess, isLoading} = useGetUsersQuery()
  const author = post ? post.author : 0
  const user = useAppSelector(state => selectUserById(state, author))

  return (
    <Card title={post?.title} extra={<>by <Link to={`/${user?.name ?? ''}`}>{user?.name}</Link></>}>
      <Typography.Paragraph>{post?.content}</Typography.Paragraph>
    </Card>
  )
}
