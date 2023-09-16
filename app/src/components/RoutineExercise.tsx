import React, { useState } from 'react'
import SideBar from './SideBar'
import ExercisesToDo from './ExercisesToDo'
import ExercisesComplete from './ExercisesComplete'
import {  useSelector } from 'react-redux'
import { RootState } from '../interface'
import ModalEdit from './ModalEdit'
import { DragDropContext,  } from '@hello-pangea/dnd'
import useDrag from '../hooks/useDrag'

type Props = {
    dayActive: string
}

const RoutineExercise = ({ dayActive }: Props) => {
    const [openSideBar, setOpenSideBar] = useState(false);
    const { exerciseSideBar } = useSelector((state: RootState) => state.dataApi)
    const {handleDrapAndDrop}=useDrag(dayActive)

    return (
        <section className='mt-5 max-w-7xl mx-auto grid rounded-md relative z-10 pb-32'>
            {
                openSideBar && <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
            }
            {
                exerciseSideBar.modalActive && <ModalEdit dayActive={dayActive} />
            }
            <DragDropContext onDragEnd={(res)=>handleDrapAndDrop(res)}>
                <ExercisesToDo setOpenSideBar={setOpenSideBar} dayActive={dayActive} />
                <ExercisesComplete setOpenSideBar={setOpenSideBar} dayActive={dayActive} />
            </DragDropContext>
        </section>
    )
}

export default RoutineExercise
