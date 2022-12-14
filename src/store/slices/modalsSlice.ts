import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState = {
  login: false,
  register: false,
  addPost: false
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    modalToggled(state, action: PayloadAction<keyof typeof initialState>) {
      state[action.payload] = !state[action.payload]
    }
  }
})

export const {modalToggled} = modalsSlice.actions

export const {reducer: modalsReducer} = modalsSlice
