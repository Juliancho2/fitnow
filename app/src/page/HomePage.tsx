import React from 'react'
import styled from 'styled-components';
import HeaderApp from '../components/HeaderApp';
import { Link } from 'react-router-dom';
import FooterApp from '../components/FooterApp';


const Container = styled.div`
    background: #E7E9EE;
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
const Main = styled.main`
    height:auto;
`
const ContainerImg = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding-top: 80px;
    & h2{
        text-align: start;
        font-weight: 400;
        font-size: 5rem;
        color: #fdfdfdea;
        text-shadow: 2px 2px 4px rgba(64, 63, 63, 0.539);
        z-index: 2;
    }
    & span{
        font-size: 5rem;
        z-index: 2;
        color: #ffa434c4;
    }
    &>a{
        border: none;
        background: #ec9737d1;
        padding: 5px 10px;
        color: #e3e3e3;
        height: 36px;
        width: 120px;
        margin-top: 10px;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
        z-index: 2;
        border-radius: 3px;
        text-decoration:none;
        text-align: center;
        font-size: 1.5rem;
    }
    >a:hover{
        box-shadow: 0 0 4px 2px rgba(126, 122, 122, 0.517);
        opacity: .9;
        transition: all .5s;
        cursor: pointer;
    }
    &::before{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/pexels-leon-ardho-2468366.jpg") center/cover no-repeat;
        z-index: 1;

    }
`
const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 35px;
    width: 100%;
    max-width: 1000px;
    margin: 40px auto;
    min-height: 80vh;
    padding: 30px 20px;
    padding-bottom: 50px;

    & div {
        text-align: center;
        min-width: 240px;
        max-width: 500px;
    }
    & div h4{
        color: #ec9737d1;
        font-size: 3rem;
        font-weight: 400;
        text-shadow: 2px 2px 4px rgba(196, 194, 194, 0.08);
        text-align: start;
    }
    &  div p{
        font-size: 1.4rem;
        font-weight: 300;
        text-align: start;
        color: #a3a3a3;
        margin-top: 10px;
    }
    &>.content-right{
        align-self: flex-end;
    }

    &>.content-right  p,>.content-right  h4{
        text-align: end ;
        white-space: normal;
    }
`

const HomePage = () => {

    return (
        <Container>
            <HeaderApp text='Login' />
            <Main >
                <ContainerImg>
                    <h2>
                        ¡Welcome <br /> to <br /> Fit<span>Now!</span>
                    </h2>
                    <Link to={'/register'}>Sign up</Link>
                </ContainerImg>
                <ContainerContent>
                    <div>
                        <h4> Find the perfect exercises for you</h4>
                        <p>We have a wide variety of exercises that you can do in the gym to strengthen your muscles, improve your resistance and burn calories. All the exercises on our list have been carefully selected by our fitness experts to ensure they are aligned with your training goals.</p>
                    </div>
                    <div className='content-right'>
                        <h4> Customize your training routine </h4>
                        <p>Once you've found the exercises that best suit your training goals, you can customize your training routine to achieve better results. Create a routine that fits your schedule and goals, and start putting it to use in the gym today!</p>
                    </div>
                    <div>
                        <h4> Customize your training routine</h4>
                        <p>Once you've found the exercises that best suit your training goals, you can customize your training routine to achieve better results. Create a routine that fits your schedule and goals, and start putting it to use in the gym today!</p>
                    </div>

                </ContainerContent>
            </Main>
            <FooterApp />

        </Container>
    )
}

export default HomePage
