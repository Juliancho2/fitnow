import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction } from 'react'
import Temporizador from './Chronometer'
import { useSelector } from 'react-redux'
import { RootState } from '../interface'

type Props = {
    setOpenSideBar: React.Dispatch<SetStateAction<boolean>>,
    openSideBar: boolean
}

const SideBar = ({ setOpenSideBar, openSideBar }: Props) => {
  const { exerciseSideBar } = useSelector((state: RootState) => state.dataApi)

  return (
        <div className={`fixed px-10 flex flex-col top-0 h-full w-full md:w-[600px] right-0 bg-white shadow-sm border border-gray-300 z-20 pt-40 ${openSideBar ? 'animate-sideBar' : 'animate-closeSideBar'} `}>
            <div className='w-full flex justify-end'>
                <FontAwesomeIcon onClick={() => setOpenSideBar(false)} className='text-2xl text-gray-600 cursor-pointer' icon={faXmark} />
            </div>
            <Temporizador />
            <div className='border'>
                <section className='flex p-10'>
                    <div>
                        <img src={exerciseSideBar.exerciseItem.gifUrl} alt="" />
                    </div>
                    <div className='flex flex-col gap-5'>
                        <h2 className='font-bold text-4xl text-primary'>{exerciseSideBar.exerciseItem.name}</h2>
                        <hr />
                        <div>
                            <p className='text-xl font-semibold'> <strong className='text-2xl text-sky-600 mr-3'>Set:</strong> {exerciseSideBar.exerciseItem.serial}</p>

                            <p className='text-xl font-semibold'><strong className='text-2xl text-sky-600 mr-3'>Repetitions:</strong> {exerciseSideBar.exerciseItem.repeat}</p>
                            <div>

                                <p><p className='text-xl font-semibold'><strong className='text-2xl text-sky-600'>Equipment:</strong> {exerciseSideBar.exerciseItem.equipment}</p></p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  )
}

export default SideBar
