import { AddOptionData } from "./slice/bmiCalculator";

/*-----------interface login--------*/
export interface FormLogin {
    username: string;
    password: string;
}

/*-----------interface register--------*/

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
    response: boolean | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/*-----------interface Data--------*/
type Error = {
    error: string | object
}

export interface Data {
    username: string,
    token: string,
    isLogged: boolean,
    loading: boolean,
    error: Error,

};

export interface RootState {
    user: Data,
    dataApi:DataFromApi,
    bmi:AddOptionData
}

export interface ModalInterface{
    modal:{
        isActive:boolean,
        mode:string
    },

}



/*-----------interface Data from api--------*/

export interface DataFromApiExercise{
    bodyPart:string,
    equipment:string,
    gifUrl:string,
    id:string,
    target:string,
    name:string,
    complete:boolean,
    serial:number,
    repeat:number,
    title:string
}
interface exerciseToAdd {
    modalActive: boolean;
    exerciseItem: DataFromApiExercise
}
export interface DataFromApi {
    dataMuscles: DataFromApiMuscles;
    dataSearch: Array<DataFromApiSearch>,
    exerciseToAdd: exerciseToAdd,
    exerciseSideBar: exerciseToAdd,
    isLoading: boolean
}
