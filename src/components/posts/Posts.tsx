import {selectPostIds, useGetPostsQuery} from '../../store/slices/api/apiSlice'
import {useAppSelector} from '../../store/hooks'
import {Post} from '../Post/Post'


export const Posts = () => {
  const {isSuccess, isLoading} = useGetPostsQuery()
  const postIds = useAppSelector(selectPostIds)

  let content = <p>Loading...</p>

  if (isSuccess && !isLoading) {
    content = (
      <>
        {postIds.map(id => <Post key={id} id={id} />)}
      </>
    )
  }

  return (
    <>{content}</>
  )
}
