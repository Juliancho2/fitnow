import { createAsyncThunk } from '@reduxjs/toolkit';
import { setDataBmi } from '../slice/bmiCalculator';
import { setDataSearch } from '../slice/dataExerciseSlice';
import { addExerciseToRoutine, deleteExerciseFromState, deleteRoutineFromState, Routine, setRoutine, setUser } from '../slice/userSlice';
import { exampleCard } from '../static';

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
    name: string
}

// const URL = 'https://api-fitnow-production.up.railway.app/api';
const URL= 'http://localhost:3001/api'

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (data: LogginData, { dispatch, rejectWithValue }) => {
        try {
            const res = await fetch(URL + '/login', {
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
            const res = await fetch(URL + '/user', {
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
            if (typeof error === 'string') rejectWithValue(error)
        }

    }
)
// obtener ejercicios por musculo

export const fetchExerciseDbApi = createAsyncThunk(
    'dataExercise/fetchExerciseDbApi',
    async (data: {name:string}, { dispatch, rejectWithValue }) => {

        try {
            // const url = `https://exercisedb.p.rapidapi.com/exercises/target/${data.name}`;

            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '56276a89b4msh8a12ac638510a71p18bb22jsn212b9d08ac49',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                  }
            };

            // const res = await fetch(url, options);
            // const json = await res.json();

            dispatch(setDataSearch(exampleCard));
        } catch (error) {
            rejectWithValue(error);
        }
    }


);

// Agregar una rutina o un dia con la rutina

export const addRoutine = createAsyncThunk(
    'dataExercise/addRoutine',
    async (dataAndToken:postDataRoutine, { dispatch, rejectWithValue }) => {
      const { data, token } = dataAndToken;
        console.log(data.exersiceItem)
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
        dispatch(addExerciseToRoutine(json))
        // Ahora, puedes despachar una acción utilizando `dispatch` directamente
         
        
      } catch (error) {
        throw error;
      }
    }
  );

  export const editExerciseToRoutine = createAsyncThunk(
    'dataExercise/editExerciseToRoutine',
    async (dataAndToken:any, { dispatch, rejectWithValue }) => {
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

  //Obtener la rutina del usuario
export const fetchRoutineData = createAsyncThunk(
    'dataExercise/fetchRoutineData',
    async (token: string) => {

        try {
            const res = await fetch(URL + '/routine', {
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



//Eliminar un ejercicio de la rutina del dia.

export const deleteExerciseFromRoutine = createAsyncThunk(
    'dataExercise/deleteRoutine',
    async (idAndToken: DeleteRoutineInterface, { dispatch }) => {
        const { id, token,name } = idAndToken;
        console.log(name)
        const res = await fetch(`${URL}/routine/${id}/${name}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        dispatch(deleteExerciseFromState({ id, name }));
    }
)
