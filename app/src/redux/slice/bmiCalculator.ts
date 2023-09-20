import { createSlice } from '@reduxjs/toolkit'
import { bmiCalculator } from '../thunk'

interface DataFromApi {
    bmi: number | null
    weight: string
    height: string
    weightCategory: string
}
export interface AddOptionData extends DataFromApi {
    loading: boolean
    error: string | unknown
}
const initialState: AddOptionData = {
  bmi: null,
  weight: '',
  height: '',
  weightCategory: '',
  error: null,
  loading: false

}

const bmiSlice = createSlice({
  name: 'bmiSlice',
  initialState,
  reducers: {
    setDataBmi: (state, action) => {
      state.bmi = action.payload.bmi.toFixed(1)
      state.weight = action.payload.weight
      state.height = action.payload.height
    },
    setDataBmiReset: (state) => {
      state.bmi = null
      state.weight = ''
      state.height = ''
      state.weightCategory = ''
      state.error = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder.addCase(bmiCalculator.pending, (state) => {
      state.loading = true
    })
    builder.addCase(bmiCalculator.fulfilled, (state) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(bmiCalculator.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export const { setDataBmi, setDataBmiReset } = bmiSlice.actions
export default bmiSlice.reducer
