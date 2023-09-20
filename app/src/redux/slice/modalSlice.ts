import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isActive: false,
    mode: ''

  },
  reducers: {
    setActive: (state, actions) => {
      state.isActive = !state.isActive
      state.mode = actions.payload
    },
    setClose: (state) => {
      state.isActive = false
      state.mode = ''
    }

  }
})

export const { setActive, setClose } = modalSlice.actions

export default modalSlice.reducer
