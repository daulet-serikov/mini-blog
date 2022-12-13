import {useGetPostsQuery} from '../../store/slices/api/apiSlice'

export const Posts = () => {
  let {data: posts} = useGetPostsQuery() // TODO getSelectors

  return (
    <>
      {posts?.ids.map(post => <p>{post}</p>)}
    </>
  )
}
