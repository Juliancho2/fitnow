import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Routine } from '../slice/userSlice';
import { AppDispatch } from '../store/store';
import { deleteExerciseFromRoutine, deleteRoutine } from '../thunk';
import { Data } from '../type';

const MenuContainer = styled.div`
  position: relative;
  width: 50%;
  margin: 0 auto;
  min-width: 320px;
  `;

const MenuButton = styled.button`
  display: block;
  width: 100%;
  background-color: #66b3bd;
  color: #fffdfd;
  font-size: 1.2rem;
  padding: 1rem;
  border: none;
  outline: none;

`;

const MenuContent = styled.div<{ isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};

  flex-wrap: wrap;
  align-items: center;
  position: relative;
  justify-content: center;
  gap: 8px;
  top: 100%;
  left: 0;
  width: 100%;
  background: #f3f3f3;
  padding: 1rem;
  border-top: none;
  animation: hiddeDropwn  ease-in-out .3s;
  min-height: 40px;
  padding-bottom:50px;

  &>button{
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    background: #cf4343;
    border: none;
    color: #ffff;
    font-weight: 400;
    font-size: 1.1rem;
    padding: 4px 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  @keyframes hiddeDropwn {
    0% {
            opacity: 0;
      }
    100% {
            opacity: 1;
    }
  } 
  
`;

const OtherContent = styled.div`
  padding: 1rem;
`;
const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: 240px;
  background-color: #F5F5F5;
  padding: 20px;
  padding-bottom: 50px;
  border-radius: 3px;
  box-shadow: 0px 0px 10px rgba(200, 197, 197, 0.2);
  box-sizing: border-box;
  &>iframe{
    width: 100%;
  }
  &>button{
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 10px;
    background: transparent;
    border: none;
    color: #616161;
    font-weight: 400;
    padding: 4px 5px;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  color: #f78d23;
  font-weight: 500;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #A4A9B2;
  
`;

const CardLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;



interface Props {
  data: Routine
}
interface RootState {
  user: Data
}

const Menu = ({ data }: Props) => {
  const { exersiceItem } = data
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const { token } = userState;

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const handleRemoveRoutine = (id: string | undefined) => {
    if (id) {
      dispatch(deleteRoutine({ id, token }))
    }

  };
  const handleRemoveExercise = (id: string | undefined, token: string, name: string) => {
    if (id) {
      dispatch(deleteExerciseFromRoutine({ id, token, name }));
    }
  }

  return (
    <MenuContainer>
      <MenuButton onClick={handleButtonClick}>
        {isOpen ? 'Cerrar' : data.day.toUpperCase()}
      </MenuButton>
      <MenuContent isOpen={isOpen}>
        {
          exersiceItem.map(item => (
            <CardContainer key={item.Name}>
              <CardTitle>{item.Name}</CardTitle>
              <CardText>Force: {item.Force}</CardText>
              <CardText>Primary Muscles: {item['Primary Muscles']?.join(', ')}</CardText>
              <CardText>Secondary Muscles: {item['Secondary Muscles']?.join(', ')}</CardText>
              <CardLink href={item['Youtube link']} target="_blank">
                Watch video
              </CardLink>
              <button onClick={() => handleRemoveExercise(data.id, token, item.Name)}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
            </CardContainer>
          ))
        }
        <button onClick={() => handleRemoveRoutine(data.id)}>Delete day</button>
      </MenuContent>
      <OtherContent>
      </OtherContent>
    </MenuContainer>
  );
};

export default Menu;