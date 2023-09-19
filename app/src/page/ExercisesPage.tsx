import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderApp from '../components/HeaderApp'
import ListOfBodyParts from '../components/ListOfBodyParts'
import { AppDispatch } from '../redux/store/store'
import { fetchBodyTarget } from '../redux/thunk'
import { RootState } from '../interface'

const ExercisesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { bodyItems } = useSelector((state:RootState) => state.bodyTarget)

  useEffect(() => {
    dispatch(fetchBodyTarget())
  }, [])

  return (
        <div className='min-h-[100vh] relative'>
            <HeaderApp />
            <div className='absolute opacity-10'>
                <img src="https://district0x.io/images/hero-blobs.png" alt="" />
            </div>

            <ListOfBodyParts data={bodyItems} />

        </div>
  )
}

export default ExercisesPage
