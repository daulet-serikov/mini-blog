import {createEntityAdapter, EntityState, createSelector} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {configuration} from '../api/configuration'
import {Post} from '../api/types/Post'
import {User} from '../api/types/User'
import {isApiResponse} from '../api/types/ApiResponse'
import {RootState} from './store'
import {isSuccessUserApiResponse} from './SuccessUserApiResponse'
import {isSuccessUsersApiResponse} from './SuccessUsersApiResponse'
import {isSuccessPostsApiResponse} from './SuccessPostsApiResponse'

export const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.publicationDate.localeCompare(a.publicationDate)
})
const postsInitialState = postsAdapter.getInitialState()

export const usersAdapter = createEntityAdapter<Omit<User, 'password'>>({
  selectId: (user) => user.username
})
const usersInitialState = usersAdapter.getInitialState()

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: configuration.apiPrefix}),
  endpoints: builder => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => '/posts',
      transformResponse: (response) => {
        if (isApiResponse(response) && isSuccessPostsApiResponse(response)) {
          return postsAdapter.setAll(postsInitialState, response.data)
        }

        return postsInitialState
      }
    }),
    getUsers: builder.query<EntityState<Omit<User, 'password'>>, void>({
      query: () => '/users',
      transformResponse: (response) => {
        if (isApiResponse(response) && isSuccessUsersApiResponse(response)) {
          return usersAdapter.setAll(usersInitialState, response.data)
        }

        return usersInitialState
      }
    }),
    getUser: builder.query<string | undefined, void>({
      query: () => '/user',
      transformResponse(response) {
        if (isApiResponse(response) && isSuccessUserApiResponse(response)) {
          return response.data
        }

        return undefined
      }
    })
  })
})

export const {
  useGetPostsQuery,
  useGetUsersQuery,
  useGetUserQuery
} = apiSlice

export const {
  selectById: selectPostById,
  selectIds: selectPostIds,
  selectAll: selectAllPosts
} = postsAdapter.getSelectors<RootState>(state => {
  return apiSlice.endpoints.getPosts.select()(state).data ?? postsInitialState
})

export const {
  selectById: selectUserById
} = usersAdapter.getSelectors<RootState>(state => {
  return apiSlice.endpoints.getUsers.select()(state).data ?? usersInitialState
})

export const selectPostIdsByUser = createSelector(
  [selectAllPosts, selectUserById],
  (posts, author) => {
    if (!author) {
      return []
    }

    const postsFiltered = posts.filter(post => post.author === author.username)
    return postsFiltered.map(post => post.id)
  }
)
