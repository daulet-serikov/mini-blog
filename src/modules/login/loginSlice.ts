import {apiSlice} from '../store/apiSlice'
import {isSuccessLoginApiResponse, LoginApiResponse} from './LoginApiResponse'
import {LoginFormValue} from './LoginFormValue'

export const loginApiSlice = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      login: builder.mutation<LoginApiResponse, LoginFormValue>({
        query(data) {
          return {
            url: '/login',
            method: 'POST',
            body: data
          }
        },
        async onCacheEntryAdded(_, {dispatch, cacheDataLoaded}) {
          const {data: response} = await cacheDataLoaded

          if (isSuccessLoginApiResponse(response)) {
            dispatch(apiSlice.util.updateQueryData('getUser', undefined, () => response.data))
          }
        }
      })
    }
  }
})

export const {useLoginMutation} = loginApiSlice
