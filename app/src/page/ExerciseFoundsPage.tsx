import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HeaderApp from '../components/HeaderApp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExerciseDbApi } from '../redux/thunk'
import { RootState } from '../interface'
import CardExercise from '../components/CardExercise'
import ModalAddExercise from '../components/ModalAddExercise'
import { AppDispatch } from '../redux/store/store'
import SpinnerComponent from '../components/SpinnerComponent'

const ExerciseFoundsPage = () => {
  const params = useParams()
  const dispath = useDispatch<AppDispatch>()
  const { dataSearch, exerciseToAdd, isLoading } = useSelector((state: RootState) => state.dataApi)

  useEffect(() => {
    dispath(fetchExerciseDbApi({ name: params.name }))
  }, [])

  return (
    <div className='relative'>
      {
        exerciseToAdd.modalActive && <ModalAddExercise />
      }
      <HeaderApp />
      <div className='px-10'>
        <div className='absolute opacity-5'>
          <img src="https://district0x.io/images/hero-blobs.png" alt="" />
        </div>
        <h2 className='py-40 text-4xl max-w-screen-xl mx-auto font-bold'>Results: {params.name}</h2>
        <div className='max-w-screen-xl pb-40 mx-auto grid sm:grid-cols-2 justify-center md:grid-cols-4 gap-4 relative z-10'>

          {isLoading && <SpinnerComponent styles='border-4 border-sky-600 animate-spin col-span-full w-6 h-8 rounded-full mx-auto' />}

          {
            (dataSearch.length > 0 && !isLoading) && dataSearch.map((exercise) => (
              <CardExercise key={exercise.id} exerciseData={exercise} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExerciseFoundsPage
