import React from 'react';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';


const ContainerFooter = styled.footer`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    min-height: 15vh;
    width: 100%;
    background: #1A1919;

    &>div  p{
        font-weight: 400;
        font-size: 1.2rem;
        text-align: start;
        width: 100%;
        color: #a7a7a7;
    }
    & .footer-left{
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        padding: 0 20px;
        &>div{
            display: flex;
            text-align: center;
            font-size: 1.5rem;
            gap: 10px;
            color: #a7a7a7;
        }

    }
    &>small{
        font-weight: 400;
        font-size: 13px;
        text-align: center;
        grid-column: 1/3;
        color: #a7a7a7;
    }
    & >.footer-right{
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 10px;
        font-size: 2rem;
        color: #a7a7a7;
        padding: 0 20px;
    }
`

const FooterApp = () => {
    return (
        <ContainerFooter>
            <div className='footer-left'>
                <div>
                    <FontAwesomeIcon icon={faPhone} /><p>+33758127283</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} /><p>fitnow@gmail.com</p>
                </div>

            </div>
            <div className='footer-right'>
                <FontAwesomeIcon icon={faInstagram} />
                <FontAwesomeIcon icon={faFacebook} />
            </div>
            <small>®2023</small>

        </ContainerFooter>
    )
}

export default FooterApp
