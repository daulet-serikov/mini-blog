import {createEntityAdapter, EntityState} from '@reduxjs/toolkit'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {configuration} from '../../../server/configuration'
import {Post} from '../../../types/Post'

const postsAdapter = createEntityAdapter<Post>()

const postsInitialState = postsAdapter.getInitialState()

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: configuration.apiPrefix}),
  endpoints: builder => ({
    getPosts: builder.query<EntityState<Post>, void>({
      query: () => '/posts',
      transformResponse: (response) => {
        return postsAdapter.setAll(postsInitialState, response as Post[])
      }
    })
  })
})

apiSlice.endpoints.getPosts.select

export const {useGetPostsQuery} = apiSlice
