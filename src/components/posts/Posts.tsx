import {useGetPostsQuery} from '../../store/slices/api/apiSlice'

export const Posts = () => {
  let {data: posts} = useGetPostsQuery()


  return (
    <>
      {posts?.map(post => <p>{post.content}</p>)}
    </>
  )
}
