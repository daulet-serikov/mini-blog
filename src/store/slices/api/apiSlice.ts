import {createEntityAdapter, EntityState, createSelector} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {configuration} from '../../../server/configuration'
import {Post} from '../../../types/Post'
import {User} from '../../../types/User'
import {RootState} from '../../store'

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.publicationDate.localeCompare(a.publicationDate)
})
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.name
})

const postsInitialState = postsAdapter.getInitialState()
const usersInitialState = usersAdapter.getInitialState()

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: configuration.apiPrefix}),
  endpoints: builder => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => '/posts',
      transformResponse: (response) => {
        return postsAdapter.setAll(postsInitialState, response as Post[])
      }
    }),
    getUsers: builder.query<EntityState<User>, void>({
      query: () => '/users',
      transformResponse: (response) => {
        return usersAdapter.setAll(usersInitialState, response as User[])
      }
    })
    /*getPost: builder.query<Post, number>({
      async queryFn(id, _api, _extraOptions, baseQuery) {
        const query = await baseQuery('/posts')
        const posts = query.data as Post[]
        return {data: posts[id]}
      }
    })*/
  })
})

export const {useGetPostsQuery, useGetUsersQuery} = apiSlice

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectAll: selectAllPosts
} = postsAdapter.getSelectors<RootState>(state => {
  return apiSlice.endpoints.getPosts.select()(state).data ?? postsInitialState
})

export const {
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors<RootState>(state => {
  return apiSlice.endpoints.getUsers.select()(state).data ?? usersInitialState
})

export const selectPostIdsByUser = createSelector(
  [selectAllPosts, selectUserById],
  (posts, author) => {
    if (!author) return []

    const postsFiltered = posts.filter(post => post.author === author.name)
    return postsFiltered.map(post => post.id)
  }
)
