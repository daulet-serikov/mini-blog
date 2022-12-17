import {Card, Typography} from 'antd'
import {selectPostById, selectUserById, useGetUsersQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {EntityId} from '@reduxjs/toolkit'
import {Link} from 'react-router-dom'

export function Post({id, showAuthor = true}: {id: EntityId, showAuthor?: boolean}) {
  const post = useAppSelector(state => selectPostById(state, id))

  const {isSuccess, isLoading} = useGetUsersQuery()
  const author = post ? post.author : 0
  const user = useAppSelector(state => selectUserById(state, author))

  const extra = showAuthor
    ? <>by <Link to={`/${user?.username ?? ''}`}>{user?.firstName}</Link></>
    : null

  return (
    <Card title={post?.title} extra={extra}>
      <Typography.Paragraph style={{fontStyle: 'italic'}}>{new Date(post?.publicationDate ?? '').toLocaleDateString()}</Typography.Paragraph>
      <Typography.Paragraph>{post?.content}</Typography.Paragraph>
    </Card>
  )
}
