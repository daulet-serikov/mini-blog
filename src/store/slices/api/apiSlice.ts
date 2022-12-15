import {createEntityAdapter, EntityState, createSelector} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {configuration} from '../../../server/configuration'
import {Post} from '../../../types/Post'
import {User} from '../../../types/User'
import {RootState} from '../../store'
import {LoginCredential} from '../../../types/LoginCredential'
import {ApiResponse, isApiResponse} from '../../../types/Response'

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.publicationDate.localeCompare(a.publicationDate)
})
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.username
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
    }),
    getCurrentUser: builder.query<string | null, void>({
      query: () => '/currentUser',
      transformResponse(response) {
        if (isApiResponse(response) && response.status === 'success') {
          return response.data || null
        }

        return null
      }
    }),
    login: builder.mutation<ApiResponse, LoginCredential>({
      query: (credential) => ({
        url: '/login',
        method: 'POST',
        body: credential
      }),
      async onCacheEntryAdded({username}, {dispatch, cacheDataLoaded}) {
        const cache = await cacheDataLoaded
        if (cache.data.status === 'success') {
          dispatch(apiSlice.util.upsertQueryData('getCurrentUser', undefined, username))
        }
      }
    })
  })
})

export const {useGetPostsQuery, useGetUsersQuery, useLoginMutation, useGetCurrentUserQuery} = apiSlice

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

    const postsFiltered = posts.filter(post => post.author === author.username)
    return postsFiltered.map(post => post.id)
  }
)
