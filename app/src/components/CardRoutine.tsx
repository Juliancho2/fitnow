import { faEdit, faEllipsisVertical, faPlay, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { SetStateAction, useState } from 'react'
import { DataFromApiExercise, RootState } from '../interface'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExerciseFromRoutine } from '../redux/thunk'
import { activeEditExerciseModal, setExerciseSidebar } from '../redux/slice/dataExerciseSlice'
import { AppDispatch } from '../redux/store/store'

type Props = {
  exerciseData: DataFromApiExercise,
  dayActive: string,
  setOpenSideBar: React.Dispatch<SetStateAction<boolean>>,
}

const CardRoutine = ({ exerciseData, dayActive, setOpenSideBar }: Props) => {
  const { token } = useSelector((state: RootState) => state.user)
  const [gifUrl, setGifUrl] = useState('')
  const [menuRemove, setMenuRemove] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleRemove = () => {
    setMenuRemove(!menuRemove)
  }

  const handleSideBar = () => {
    setOpenSideBar(true)
    dispatch(setExerciseSidebar(exerciseData))
  }
  const handleEditModal = () => {
    dispatch(activeEditExerciseModal(true))
    dispatch(setExerciseSidebar(exerciseData))
  }
  const removeExerciseAction = (id: string) => {
    Swal.fire({
      title: 'Are you sure you want to delete this exercise?',
      showCancelButton: true
    }).then((result) => {
      const idAndToken = { id, token, name: dayActive }
      if (result.isConfirmed) {
        dispatch(deleteExerciseFromRoutine(idAndToken))
      }
    })
    setMenuRemove(!menuRemove)
  }
  return (
    <>
      {
        gifUrl.trim().length > 0 &&
        (
          <div className='animate-scaleImg fixed top-0 left-0 w-full h-full flex justify-center items-center z-40 '>
            <div className='w-[450px] relative z-20    rounded-md shadow-lg overflow-hidden '>
              <FontAwesomeIcon onClick={() => setGifUrl('')} icon={faXmark} className='absolute right-5 top-5 p-1 bg-gray-200 h-6 w-6 rounded-full cursor-pointer' />

              <img src={gifUrl} alt="" className='w-full' />
            </div>
          </div>
        )
      }
        <div
          className={`cursor-grab block max-w-xs p-4 shadow-sm shadow-indigo-100  rounded-md bg-white relative ${exerciseData.complete ? 'border border-sky-400' : 'border'}`}>
          <div className='absolute right-5 '>
            <FontAwesomeIcon onClick={() => handleRemove()} icon={faEllipsisVertical} className='text-gray-600 hover:opacity-50   cursor-pointer text-2xl w-4' />
            {
              menuRemove &&
              <button onClick={() => removeExerciseAction(exerciseData.id)} className='flex gap-3 hover:text-red-500 bg-white shadow-md absolute left-0 z-10 items-center p-1 rounded-md text-gray-500'>
                Remove
                <FontAwesomeIcon icon={faTrash} />
              </button>
            }
          </div>
          <div className='cursor-pointer' onClick={() => setGifUrl(exerciseData.gifUrl)}>
            <img
              alt="Home"
              src={exerciseData.gifUrl}
              className=" w-full rounded-md object-cover"
            />
          </div>

          <div className="mt-2">
            <dl>
              <div>
                <dt className="sr-only">Address</dt>

                <dd className="font-medium">{exerciseData.name}</dd>
              </div>
              <div>
                <dt className="sr-only">Price</dt>

                <dd className="text-sm text-gray-500">{exerciseData.bodyPart}</dd>
              </div>

            </dl>

            <div className="mt-6 flex items-center justify-between gap-8 text-xs">
              <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                <svg
                  className="h-4 w-4 text-indigo-700"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>

                <div className="mt-1.5 sm:mt-0">
                  <p className="text-gray-500">Equipament</p>

                  <p className="font-medium">{exerciseData.equipment}</p>
                </div>
              </div>
              <div
                className='flex w-full flex-col gap-5 items-end'>
                <button
                  onClick={() => handleEditModal()}
                  className='bg-btn w-20 text-white rounded-md py-1 px-3 hover:opacity-60'>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                {
                  !exerciseData.complete &&
                  (
                    <button
                      onClick={() => handleSideBar()}
                      className='bg-btn w-20 text-white rounded-md py-1 px-3 hover:opacity-60'>
                      <FontAwesomeIcon icon={faPlay} />
                    </button>
                  )

                }
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default CardRoutine
