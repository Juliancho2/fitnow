import React, { SetStateAction } from 'react'
import { useSelector } from 'react-redux'
import CardRoutine from './CardRoutine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { faPlus, faListCheck } from '@fortawesome/free-solid-svg-icons'
import SpinnerComponent from './SpinnerComponent'
import { RootState } from '../interface'
import { Droppable, Draggable } from '@hello-pangea/dnd'

type Props = {
    dayActive: string,
    setOpenSideBar: React.Dispatch<SetStateAction<boolean>>,
}

const ExercisesToDo = ({ dayActive, setOpenSideBar }: Props) => {
  const userState = useSelector((state: RootState) => state.user)
  const { routine, isLoading } = userState

  return (
        <>
            <div className='flex justify-between px-10'>
                <h2 className='text-sky-600  text-4xl font-semibold mb-20 '>
                    Exercises to do
                    <FontAwesomeIcon className='mx-4' icon={faListCheck} />
                </h2>
                <Link to={'/dashboard/search'} >
                    <button className='h-20 w-20 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:text-gray-700'>
                        <FontAwesomeIcon icon={faPlus} className='text-gray-400 text-2xl'></FontAwesomeIcon>
                    </button>
                </Link>
            </div>
            <Droppable direction='horizontal' droppableId='toDo'>
                {
                    (provide) => (
                        <div
                            {...provide.droppableProps}
                            ref={provide.innerRef}
                            className='grid p-10  gap-2 min-h-[200px] sm:grid-col-2 justify-center md:grid-cols-4 shadow-sm max-w-7xl bg-gray-200 bg-opacity-30'>

                            {
                                isLoading && <SpinnerComponent styles='border-4 border-blue-400 animate-spin w-6 h-8 rounded-full mx-auto' />
                            }
                            {routine &&
                                routine
                                  .filter(item => item.day === dayActive)
                                  .map(item => item.exersiceItem)
                                  .filter(item => item.length > 0)
                                  .map(item =>
                                    item
                                      .filter(exercise => !exercise.complete) // Filtrar solo si complete es false
                                      .map((exercise, index) => (
                                                <Draggable
                                                    index={index}
                                                    key={exercise.id}
                                                    draggableId={exercise.id.toString()}
                                                >
                                                    {
                                                        (provide) => (
                                                            <div
                                                                {...provide.draggableProps}
                                                                {...provide.dragHandleProps}
                                                                ref={provide.innerRef}
                                                            >
                                                                <CardRoutine
                                                                    // dragStart={startDrag}
                                                                    setOpenSideBar={setOpenSideBar}
                                                                    dayActive={dayActive}
                                                                    key={exercise.id}
                                                                    exerciseData={exercise}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                      ))
                                  )
                            }
                            {
                                (routine && routine.length > 0) &&
                                (routine.filter(item => item.day === dayActive).length === 0 ||
                                    routine.filter(item => item.day === dayActive).every(item => item.exersiceItem.length === 0)) && (
                                    <div className='flex flex-col my-6 items-center w-full col-span-full'>
                                        <p className='text-4xl text-center text-primary'>There are no exercises on this day.</p>

                                    </div>
                                )
                            }

                            {provide.placeholder}
                        </div>
                    )
                }
            </Droppable>

        </>
  )
}

export default ExercisesToDo
