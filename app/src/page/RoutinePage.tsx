import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import HeaderApp from '../components/HeaderApp'
import Menu from '../components/Menu'
import RoutineExercise from '../components/RoutineExercise'
import SpinnerComponent from '../components/SpinnerComponent'
import { AppDispatch } from '../store/store'
import { fetchRoutineData } from '../thunk'
import { RootState } from '../type'

const Container = styled.div`
    min-height: 100vh;
    width: 100%;
    animation: loadedPage ease-in-out .6s;

    @keyframes loadedPage {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`

const RoutinePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: RootState) => state.user);
    const { token } = userState;

    useEffect(() => {
        dispatch(fetchRoutineData(token))
    }, []);


    return (
        <Container>
            <HeaderApp text={'Log out'} />
            <RoutineExercise />


        </Container>
    )
}

export default RoutinePage
