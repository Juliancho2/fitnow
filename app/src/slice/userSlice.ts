import { createSlice } from "@reduxjs/toolkit";
import { fetchRoutineData, loginUser } from "../thunk";
import { DataFromApiSearch } from "../type";

export type Error = {
    error: string | object
}

export interface Routine {
    id?: string
    day: string;
    exersiceItem: Array<DataFromApiSearch>
}

export interface DataUser {
    username: string,
    token: string,
    isLogged: boolean,
    loading: boolean,
    error: any,
    routine: Array<Routine>
}


const initialState: DataUser = {
    username: '',
    isLogged: false,
    token: '',
    loading: false,
    error: null,
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
            state.routine = [];
            localStorage.setItem('loggedAppUser', JSON.stringify(action.payload))
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
                if (item.id === action.payload.id) {
                    item.exersiceItem = item.exersiceItem.filter(item => item.Name !== action.payload.name);
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;

        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
        })

        builder.addCase(loginUser.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
        })
        builder.addCase(fetchRoutineData.pending, (state, action) => {
            state.loading = true;
            state.error = null;

        })
        builder.addCase(fetchRoutineData.fulfilled, (state, action) => {
            state.error = null;
            state.loading = false;
            state.routine = action.payload;
        })

        builder.addCase(fetchRoutineData.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false;
        })
    }

})

export const { logOut, setUser, addExerciseToRoutine, deleteRoutineFromState, deleteExerciseFromState } = userSlice.actions;

export default userSlice.reducer;
