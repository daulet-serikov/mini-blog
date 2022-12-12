import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {config} from '../../../server/config'
import {Post} from '../../../types/Post'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: config.apiPrefix}),
  endpoints: builder => ({
    getPosts: builder.query<Post[], void>({
      query: () => '/posts'
    })
  })
})

export const {useGetPostsQuery} = apiSlice
