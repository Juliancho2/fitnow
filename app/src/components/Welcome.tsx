import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../type'
import Clock from './Clock'

const Welcome = () => {
    const {username}=useSelector((state:RootState)=>state.user)

  return (
    <div className='mx-auto'>
        <div className='h-full w-full space-y-8 flex flex-col justify-center'>
            <h2 className='font-bold text-7xl text-[#1CB7E4]'>¡Hi {username}!</h2>
            <Clock/>
            <img src="dash.svg" alt="" className='w-[300px] drop-shadow-md' />
        </div>
    </div>
  )
}

export default Welcome
