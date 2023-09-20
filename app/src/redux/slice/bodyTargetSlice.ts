import { createSlice } from '@reduxjs/toolkit'
import { fetchBodyTarget } from '../thunk'

const bodyTargetSlice = createSlice({
  name: 'bodyTargetSlice',
  initialState: {
    bodyItems: [],
    isLoading: false,
    errorMessage: { name: '', isError: false }
  },
  reducers: {
    setDataBodyTarget: (state, action) => {
      state.bodyItems = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBodyTarget.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchBodyTarget.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(fetchBodyTarget.rejected, (state, action) => {
      state.isLoading = false

      state.errorMessage.isError = true
      state.errorMessage.name = String(action.error.message)
    })
  }
})

export const { setDataBodyTarget } = bodyTargetSlice.actions
export default bodyTargetSlice.reducer
