import React from 'react'
import styled from 'styled-components'

interface Props {
    message: Array<string> | []
}

const Container = styled.div`
    position: absolute;
    bottom: -50px;
    text-align: center;
    &>p{
        color: #f44343;
    }
`
const MessageErrorValidate = ({ message = [] }: Props) => {
    return (
        <Container className='message-error'>
            {
                message.map((message, index) => (<p key={index}>* {message}</p>))
            }
        </Container>
    )
}

export default MessageErrorValidate
