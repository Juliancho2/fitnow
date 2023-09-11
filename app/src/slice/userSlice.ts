import { createSlice } from "@reduxjs/toolkit";
import { addRoutine, fetchRoutineData, loginUser } from "../thunk";
import { DataFromApiExercise } from "../type";


export type Error = string

export interface Routine {
    id?: string
    day: string;
    exersiceItem: Array<DataFromApiExercise>
}

export interface DataUser {
    username: string,
    token: string,
    isLogged: boolean,
    loading: boolean,
    error: Error,
    routine: Array<Routine>
}


const initialState: DataUser = {
    username: '',
    isLogged: false,
    token: '',
    loading: false,
    error: "",
    routine: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.isLogged = true
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.routine = action.payload.routine;
            localStorage.setItem('loggedAppUser', JSON.stringify(action.payload))
        },
        setError: (state) => {
            state.error = ""
        },
        setRoutine: (state, action) => {
            state.routine=action.payload
        },
        logOut: (state) => {
            window.localStorage.removeItem('loggedAppUser');
            return state = initialState
        },
        addExerciseToRoutine: (state, action) => {
            state.routine = state.routine.concat(action.payload);
            const user = window.localStorage.getItem('loggedAppUser')
            if (user) {
                const newInfo = JSON.parse(user);
                const newArray = {
                    ...newInfo,
                    routine: state.routine
                };
                window.localStorage.setItem('loggedAppUser', JSON.stringify(newArray));
            }


        },
        deleteRoutineFromState: (state, action) => {
            state.routine = state.routine.filter(item => item.id !== action.payload);
        },
        deleteExerciseFromState: (state, action) => {
            state.routine.forEach(item => {
                if (item.day === action.payload.name) {
                    item.exersiceItem = item.exersiceItem.filter((item) => item.id !== action.payload.id);
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.error = ""
            state.loading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.error = ""
            state.loading = false;
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = String(action.payload)
            state.loading = false;
        })


        builder.addCase(fetchRoutineData.pending, (state, action) => {
            state.loading = true;

        })
        builder.addCase(fetchRoutineData.fulfilled, (state, action) => {
            state.loading = false;
            state.routine = action.payload;
        })

        builder.addCase(fetchRoutineData.rejected, (state, action) => {
            state.error = String(action.payload)
            state.loading = false;
        })


        builder.addCase(addRoutine.pending, (state, action) => {
            state.loading = true;

        })
        builder.addCase(addRoutine.fulfilled, (state, action) => {
            state.loading = false;
        })

        builder.addCase(addRoutine.rejected, (state, action) => {
            state.error = String(action.error.message)
            state.loading = false;
        })
    }

})

export const {
    logOut,
    setUser,
    addExerciseToRoutine,
    deleteRoutineFromState,
    deleteExerciseFromState,
    setError,
    setRoutine
} = userSlice.actions;

export default userSlice.reducer;
