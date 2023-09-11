import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import HeaderApp from '../components/HeaderApp'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExerciseDbApi } from '../thunk'
import { RootState } from '../type'
import CardExercise from '../components/CardExercise'
import ModalAddExercise from '../components/ModalAddExercise'

const ExerciseFoundsPage = () => {
  const params = useParams()
  const dispath = useDispatch()
  const { isLoading, dataSearch, exerciseToAdd } = useSelector((state: RootState) => state.dataApi)



  useEffect(() => {
    dispath(fetchExerciseDbApi({ name: params.target }))
  }, [])

  return (
    <div className='relative'>
      {
        exerciseToAdd.modalActive && <ModalAddExercise />
      }
      <HeaderApp />
      <div className='absolute opacity-5'>
        <img src="https://district0x.io/images/hero-blobs.png" alt="" />
      </div>
      <h2 className='py-40 text-4xl max-w-screen-xl mx-auto font-bold'>Results: {params.id}</h2>
      <div className='max-w-screen-xl pb-40 mx-auto grid sm:grid-cols-2 justify-center md:grid-cols-4 gap-4 relative z-10'>
        {
          dataSearch.length > 0 && dataSearch.map((exercise) => (
            <CardExercise exerciseData={exercise} />
          ))
        }
      </div>
    </div>
  )
}

export default ExerciseFoundsPage
