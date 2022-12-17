import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {apiSlice} from './slices/api/apiSlice'
import {modalsReducer} from './slices/modalsSlice'

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
