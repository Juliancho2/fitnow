import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HeaderApp from '../components/HeaderApp'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../store/store'
import { loginUser } from '../thunk'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import { FormLogin, RootState } from '../type'

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
        font-size: 1.2rem;
        text-align: center;
    }
`


const initialForm: FormLogin = {
    username: "",
    password: ""
}


const LoginPage = () => {
    const [form, setForm] = useState(initialForm);
    const userState = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate()
    const { error, loading, isLogged } = userState;

    useEffect(() => {
        if (isLogged) navigate('/dashboard')
    }, [isLogged])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginUser(form));

        setForm(initialForm);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setForm({
            ...form,
            [name]: value
        });
    }

    return (
        <Container>
            <HeaderApp text='' />
            {
                loading && <Loader />
            }
            <Main>
                <Wrapper>
                    {
                        error && <ErrorMessage errorMessage={error} />
                    }
                    <div className='circle'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <h4>Login In</h4>
                    <Form onSubmit={handleSubmit}>
                        <>
                            <label htmlFor="username">USERNAME</label>
                            <input autoComplete='current-username' type="text" value={form.username} onChange={handleChange} name="username" />
                            <label htmlFor="password">PASSWORD</label>
                            <input autoComplete='current-password' type="password" value={form.password} onChange={handleChange} name="password" />
                            <p>Are you not account?</p><Link to={'/register'}>Sign up</Link>
                            <button>Log in</button>
                        </>
                    </Form>
                </Wrapper>
            </Main>


        </Container>
    )
}

export default LoginPage
