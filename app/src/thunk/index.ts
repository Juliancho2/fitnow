import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataBmi } from '../slice/bmiCalculator';
import { setData, setDataSearch } from '../slice/dataExerciseSlice';
import { addExerciseToRoutine, deleteExerciseFromState, deleteRoutineFromState, Routine, setUser } from '../slice/userSlice';

export type LogginData = {
    username: string,
    password: string
}
export type ParamsBmiCalculator = {
    height: string,
    weight: string
}

export interface postDataRoutine {
    data: Routine;
    token: string;
}


interface DeleteRoutineInterface {
    id: string,
    token: string
    name?: string
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data: LogginData, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch('http://127.0.0.1:3001/api/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (!res.ok && res.status === 401) {
                throw new Error(json.error);
            }

            return dispatch(setUser(json))
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (data: LogginData) => {
        try {
            const res = await fetch('http://127.0.0.1:3001/api/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (!res.ok && res.status === 401) {
                throw new Error(json.error);
            }
            return json
        } catch (error) {

        }
    }

)


export const bmiCalculator = createAsyncThunk(
    'bmi/bmiCalculator',
    async (data: ParamsBmiCalculator, { dispatch, rejectWithValue }) => {
        const { height, weight } = data;
        try {
            const url = `https://body-mass-index-bmi-calculator.p.rapidapi.com/metric?weight=${weight}&height=${height}`;
            const options = {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': '56276a89b4msh8a12ac638510a71p18bb22jsn212b9d08ac49',
                    'X-RapidAPI-Host': 'body-mass-index-bmi-calculator.p.rapidapi.com'
                }
            };
            const res = await fetch(url, options);
            const json = await res.json();

            return dispatch(setDataBmi(json));
        }
        catch (error: any) {
            console.log(error)
            if (typeof error === 'string') rejectWithValue(error)
        }

    }
)

export const fetchExerciseDbApi = createAsyncThunk(
    'dataExercise/fetchExerciseDbApi',
    async (data: any, { dispatch }) => {
        try {
            const url = 'https://exerciseapi3.p.rapidapi.com/search/muscles/';

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '56276a89b4msh8a12ac638510a71p18bb22jsn212b9d08ac49',
                    'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
                }
            };

            const res = await fetch(url, options);
            const json = await res.json();

            dispatch(setData(json));
        } catch (error) {
            console.log(error);
        }
    }


);

export const searchDataMuscles = createAsyncThunk(
    'dataExercise/searchDataMuscles',
    async (search: string, { dispatch }) => {
        try {
            const url = `https://exerciseapi3.p.rapidapi.com/search/?primaryMuscle=${search}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '56276a89b4msh8a12ac638510a71p18bb22jsn212b9d08ac49',
                    'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
                }
            };

            const res = await fetch(url, options);
            const json = await res.json();

            return dispatch(setDataSearch(json));
        } catch (error) {
            return console.log(error);
        }
    }


);



export const addRoutine = createAsyncThunk(
    'dataExercise/addRoutine',
    async ({ data, token }: postDataRoutine, { dispatch }) => {
        const { day, exersiceItem } = data;

        console.log(exersiceItem)

        try {
            const newRoutine = {
                exersiceItem: exersiceItem,
                day
            }
            const url = `http://127.0.0.1:3001/api/routine`;

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newRoutine)
            };
            const res = await fetch(url, options);
            const json = await res.json();

            return dispatch(addExerciseToRoutine(json));
        }
        catch (error) {
            return console.log(error);
        }
    }


);

export const fetchRoutineData = createAsyncThunk(
    'dataExercise/fetchRoutineData',
    async (token: string) => {

        try {
            const res = await fetch('http://127.0.0.1:3001/api/routine', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const json = await res.json();
            return json

        } catch (error) {
            console.log(error)
        }

    }

);


export const deleteRoutine = createAsyncThunk(
    'dataExercise/deleteRoutine',
    async (idAndToken: DeleteRoutineInterface, { dispatch }) => {
        const { id, token } = idAndToken;
        const res = await fetch(`http://127.0.0.1:3001/api/routine/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch(deleteRoutineFromState(id));
    }
)
export const deleteExerciseFromRoutine = createAsyncThunk(
    'dataExercise/deleteRoutine',
    async (idAndToken: DeleteRoutineInterface, { dispatch }) => {
        const { id, token, name } = idAndToken;
        const res = await fetch(`http://127.0.0.1:3001/api/routine/${id}/${name}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch(deleteExerciseFromState({ id, name }));
    }
)