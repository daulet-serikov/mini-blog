import {apiSlice} from '../store/apiSlice'
import {isSuccessLoginApiResponse, LoginApiResponse} from './LoginApiResponse'
import {LoginFormValue} from './LoginFormValue'

export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<LoginApiResponse, LoginFormValue>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data
      }),
      async onCacheEntryAdded(_, {dispatch, cacheDataLoaded}) {
        const cache = await cacheDataLoaded
        const response = cache.data

        if (isSuccessLoginApiResponse(response)) {
          dispatch(apiSlice.util.upsertQueryData('getUser', undefined, response.data))
        }
      }
    })
  })
})

export const {useLoginMutation} = loginApiSlice
