import {Link} from 'react-router-dom'
import {Card, Typography} from 'antd'
import {EntityId} from '@reduxjs/toolkit'
import {selectPostById, selectUserById, useGetUserQuery} from '../../store/apiSlice'
import {useAppSelector} from '../../store/hooks'

const {Paragraph} = Typography

export function Post({id, showAuthor = true}: {id: EntityId, showAuthor?: boolean}) {
  const post = useAppSelector(state => selectPostById(state, id))
  const user = useAppSelector(state => selectUserById(state, post!.author))
  const {data: currentUser} = useGetUserQuery()

  const author = currentUser === user!.username ? 'Me' : user!.firstName

  const extra = showAuthor
    ? <>by <Link to={`/${user!.username}`}>{author}</Link></>
    : null

  return (
    <Card title={post!.title} extra={extra}>
      <Paragraph style={{fontStyle: 'italic'}}>
        {new Date(post!.publicationDate).toLocaleDateString()}
      </Paragraph>
      <Paragraph>{post!.content}</Paragraph>
    </Card>
  )
}
