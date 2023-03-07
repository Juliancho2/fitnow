import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { desactiveModal } from '../slice/dataExerciseSlice'
import { AppDispatch } from '../store/store'
import { addRoutine, postDataRoutine } from '../thunk'
import swal from 'sweetalert';
import { Data, DataFromApi } from '../type'

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    min-height: 400px;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #2e2c2caa;
    animation:  modalOpen 0.3s ease-in-out;
    
    @keyframes modalOpen {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
`
const CardModal = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-height: 280px;
    padding-bottom:60px ;
    background: #fff;
    width: 80%;
    max-width: 300px;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(234, 232, 232, 0.178);
    &>h3{
        text-align: center;
        font-size: 2rem;
        color: #ec9737d1;
        font-weight: 500;
        margin-bottom: 5px;
        &>b{
            font-weight: 400;
            color: #949494;
        }
    }
    &>form{
        width: 90%;
        &>select{
            outline: none;
            width: 100%;
            border: 1px solid #cecdcd;
            height: 35px;
            border-radius: 3px;
            color: #5c5c5c;
        }
    }
`
const ContainerButton = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding:10px;
    &>button{
        width: 80px;
        background: #4399CF;
        border: none;
        color: #ffff;
        font-weight: 400;
        padding: 4px 5px;
        border-radius: 3px;
        cursor: pointer;
    }
`
const ContainerClose = styled.div`
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    width: 20px;
    background: #f1f1f1;
    color: #666666;
    font-size: 1.2rem;
    text-align: end;
`
interface RootState {
    dataApi: DataFromApi,
    user: Data
}




const AddExercise = () => {
    const [day, setDay] = useState("monday");
    const dataApiState = useSelector((state: RootState) => state.dataApi);
    const userState = useSelector((state: RootState) => state.user);

    const { token } = userState;
    const { exerciseToAdd } = dataApiState;
    const { exerciseItem } = exerciseToAdd;
    const dispatch = useDispatch<AppDispatch>();


    const handleChangeModal = (e: React.MouseEvent<HTMLDivElement>) => dispatch(desactiveModal());
    const handleAddExersice = (e: React.MouseEvent<HTMLButtonElement>, value: postDataRoutine) => {
        dispatch(addRoutine(value));
        dispatch(desactiveModal());
        swal('Added your to routine with');
    }
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDay(e.target.value);
    }
    return (
        <Container>

            <CardModal>
                <ContainerClose onClick={handleChangeModal}>
                    <FontAwesomeIcon icon={faClose} />
                </ContainerClose>

                <h3>Add this exercise your to routine: <br /> <b>{exerciseToAdd.exerciseItem.Name}</b></h3>
                <form >
                    <select value={day} name="" id="" onChange={handleChangeSelect}>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="thurday">Thurday</option>
                        <option value="friday">Friday</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                    </select>
                </form>

                <ContainerButton>
                    <button onClick={(e) => handleAddExersice(e, { data: { exersiceItem: [exerciseItem], day }, token })}>Ok</button>
                </ContainerButton>
            </CardModal>


        </Container>
    )
}

export default AddExercise
