import React from 'react'
import styled from 'styled-components'
import BmiCalculator from '../components/BmiCalculator';
import FooterApp from '../components/FooterApp';
import HeaderApp from '../components/HeaderApp'
import RutineExercise from '../components/RoutineExercise';
import SearchExercises from '../components/SearchExercises';

const Container = styled.div`
    background: #E7E9EE;
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
const DashboarsPage = () => {
    return (
        <Container>
            <HeaderApp text='Log out' />
            <SearchExercises />
            <BmiCalculator />
            <FooterApp />
        </Container>
    )
};

export default DashboarsPage;
