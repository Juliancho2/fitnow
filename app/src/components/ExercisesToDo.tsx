import React, { SetStateAction } from 'react'
import useDrag from '../hooks/useDrag'
import { useSelector } from 'react-redux';
import { DataUser } from '../slice/userSlice';
import CardRoutine from './CardRoutine';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faSquareCheck as faSquare } from '@fortawesome/free-regular-svg-icons';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SpinnerComponent from './SpinnerComponent';

interface RootState {
    user: DataUser
}

type Props = {
    dayActive: string,
    setOpenSideBar: React.Dispatch<SetStateAction<boolean>>,
}

const ExercisesToDo = ({ dayActive, setOpenSideBar }: Props) => {
    const userState = useSelector((state: RootState) => state.user);
    const { routine, loading } = userState;
    const { startDrag, onDrop, draggingOver } = useDrag(dayActive)

    return (
        <>
            <div className='flex justify-between'>
                <h2 className='text-sky-600  text-4xl font-semibold mb-20 '>
                    Exercises to do
                    <FontAwesomeIcon className='mx-4' icon={faSquare} />
                </h2>
                <Link to={'/dashboard/search'} >
                    <button className='h-20 w-20 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:text-gray-700'>
                        <FontAwesomeIcon icon={faPlus} className='text-gray-400 text-2xl'></FontAwesomeIcon>
                    </button>
                </Link>
            </div>

            <div
                onDragOver={(evt => draggingOver(evt))}
                onDrop={(evt => onDrop(evt))}
                className='grid p-10 gap-2 min-h-[200px] sm:grid-col-2   md:grid-cols-4 shadow-sm max-w-7xl bg-gray-200 bg-opacity-30'>

                {
                    loading && <SpinnerComponent styles='border-4 border-blue-400 animate-spin w-6 h-8 rounded-full mx-auto' />
                }
                {routine &&
                    routine
                        .filter(item => item.day === dayActive)
                        .map(item => item.exersiceItem)
                        .filter(item => item.length > 0)
                        .map(item =>
                            item
                                .filter(exercise => !exercise.complete) // Filtrar solo si complete es false
                                .map(exercise => (
                                    <CardRoutine
                                        dragStart={startDrag}
                                        setOpenSideBar={setOpenSideBar}
                                        dayActive={dayActive}
                                        key={exercise.id}
                                        exerciseData={exercise}
                                    />
                                ))
                        )
                }
                {
                    routine && 
                    (routine.filter(item => item.day === dayActive).length === 0
                    ||
                    routine.filter(item => item.day === dayActive).every(item => item.exersiceItem.length === 0)) && (
                    <div className='flex flex-col my-6 items-center w-full col-span-full'>
                        <p className='text-4xl text-center text-primary'>There are no exercises on this day.</p>

                    </div>
                )
                }


            </div>

        </>
    )
}

export default ExercisesToDo
