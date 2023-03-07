import { createSlice } from "@reduxjs/toolkit";
import { searchDataMuscles } from '../thunk/index'
import { DataFromApi } from "../type";
export type DataFromApiMuscles = Array<string>

const initialState: DataFromApi = {
    dataMuscles: [],
    dataSearch: [],
    exerciseToAdd: {
        modalActive: false,
        exerciseItem: {
            Force: "",
            Name: "",
            ['Primary Muscles']: [],
            ['Secondary Muscles']: [],
            Type: "",
            WorkoutType: [],
            ['Youtube link']: ""
        }
    },
    isLoading: false
}

const dataExerciseSlice = createSlice({
    name: 'dataExercise',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.dataMuscles = action.payload;
            state = initialState;
        },
        setDataSearch: (state, action) => {
            state.dataSearch = action.payload;
        },
        activeModal: (state, action) => {
            state.exerciseToAdd.modalActive = true;
            state.exerciseToAdd.exerciseItem = action.payload;

        },
        desactiveModal: (state) => {
            state.exerciseToAdd.modalActive = false
        }

    },
    extraReducers: (builder) => {
        builder.addCase(searchDataMuscles.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(searchDataMuscles.fulfilled, (state, action) => {
            state.isLoading = false;

        })
        builder.addCase(searchDataMuscles.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const { setData, setDataSearch, activeModal, desactiveModal } = dataExerciseSlice.actions
export default dataExerciseSlice.reducer;
