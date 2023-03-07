import React from 'react'
import styled from 'styled-components'

interface Props {
    data: Array<string>
}
const Container = styled.div`
    display: flex;
    justify-self:flex-end;
    padding:0 10px;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
   
    
    &>ul{
        display: grid;
        grid-template-columns: repeat(2,1fr);
        gap: 3px;
        list-style:disc;
        list-style-position: inside;
        width: 100%;
        margin-top: 40px;
        background: #FFFFFF;
        padding: 10px 20px;
        font-size: 1.4rem;
        max-height:450px;
        min-width: 310px;
        max-width: 900px;
        box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%);
        border-radius: 3px;
        &>li{
            color: #c2c2c3;
            margin:0 auto ; 
            margin: 5px 0;
            text-align: center;
            text-align: start;
        }
        &>li::marker{
            color: #e7c19b;
        }
        &>h2{
            font-size: 2rem;
            color: #ec9737d1;
            font-weight: 400;
            text-align: center;
            margin: 15px 0;
            grid-column: 1/3;
        }
        &>.container-button{
            width: 100%;
            text-align:end;
            &>button{
                border: none;
                background: #698aec;
                padding: 3px;
                color: #fff;
                border-radius: 2px;
                width:50px;
            }
        }
    }
`

const ListOfBodyParts = ({ data }: Props) => {
    return (
        <Container >
            <ul>
                <h2>List parts of body</h2>
                {
                    data && data.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </Container >
    )
}

export default ListOfBodyParts
