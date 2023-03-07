import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store/store'
import { logOut } from '../slice/userSlice'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
width: 100%;
min-height: 60px;
background: #FFFFFF;
box-shadow: 0 4px 6px rgba(196, 196, 196, 0.106);
z-index: 4;
`
const Left = styled.div`
    margin-left: 20px;
    &>a{
        display: flex;
    align-items: center;
    }
    &>a img{
        width: 70px;
    }

`
const Right = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
width: 200px;
height: 25px;
& a{
    text-decoration: none;
    color: #ffffff;
    font-weight: 400;
    width: 50%;
    height: 100%;
    text-align: center;
    font-size: 1rem;
    margin-right: 20px;
    padding: 5px 8px;
    background: #ec9737d1;
    box-shadow: 0 0 4px 2px rgba(179, 178, 178, 0.168);
    border-radius: 3px;
}
& a:hover{
    opacity: .9;
    transition: all .5s;
    background: #d9790cd1;
}
&>.routine-link{
    background: none;
    box-shadow: none;
    color: #ec9737d1;
    :hover{
        background: none;
        opacity: .7;
    }
}
`
type Props = {
    text?: string | undefined
}

const HeaderApp = ({ text }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    let routeButton = '/login';
    if (text?.toLowerCase().replace(/\s/g, '') === 'logout') routeButton = ''

    const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => dispatch(logOut())

    return (
        <Container>
            <Left>
                <Link to={location.pathname === '/' ? '/' : '/dashboard'}><img src="/logo.png" alt="" /></Link>
            </Left>
            {
                (location.pathname === '/' || location.pathname === '/dashboard' || location.pathname === '/dashboard/routine') && (
                    <Right>
                        <Link className='routine-link' to={'/dashboard/routine'}>My routine</Link>
                        <Link to={routeButton} onClick={handleLogOut}>{text}</Link>
                    </Right>
                )
            }
        </Container >
    )
}

export default HeaderApp
