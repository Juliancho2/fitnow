import React, { useState } from 'react'
import SideBar from './SideBar'
import ExercisesToDo from './ExercisesToDo'
import ExercisesComplete from './ExercisesComplete'
import { useSelector } from 'react-redux'
import { RootState } from '../type'
import ModalEdit from './ModalEdit'

type Props = {
    dayActive: string
}

const RoutineExercise = ({ dayActive }: Props) => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const { exerciseSideBar } = useSelector((state: RootState) => state.dataApi)

    return (
        <section className='mt-5 max-w-7xl mx-auto grid rounded-md relative z-10 pb-32'>
            {
                openSideBar && <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
            }
            {
                exerciseSideBar.modalActive && <ModalEdit dayActive={dayActive}/>
            }
            <ExercisesToDo setOpenSideBar={setOpenSideBar} dayActive={dayActive}/>
            <ExercisesComplete setOpenSideBar={setOpenSideBar} dayActive={dayActive}/>
        </section>
    )
}

export default RoutineExercise
