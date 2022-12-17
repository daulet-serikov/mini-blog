import {apiSlice, postsAdapter} from '../store/apiSlice'
import {AddPostApiResponse, isAddPostSuccessApiResponse} from './AddPostApiResponse'
import {AddPostFormValue} from './AddPostFormValue'

export const addPostApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addPost: builder.mutation<AddPostApiResponse, AddPostFormValue>({
      query: (data) => ({
        url: '/addPost',
        method: 'POST',
        body: data
      }),
      async onCacheEntryAdded(_, {dispatch, cacheDataLoaded}) {
        const cache = await cacheDataLoaded
        const response = cache.data

        if (isAddPostSuccessApiResponse(response)) {
          dispatch(
            apiSlice.util.updateQueryData('getPosts', undefined, draft => {
              postsAdapter.addOne(draft, response.data)
            })
          )
        }
      }
    })
  })
})

export const {useAddPostMutation} = addPostApiSlice
