import {apiSlice, usersAdapter} from '../store/apiSlice'
import {isSuccessRegisterApiResponse, RegisterApiResponse} from './RegisterApiResponse'
import {RegisterFormValue} from './RegisterFormValue'

export const registerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<RegisterApiResponse, RegisterFormValue>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data
      }),
      async onCacheEntryAdded(_, {dispatch, cacheDataLoaded}) {
        const cache = await cacheDataLoaded
        const response = cache.data

        if (isSuccessRegisterApiResponse(response)) {
          const user = response.data
          dispatch(
            apiSlice.util.updateQueryData('getUsers', undefined, draft => {
              usersAdapter.addOne(draft, user)
            })
          )
          dispatch(apiSlice.util.upsertQueryData('getUser', undefined, user.username))
        }
      }
    })
  })
})

export const {useRegisterMutation} = registerApiSlice
