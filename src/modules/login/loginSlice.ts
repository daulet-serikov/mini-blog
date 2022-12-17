import {apiSlice, postsAdapter} from '../store/apiSlice'
import {AddPostApiResponse, isAddPostSuccessApiResponse} from './AddPostApiResponse'
import {AddPostFormValue} from './AddPostFormValue'

export const addPostApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ApiResponse, LoginCredential>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data
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

export const {useAddPostMutation} = addPostApiSlice
