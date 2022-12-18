import {apiSlice} from '../store/apiSlice'
import {ApiResponse} from '../api/types/ApiResponse'

export const logoutApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation<ApiResponse, void>({
      query: () => ({
        url: '/logout',
        method: 'POST'
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        const patch = dispatch(
          apiSlice.util.updateQueryData('getUser', undefined, () => undefined)
        )

        const {data: response} = await queryFulfilled

        if (response.status === 'error') {
          patch.undo()
        }
      }
    })
  })
})

export const {useLogoutMutation} = logoutApiSlice
