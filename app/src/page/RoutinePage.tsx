import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderApp from '../components/HeaderApp'
import RoutineExercise from '../components/RoutineExercise'
import { AppDispatch } from '../store/store'
import { fetchRoutineData } from '../thunk'
import { RootState } from '../type'
import Days from '../components/Days'

const RoutinePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const userState = useSelector((state: RootState) => state.user);
    const { token } = userState;
    const [day, setDay] = useState("monday")


    return (
        <div className='animate-loadPage min-h-screen  box-border relative'>
            <HeaderApp />
            <div className='absolute opacity-5'>
                <img src="https://district0x.io/images/hero-blobs.png" alt="" />
            </div>
            <Days day={day} setDay={setDay} />
            <RoutineExercise dayActive={day} />
        </div>
    )
}

export default RoutinePage
