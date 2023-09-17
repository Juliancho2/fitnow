import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataBmi } from '../slice/bmiCalculator';
import { setDataSearch } from '../slice/dataExerciseSlice';
import { addExerciseToRoutine, deleteExerciseFromState, setRoutine, setUser } from '../slice/userSlice';
import { exampleCard } from '../../static';
import { ExerciseToAdd } from '../../interface';
import { setDataBodyTarget } from '../slice/bodyTargetSlice';

export type LogginData = {
    username: string,
    password: string
}
export type ParamsBmiCalculator = {
    height: string,
    weight: string
}

export interface postDataRoutine {
    data: ExerciseToAdd;
    token: string;
}


interface DeleteRoutineInterface {
    id: string,
    token: string
    name: string
}


const URL=import.meta.env.PROD ? import.meta.env.VITE_URL_API_MONGO 
                                : import.meta.env.VITE_URL_LOCALHOST


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data: LogginData, { dispatch }) => {
        try {
            const res = await fetch(URL + '/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if (!res.ok ) {
                throw new Error(json.message);
            }

            return dispatch(setUser(json))
        } catch (error: any) {
            throw error
        }
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (data: LogginData) => {
        try {
            const res = await fetch(URL + '/user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            
            if (!res.ok){
               throw  new Error(json.message);
            }
            return json
        } catch (error) {
            throw error
        }
    }

)


export const bmiCalculator = createAsyncThunk(
    'bmi/bmiCalculator',
    async (data: ParamsBmiCalculator, { dispatch, rejectWithValue }) => {
        const { height, weight } = data;
        const formatterHeight=(Number(height) / 100).toFixed(2)
        try {
            const url = `${import.meta.env.VITE_URL_API_BMI}metric?weight=${weight}&height=${formatterHeight}`;
            const options = {
                method: "GET",
                headers: {
                    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY_BMI,
                    'X-RapidAPI-Host': import.meta.env.VITE_API_HOST_BMI
                }
            };
            const res = await fetch(url, options);
            const json = await res.json();
           
            return dispatch(setDataBmi(json));
        }
        catch (error: any) {
            if (typeof error === 'string') rejectWithValue(error)
        }

    }
)
// obtener ejercicios por musculo

export const fetchExerciseDbApi = createAsyncThunk(
    'dataExercise/fetchExerciseDbApi',
    async (data: {name:string}, { dispatch, rejectWithValue }) => {

        try {
            const url = `${URL}target/${data.name}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key':import.meta.env.VITE_API_KEY_EXERCISE_DB,
                    'X-RapidAPI-Host': import.meta.env.VITE_API_HOST_EXERCISE_DB
                  }
            };

            const res = await fetch(url, options);
            const json = await res.json();

            dispatch(setDataSearch(exampleCard));
        } catch (error) {
            rejectWithValue(error);
        }
    }


);
export const fetchBodyTarget = createAsyncThunk(
    'dataExercise/fetchBodyTarget',
    async (data,{ dispatch }) => {

        try {
            const url = `${URL}/body`;

            const options = {
                method: 'GET'
            };

            const res = await fetch(url, options);
            const json = await res.json();

            dispatch(setDataBodyTarget(json));
        } catch (error) {
            throw error
        }
    }


);

// Agregar una rutina o un dia con la rutina

export const addRoutine = createAsyncThunk(
    'dataExercise/addRoutine',
    async (dataAndToken:postDataRoutine, { dispatch }) => {
      const { data, token } = dataAndToken;
      
      const newRoutine = {
        exersiceItem: data.exersiceItem,
        day:data.day,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRoutine),
      };
  
      try {
        
        const res = await fetch(URL + '/routine', options);
        const json = await res.json();
        if(!res.ok){
            throw new Error(json.message)
        }
        return dispatch(addExerciseToRoutine(json))
         
        
      } catch (error) {
        throw error;
      }
    }
  );

  export const editExerciseToRoutine = createAsyncThunk(
    'dataExercise/editExerciseToRoutine',
    async (dataAndToken:any, { dispatch }) => {
      const { exerciseItem,day, token } = dataAndToken;

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({exerciseItem}),
      };
  
      try {
        
        const res = await fetch(URL + '/routine/' + day, options);
        const json = await res.json();
        if(!res.ok){
            throw new Error(json.message)
        }
        return dispatch(setRoutine([json]))
         
        
      } catch (error) {
        throw error;
      }
    }
  );

//Eliminar un ejercicio de la rutina del dia.

export const deleteExerciseFromRoutine = createAsyncThunk(
    'dataExercise/deleteRoutine',
    async (idAndToken: DeleteRoutineInterface, { dispatch }) => {
        const { id, token,name } = idAndToken;
        const res = await fetch(`${URL}/routine/${id}/${name}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch(deleteExerciseFromState({ id, name }));
    }
)
