import React, { SetStateAction } from 'react'
import { useSelector } from 'react-redux';
import { DataUser } from '../slice/userSlice';
import CardRoutine from './CardRoutine';
import useDrag from '../hooks/useDrag';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RootState {
    user: DataUser
}

type Props = {
    dayActive: string,
    setOpenSideBar: React.Dispatch<SetStateAction<boolean>>,

}

const ExercisesComplete = ({ dayActive, setOpenSideBar }: Props) => {
    const userState = useSelector((state: RootState) => state.user);
    const { routine } = userState;
    const { startDrag, onDrop, draggingOver } = useDrag(dayActive)

    return (
        <>
            <h2 className='text-sky-600  text-4xl font-semibold my-20 '>
                Complete
                <FontAwesomeIcon className='mx-4' icon={faSquareCheck} />
            </h2>
                
            <div
                onDragOver={(evt => draggingOver(evt))}
                onDrop={(evt => onDrop(evt))}
                className='grid sm:grid-cols-2 justify-center  md:grid-cols-4 min-h-[200px] w-full  p-10 shadow-sm  bg-opacity-25 bg-sky-400  max-w-7xl gap-2'>
                {
                    routine && 
                    routine
                        .filter(item => item.day === dayActive)
                        .map(item => item.exersiceItem)
                        .filter(item => item.length > 0)
                        .map(item =>
                            item
                                .filter(exercise => exercise.complete)
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
                    routine && (
                       
                        routine.filter(item => item.day === dayActive)
                        .map(item => item.exersiceItem)
                        .map((item) => (
                            item.filter(item => (item.complete))
                        ))[0]?.length === 0 && <div className='flex flex-col my-6 items-center w-full col-span-full'>
                            <p className='text-4xl text-center text-slate-500'>Drag completed exercises</p>

                        </div>

                    )

                }
            </div>
        </>
    )
}

export default ExercisesComplete
