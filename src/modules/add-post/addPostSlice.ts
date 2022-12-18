import {apiSlice, postsAdapter} from '../store/apiSlice'
import {AddPostApiResponse, isSuccessAddPostApiResponse} from './AddPostApiResponse'
import {AddPostFormValue} from './AddPostFormValue'

export const addPostApiSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      addPost: builder.mutation<AddPostApiResponse, AddPostFormValue>({
        query(data) {
          return {
            url: '/addPost',
            method: 'POST',
            body: data
          }
        },
        async onCacheEntryAdded(_, {dispatch, cacheDataLoaded}) {
          const {data: response} = await cacheDataLoaded

          if (isSuccessAddPostApiResponse(response)) {
            dispatch(
              apiSlice.util.updateQueryData('getPosts', undefined, draft => {
                postsAdapter.addOne(draft, response.data)
              })
            )
          }
        }
      })
    }
  }
})

export const {useAddPostMutation} = addPostApiSlice
