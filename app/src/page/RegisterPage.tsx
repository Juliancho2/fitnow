import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import HeaderApp from '../components/HeaderApp'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from '../hooks/useForm'
import MessageErrorValidate from '../components/MessageErrorValidate'
import { ErrorsForm, FormValues } from '../type'


const Container = styled.div` 
    background: rgba(194, 194, 194, 0.33);
    min-height: 100vh;
`
const Main = styled.main`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 80px 0;
    &>a{
        display: grid;
        place-items: center;
        position: absolute;
        top: 80px;
        left: 40px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        color: #524e4e;
        font-size: 20px;
    }
    &>a:hover{
        background: #79797959;
        color: #242323;
    }
`
const Wrapper = styled.div`
    position: relative;
    width: 90%;
    min-height: 290px;
    max-width: 280px;
    background: #fcfcfc;
    margin: 0 auto;
    box-shadow: 0 0 4px 2px rgba(126, 122, 122, 0.059);
    padding: 0 30px;
    border-radius: 5px;

    &>h4{
        text-align: center;
        margin-top: 60px;
        color: #EFAA5B;
        font-size: 1.4rem;
    }

    &>.circle{
        display: grid;
        place-items:center;
        position: absolute;
        top: -30.5px;
        right: calc(50% - 42.5px);
        box-shadow:inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 50%;
        background: #FCFCFC;
        height: 81px;
        width: 87px;
        font-size: 30px;
        color: #394240e5;
    }
`
const Form = styled.form`
    display: flex;
    gap: 5px;
    flex-direction: column;
    margin-top:20px ;
    &>label{
        font-size: 12px;
        color: #575656;
        font-weight: 400;
    }
    &>input{
        height: 36px;
        border: none;
        border-radius: 5px;
        outline: none;
        background: #b0b1b440;
        padding: 0 8px;
    }
    &>button{
        width: 90px;
        height: 36px;
        background: #EFAA5B;
        border: none;
        align-self: center;
        margin: 10px 0;
        border-radius: 3px;
        color:#fff;
        cursor: pointer;
    }
    &>p,>a{
        font-size: 12px;
        text-align: center;
    }
    &>h4{
        text-align: center;
    }
`

const initialForm: FormValues = {
    username: "",
    password: "",
    confirmPassword: ""
}
const validateForm = (form: FormValues) => {
    const errors: ErrorsForm = {};
    let regexusername = /^[a-zA-Z0-9._-]{3,15}$/
    let regexPassword = /^.{4,}$/

    if (!form.username.trim()) {
        errors.username = "The field username is required";
    } else if (!regexusername.test(form.username.trim())) {
        errors.username = "Username is invalided"
    }
    if (!form.password.trim()) {
        errors.password = "The field password is required";
    } else if (!regexPassword.test(form.password.trim())) {
        errors.password = "Password is invalided"
    }
    if (!form.confirmPassword.trim()) {
        errors.confirmPassword = "The field confirm password is required";
    } else if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match"

    return errors
}

const RegisterPage = () => {
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
    } = useForm({ initialForm, validateForm })
    return (
        <Container>
            <HeaderApp text='Home' />
            <Main>
                <Wrapper>
                    <div className='circle'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h4>Sign up</h4>
                    <Form onSubmit={handleSubmit}>
                        <>
                            <label htmlFor="username">USERNAME</label>
                            <input required value={form.username} name='username' type="text" onChange={handleChange} onBlur={handleBlur} />

                            <label htmlFor="password">PASSWORD</label>
                            <input required value={form.password} type="password" name='password' onChange={handleChange} onBlur={handleBlur} />

                            <label htmlFor="password">CONFIRM PASSWORD</label>
                            <input required value={form.confirmPassword} type="password" name='confirmPassword' onChange={handleChange} onBlur={handleBlur} />

                            <button>Sign up</button>
                            {
                                response && <h4>"The user has been registered"</h4>
                            }
                            {
                                (Object.keys(errors).length >= 1) && <MessageErrorValidate message={Object.values(errors)} />
                            }
                        </>
                    </Form>
                </Wrapper>
            </Main>


        </Container>
    )
}

export default RegisterPage
