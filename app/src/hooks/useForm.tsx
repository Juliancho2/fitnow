import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import { registerUser } from '../redux/thunk';
import { ErrorsForm, FormValues, UseFormProps, UseFormReturn } from '../interface';
import Swal from 'sweetalert2';


const useForm = ({ initialForm, validateForm }: UseFormProps): UseFormReturn => {
    const [form, setForm] = useState<FormValues>(initialForm);
    const [errors, setErrors] = useState<ErrorsForm>({});
    const [loading, setLoading] = useState<boolean>(false);
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
                const res=await dispatch(registerUser(newUser));
                
                setForm(initialForm);

                if(res.payload){
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Register success',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }

            }
        } catch (error) {
            console.log(error);
        }
    };

    return {
        form,
        errors,
        loading,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};

export { useForm };
