import React from 'react'
import { AddOptionData } from './redux/slice/bmiCalculator'

/* -----------interface Data from api-------- */

export interface DataFromApiExercise{
    bodyPart:string,
    equipment:string,
    gifUrl:string,
    id:string,
    target:string,
    name:string,
    complete:boolean,
    serial:string,
    repeat:string,
    title:string
}
interface ErrorUser {
    name:string,
    isError:boolean
}

interface exerciseToAdd {
    modalActive: boolean;
    exerciseItem: DataFromApiExercise
}

export interface DataFromApi {
    dataSearch: Array<DataFromApiExercise>,
    exerciseToAdd: exerciseToAdd,
    exerciseSideBar: exerciseToAdd,
    isLoading: boolean,
    errorMessage: ErrorUser,
}

/* -----------interface login-------- */
export interface FormLogin {
    username: string;
    password: string;
}

/* -----------interface register-------- */

export interface FormValues {
    username: string,
    password: string,
    confirmPassword: string
}
export interface ErrorsForm {
    [key: string]: string
}
export interface UseFormProps {
    initialForm: FormValues;
    validateForm: (values: FormValues) => ErrorsForm;
}
export interface UseFormReturn {
    form: FormValues;
    errors: ErrorsForm;
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/* -----------interface DataUser-------- */

export interface Routine {
    id?: string;
    day: string;
    exersiceItem: Array<DataFromApiExercise>;
}

export interface ExerciseToAdd extends Omit<Routine, 'exersiceItem'> {
    exersiceItem: DataFromApiExercise;
}
export interface DataUser {
    username: string,
    token: string,
    isLogged: boolean | null,
    isLoading: boolean,
    errorMessage: ErrorUser,
    routine: Array<Routine>
}

interface BodyTarget{
    isLoading:string,
    errorMessage:ErrorUser,
    bodyItems:[]
}

export interface RootState {
    user: DataUser,
    dataApi:DataFromApi,
    bmi:AddOptionData,
    bodyTarget:BodyTarget
}

export interface ModalInterface{
    modal:{
        isActive:boolean,
        mode:string
    },

}
