import { createSlice } from "@reduxjs/toolkit";
import { fetchExerciseDbApi } from '../thunk/index'
import { DataFromApi } from "../type";
export type DataFromApiMuscles = Array<string>

const initialExerciseToAdd = {
    modalActive: false,
    exerciseItem: {
        name: "",
        gifUrl: "",
        target: "",
        bodyPart: "",
        id: "",
        equipment: "",
        complete: false,
        serial: 0,
        repeat: 0,
        title: ""
    }
}

const initialState: DataFromApi = {
    dataMuscles: [],
    dataSearch: [],
    exerciseToAdd: initialExerciseToAdd,
    exerciseSideBar: initialExerciseToAdd,
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
        setExerciseSidebar: (state, action) => {
            state.exerciseSideBar.exerciseItem = action.payload;
        },

        activeAddExerciseModal: (state, action) => {
            state.exerciseToAdd.modalActive = true;
            state.exerciseToAdd.exerciseItem = action.payload;

        },
        desactiveAddExerciseModal: (state) => {
            state.exerciseToAdd = initialExerciseToAdd
        },
        activeEditExerciseModal: (state, action) => {
            state.exerciseSideBar.modalActive = true;
            state.exerciseSideBar.exerciseItem = action.payload;

        },
        desactiveEditExerciseModal: (state) => {
            state.exerciseSideBar = initialExerciseToAdd
        },

    },
    extraReducers: (builder) => {


        builder.addCase(fetchExerciseDbApi.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchExerciseDbApi.fulfilled, (state, action) => {
            state.isLoading = false;

        })
        builder.addCase(fetchExerciseDbApi.rejected, (state, action) => {
            state.isLoading = false;
        })
    }
})

export const { setData,
    setDataSearch,
    activeAddExerciseModal,
    desactiveAddExerciseModal,
    setExerciseSidebar,
    activeEditExerciseModal,
    desactiveEditExerciseModal
 } = dataExerciseSlice.actions
export default dataExerciseSlice.reducer;
