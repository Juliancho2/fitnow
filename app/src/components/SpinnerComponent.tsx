import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 0 auto;
  margin-top:40px ;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #e1a639;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${rotate} 1s linear infinite;
`;

const SpinnerComponent: React.FC = () => {
  return <Spinner />;
};

export default SpinnerComponent;