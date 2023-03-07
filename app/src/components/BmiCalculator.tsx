import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AddOptionData } from '../slice/bmiCalculator'
import { AppDispatch } from '../store/store'
import { bmiCalculator, ParamsBmiCalculator } from '../thunk'
import SpinnerComponent from './SpinnerComponent'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 50vh;
    background: #e9e9e9;
    padding: 30px 20px;
    
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 700px;
    min-height:300px;
    &>.title{
        width: 100%;
        max-width: 400px;
        margin-bottom: 20px;
    }
    &>.title h3{
        font-size: 3rem;
        color: #ec9737d1;
        font-weight: 300;
        text-align: center;
        margin-bottom: 10px;
    }
    &>.title p{
        font-size: 1.4rem;
        color: #a3a3a3;
        text-align: center;
    }
    &>.container-info{
        width: 100%;
        text-align: center;
        margin-top: 10px;
        background: #f3f3f3;
        padding: 15px;
        max-width: 400px;
        &>h3{
            font-size: 2rem;
            font-weight: 400;
            color: #ec9737d1;
            margin-bottom: 10px;
        }
        &>p{
            font-size: 1.4rem;
        }
    }
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    width: 100%;
    &>button{
        border: none;
        background: #e7952a;
        color: #fff;
        padding: 0 3px;
        border-radius: 5px;
        width: 80px;
        height: 30px;
        align-self:center ;
    }
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    height: 85px;
    width: 100%;
    max-width: 400px;
    &>input{
        display: inline-block;
        background: transparent;
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        background: #F7F7F7;
        padding: 3px 8px;
    }&>input::placeholder{
        color: #95919194;
    }
`
const initialState: ParamsBmiCalculator = { height: "", weight: "" }

interface RootState {
    bmi: AddOptionData
}
const BmiCalculator = () => {
    const [dataCalculator, setDataCalculator] = useState(initialState);
    const dispatch = useDispatch<AppDispatch>();
    const { bmi, loading, error } = useSelector((state: RootState) => state.bmi)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setDataCalculator({
            ...dataCalculator,
            [name]: value
        })
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(bmiCalculator(dataCalculator));
    };

    return (
        <Container>
            <Wrapper>
                <div className='title'>
                    <h3>(BMI) Calculator</h3>
                    <p>To calculate the Body Mass Index of an individual based on their height and weight.</p>
                </div>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <InputContainer>
                        <input required onChange={handleChange} type="number" name='height' value={dataCalculator.height} placeholder='height (cm)' />
                        <input required onChange={handleChange} type="number" name='weight' value={dataCalculator.weight} placeholder='weight (kg)' />
                    </InputContainer>
                    <button>Calculate</button>
                </Form>
                {
                    loading && <SpinnerComponent />
                }
                {
                    (!error && !loading && bmi) && (
                        <div className='container-info'>
                            <h3>Your BMI is:</h3><p>{bmi}</p>
                        </div>
                    )
                }

            </Wrapper>

        </Container>
    )
}



export default BmiCalculator
