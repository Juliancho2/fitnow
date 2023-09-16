import React,{ useState } from 'react'
import HeaderApp from '../components/HeaderApp'
import RoutineExercise from '../components/RoutineExercise'
import Days from '../components/Days'

const RoutinePage = () => {
    const [day, setDay] = useState("monday")


    return (
        <div className='animate-loadPage min-h-screen relative'>
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
