import React, { useEffect, useState } from 'react'
import { daysOfWeek } from '../static'
import { useDispatch, useSelector } from 'react-redux'
import { desactiveAddExerciseModal } from '../redux/slice/dataExerciseSlice'
import { RootState } from '../interface'
import { addRoutine } from '../redux/thunk'
import Swal from 'sweetalert2'
import { setError } from '../redux/slice/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { AppDispatch } from '../redux/store/store'

const initialForm = {
  title: '',
  serial: '',
  repeat: '',
  complete: false
}

const ModalAddExercise = () => {
  const { token, errorMessage } = useSelector((state: RootState) => state.user)
  const { exerciseToAdd } = useSelector((state: RootState) => state.dataApi)
  const dispatch = useDispatch<AppDispatch>()

  const [formData, setFormData] = useState(initialForm)

  const [day, setDay] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (errorMessage.isError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: errorMessage.name,
        showConfirmButton: false,
        timer: 1500
      })
    }

    return () => {
      dispatch(setError())
    }
  }, [errorMessage.isError])

  const handleClickOutside = () => {
    dispatch(desactiveAddExerciseModal())
  }

  const handleFormClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { exerciseItem } = exerciseToAdd

    const data = {
      exersiceItem: { ...exerciseItem, ...formData },
      day
    }

    if (formData.repeat.trim().length === 0 ||
    formData.serial.trim().length === 0 || day.trim().length === 0) {
      return Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Fields required',
        showConfirmButton: false,
        timer: 1500
      })
    }

    const res = await dispatch(addRoutine({ data, token }))
    console.log(res)
    if (res.payload) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Added success',
        showConfirmButton: false,
        timer: 1500
      })
    }

    setFormData(initialForm)
    setDay('')
    dispatch(desactiveAddExerciseModal())
  }

  return (
    <div onClick={handleClickOutside} className='fixed  flex items-center w-full top-0 left-0 min-h-screen z-40 bg-black bg-opacity-10'>
      <div className='w-[420px] h-[250px] mx-auto flex justify-center items-center'>
        <form onSubmit={(e) => handleSubmit(e)} onClick={(e) => handleFormClick(e)} className='relative grid grid-cols-2 border border-gray-300 rounded-md animate-scaleImg  bg-white shadow-md w-full h-full py-6 px-8 gap-3 items-center'>
          <FontAwesomeIcon onClick={() => handleClickOutside()} className='absolute top-5 right-5 h-6 w-6 text-gray-400' icon={faXmark}/>
          <h2 className='col-span-2 text-center font-semibold text-xl text-primary'>Add exercise: {exerciseToAdd.exerciseItem.name}</h2>
          <div>
            <label htmlFor="" >Day*</label>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDay(e.target.value)}
              value={day}
              name="day"
              id="HeadlineAct"
              className="h-12 w-full rounded-lg border border-gray-300 text-gray-700 sm:text-sm"
            >
              <option value="">Please day</option>
              {
                daysOfWeek.map((day) => (
                  <option key={day.id} value={day.name}>{day.name}</option>
                ))
              }

            </select>
          </div>
          <div>
            <label htmlFor="" >Number of the serial*</label>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.serial}
              name="serial"
              id="HeadlineAct"
              type='number'
              placeholder='Please enter serial number'
              className=" h-12 w-full rounded-lg border border-gray-300 text-gray-700 sm:text-sm px-4"
            />
          </div>
          <div>
            <label htmlFor="" >Number of the repetitions*</label>
            <input
              onChange={(e) => handleChange(e)}
              value={formData.repeat}
              type='number'
              name="repeat"
              id="HeadlineAct"
              placeholder='Please enter the number of repetitions'
              className=" h-12 w-full rounded-lg border border-gray-300 text-gray-700 sm:text-sm px-4"
            />
          </div>
          <div className='col-span-2'>
            <button type='submit' className='bg-btn w-40 h-10 text-base text-white rounded-md border border-gray-300 hover:opacity-50 transition-all duration-200'>Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalAddExercise
