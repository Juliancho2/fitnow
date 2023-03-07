import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { AppDispatch } from '../store/store'
import { fetchExerciseDbApi } from '../thunk'
import { DataFromApi } from '../type'
import AddExercise from './AddExercise'
import ContainerExercise from './ContainerExercise'
import InputSearch from './InputSearch'
import ListOfBodyParts from './ListOfBodyParts'

const Container = styled.div`
    position: relative;
    display: grid;
    width: 100%;
    min-height: 30vh;
    padding: 0 20px;
    padding-top: 70px;
    margin-bottom: 30px;
    &>div{
        display: flex;
        flex-wrap: wrap;
    }
    @media (min-width: 1100px) {
        grid-auto-flow: column;
    }
`
const ExerciseFinds = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 50px;
    padding: 20px 10px;
    width: 100%;
    margin: 0 auto;
    margin-top:30px;
    margin-bottom: 20px;
    
`

interface RootState {
    dataApi: DataFromApi
}
const SearchExercises = () => {
    const dispatch = useDispatch<AppDispatch>();
    const dataApiState = useSelector((state: RootState) => state.dataApi);
    const { dataMuscles, dataSearch, exerciseToAdd, isLoading } = dataApiState;


    useEffect(() => {
        dispatch(fetchExerciseDbApi(""));
    }, []);


    return (
        <Container>
            <div>
                <InputSearch placeholder='Search exercise by body part' />
                {
                    dataSearch.length > 0 &&
                    <ExerciseFinds>

                        {
                            !isLoading && dataSearch.map((item, index) => (
                                <ContainerExercise key={index} data={item} />
                            ))
                        }
                    </ExerciseFinds>
                }
            </div>
            {
                dataApiState.dataMuscles.length > 0 && <ListOfBodyParts data={dataMuscles} />
            }
            {
                exerciseToAdd.modalActive && <AddExercise />
            }
        </Container>
    )
}

export default SearchExercises
