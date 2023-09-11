import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { registerUser } from '../thunk';
import { ErrorsForm, FormValues, UseFormProps, UseFormReturn } from '../type';


const useForm = ({ initialForm, validateForm }: UseFormProps): UseFormReturn => {
    const [form, setForm] = useState<FormValues>(initialForm);
    const [errors, setErrors] = useState<ErrorsForm>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<boolean | null>(null);
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>): void => {
        handleChange(e);
        setErrors(validateForm(form));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrors(validateForm(form));

        try {
            if (Object.keys(errors).length === 0) {

                setLoading(true);
                setLoading(false);
                const newUser = {
                    username: form.username,
                    password: form.password
                }
                dispatch(registerUser(newUser));
                setResponse(true);
                setForm(initialForm);

                setTimeout(() => setResponse(false), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};

export { useForm };