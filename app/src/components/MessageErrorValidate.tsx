import React from 'react'

interface Props {
    message: Array<string> | []
}

const MessageErrorValidate = ({ message = [] }: Props) => {
  return (
        <div className='  text-center'>
            {
                message.map((message, index) => (<p className='text-red-500' key={index}>* {message}</p>))
            }
        </div>
  )
}

export default MessageErrorValidate
