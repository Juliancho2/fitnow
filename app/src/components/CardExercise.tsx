import React, { useState } from 'react'
import { DataFromApiExercise } from '../interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { activeAddExerciseModal } from '../redux/slice/dataExerciseSlice'

type Props = {
  exerciseData: DataFromApiExercise
}

const CardExercise = ({ exerciseData }: Props) => {
  const dispatch = useDispatch()

  const [gifUrl, setGifUrl] = useState("")

  return (
    <>
      {
        gifUrl.trim().length > 0 &&
        (
          <div className='animate-scaleImg fixed top-0 left-0 w-full h-full flex justify-center items-center z-40'>
            <div className='w-[450px] relative z-20    rounded-md shadow-lg overflow-hidden '>
              <FontAwesomeIcon onClick={() => setGifUrl("")} icon={faXmark} className='absolute top-5 right-5 p-1 bg-gray-200 h-6 w-6 rounded-full cursor-pointer' />
              <img src={gifUrl} alt="" className='w-full' />
            </div>
          </div>
        )
      }
      <div className="block max-w-md p-4 shadow-sm shadow-indigo-100  bg-white">
        <div  className='cursor-pointer' onClick={() => setGifUrl(exerciseData.gifUrl)}>
          <img
            alt="Home"
            src={exerciseData.gifUrl}
            className=" w-full rounded-md object-cover"
          />
        </div>

        <div className="mt-2">
          <dl>
            <div>
              <dt className="sr-only">Price</dt>

              <dd className="text-sm text-gray-500">{exerciseData.bodyPart}</dd>
            </div>

            <div>
              <dt className="sr-only">Address</dt>

              <dd className="font-medium">{exerciseData.name}</dd>
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
            <div >
              <button onClick={() => dispatch(activeAddExerciseModal(exerciseData))} className='bg-btn py-2 px-4 text-base text-white rounded-md'>Add to my routine</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardExercise

