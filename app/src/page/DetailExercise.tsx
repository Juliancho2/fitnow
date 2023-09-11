import React from 'react'
import HeaderApp from '../components/HeaderApp'
import { useSelector } from 'react-redux'
import { RootState } from '../type'
import { useParams } from 'react-router-dom'

const DetailExercise = () => {
    const { isLoading, dataSearch } = useSelector((state: RootState) => state.dataApi)
    const { id } = useParams()

    return (
        <section className='min-h-screen'>
            <HeaderApp />
            <div className='py-40 max-w-screen-md mx-auto '>
                <h2>Aqui va el detail de los exercises</h2>
                {
                    dataSearch.filter((item) => item.id === id).map((item) => (
                        <div className='border border-gray-400 rounded-xl overflow-hidden flex items-center '>
                            <div className='h-[400px] w-[400px]'>
                                <img src={item.gifUrl} alt="" className='w-full h-full' />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-5xl text-primary font-bold'>{item.name}</h2>
                                <p><strong>Target: </strong>{item.target}</p>
                                <p><strong>Equipment</strong>: {item.target}</p>
                                <p><strong>Bodypart:</strong> {item.bodyPart}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            x
        </section>
    )
}

export default DetailExercise
