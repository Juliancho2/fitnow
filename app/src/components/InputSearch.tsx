import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppDispatch } from '../store/store';
import { searchDataMuscles } from '../thunk';
import { DataFromApi } from '../type';
import SpinnerComponent from './SpinnerComponent';

type InputSearchProps = {
    placeholder: string;
    onSearch?: (searchTerm: string) => void;
};

const InputSearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  height: 40px;
  margin-top: 40px;
  width: 100%;
  max-width: 320px;
  background: #ffffffb3;
  &>button{
    border: none;
    padding: 5px;
    background: #f78d23;
    color: #fff;
    border-radius: 5px;
  }
  
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  width: 100%;
  height: 100%;
  background: transparent;
  &::placeholder{
    color: #d9d9d9;
  }
`;
const Container = styled.div`
align-items: center;
width: 100%;
padding: 0 10px;
    &>form{
        margin: 0;
    }
    
`;

interface RootState {
    dataApi: DataFromApi
}

const InputSearch = ({ placeholder }: InputSearchProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const dataApiState = useSelector((state: RootState) => state.dataApi);
    const { isLoading } = dataApiState;


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(searchDataMuscles(searchTerm));
        setSearchTerm('');
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <InputSearchContainer>
                    <i className="fa fa-search" />
                    <Input
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <button>Search</button>
                </InputSearchContainer>
            </form>
            {
                (isLoading) && <SpinnerComponent />
            }


        </Container>
    );
};

export default InputSearch;
