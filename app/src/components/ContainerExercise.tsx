import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { activeModal } from '../slice/dataExerciseSlice';
import { AppDispatch } from '../store/store';
import { DataFromApiSearch } from '../type';
import { extractorIdVideo } from '../utils/extractorIdVideo';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 300px;
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
const ContainerButton = styled.div`
position: absolute;
bottom: 0;
left: 0;
text-align: center;
margin: 10px 0;
width: 100%;

  &>button{
    border: none;
    background: #4399cf;
    padding: 6px 8px;
    color: #ffff;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 0 4px 0 rgba(0,0,0,20%);
  }
  
`
type Props = {
  data: DataFromApiSearch
};

const ContainerExercise = ({ data }: Props) => {
  const YoutubeLink = data['Youtube link']
  const dispatch = useDispatch<AppDispatch>();
  const handleModal = (e: React.MouseEvent<HTMLButtonElement>, value: DataFromApiSearch) => dispatch(activeModal(value));

  ;

  return (
    <CardContainer>
      <CardTitle>{data.Name}</CardTitle>
      <CardText>Force: {data.Force}</CardText>
      <CardText>Primary Muscles: {data['Primary Muscles']?.join(', ')}</CardText>
      <CardText>Secondary Muscles: {data['Secondary Muscles']?.join(', ')}</CardText>
      <CardText>Type: {data.Type}</CardText>
      <CardText>Workout Type: {data.WorkoutType?.join(', ')}</CardText>
      <iframe height="200" src={`https://www.youtube.com/embed/${extractorIdVideo(YoutubeLink)}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
      <ContainerButton>
        <button onClick={(e) => handleModal(e, data)}>Add to my routine</button>
      </ContainerButton>
    </CardContainer>
  );
};

export default ContainerExercise;
