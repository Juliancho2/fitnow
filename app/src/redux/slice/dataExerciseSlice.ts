import { createSlice } from '@reduxjs/toolkit'
import { fetchExerciseDbApi } from '../thunk/index'
import { DataFromApi } from '../../interface'
export type DataFromApiMuscles = Array<string>

const initialExerciseToAdd = {
  modalActive: false,
  exerciseItem: {
    name: '',
    gifUrl: '',
    target: '',
    bodyPart: '',
    id: '',
    equipment: '',
    complete: false,
    serial: '',
    repeat: '',
    title: ''
  }
}

const initialState: DataFromApi = {
  dataSearch: [],
  exerciseToAdd: initialExerciseToAdd,
  exerciseSideBar: initialExerciseToAdd,
  isLoading: false,
  errorMessage: { name: '', isError: false }
}

const dataExerciseSlice = createSlice({
  name: 'dataExercise',
  initialState,
  reducers: {
    setDataSearch: (state, action) => {
      state.dataSearch = action.payload
    },
    setExerciseSidebar: (state, action) => {
      state.exerciseSideBar.exerciseItem = action.payload
    },

    activeAddExerciseModal: (state, action) => {
      state.exerciseToAdd.modalActive = true
      state.exerciseToAdd.exerciseItem = action.payload
    },
    desactiveAddExerciseModal: (state) => {
      state.exerciseToAdd = initialExerciseToAdd
    },
    activeEditExerciseModal: (state, action) => {
      state.exerciseSideBar.modalActive = true
      state.exerciseSideBar.exerciseItem = action.payload
    },
    desactiveEditExerciseModal: (state) => {
      state.exerciseSideBar = initialExerciseToAdd
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchExerciseDbApi.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchExerciseDbApi.fulfilled, (state) => {
      state.isLoading = false
    })
    builder.addCase(fetchExerciseDbApi.rejected, (state, action) => {
      if (action.error.message) {
        state.errorMessage.name = action.error.message
      }
      state.isLoading = false
    })
  }
})

export const {
  setDataSearch,
  activeAddExerciseModal,
  desactiveAddExerciseModal,
  setExerciseSidebar,
  activeEditExerciseModal,
  desactiveEditExerciseModal
} = dataExerciseSlice.actions
export default dataExerciseSlice.reducer
