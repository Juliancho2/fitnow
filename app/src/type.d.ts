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
    user: Data
}




/*-----------interface Data from api--------*/
export interface DataFromApiSearch {
    Force: string
    Name: string
    ['Primary Muscles']: Array<string>
    ['Secondary Muscles']: Array<string>
    Type: string
    WorkoutType: Array<string>
    ['Youtube link']: string
}
interface exerciseToAdd {
    modalActive: boolean;
    exerciseItem: DataFromApiSearch
}
export interface DataFromApi {
    dataMuscles: DataFromApiMuscles;
    dataSearch: Array<DataFromApiSearch>,
    exerciseToAdd: exerciseToAdd,
    isLoading: boolean
}