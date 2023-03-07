import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { DataUser } from '../slice/userSlice'
import Menu from './Menu'
import SpinnerComponent from './SpinnerComponent'

interface RootState {
    user: DataUser
}
const Container = styled.div`
    height: 50vh;
    padding-top: 80px;
    width: 100%;
    margin: 0 auto;
    &>h4{
        text-align: center;
        color: #c49362;
    }

    
`
const RoutineExercise = () => {
    const userState = useSelector((state: RootState) => state.user);
    const { routine, loading } = userState;

    return (
        <Container>
            {
                loading && <SpinnerComponent />
            }
            {
                (routine.length === 0 && !loading) && <h4>There is not routine </h4>
            }
            {
                routine && routine.map(item => (
                    <Menu key={item.id} data={item} />
                ))
            }



        </Container>
    )
}

export default RoutineExercise
