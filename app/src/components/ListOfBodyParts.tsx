import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../interface'
import SpinnerComponent from './SpinnerComponent'
import BtnAction from './BtnAction'

interface BodyParts {
    name: string,
    description?: string
}
interface Props {
    data: BodyParts[]
}


const ListOfBodyParts = ({ data }: Props) => {
    const { bodyItems, isLoading, errorMessage } = useSelector((state: RootState) => state.bodyTarget)
    return (
        <div className='pt-32 pb-20 max-w-screen-xl mx-auto relative z-10 px-10' >
            {
                (isLoading && bodyItems.length === 0) && <SpinnerComponent styles='border-4 border-sky-600 animate-spin w-6 h-8 rounded-full mx-auto' />
            }
            {
                errorMessage.isError && <h2 className='text-center font-bold text-red-500 text-2xl'>{errorMessage.name}</h2>
            }
            {
                bodyItems.length > 0 &&
                <>
                    <h2 className='text-primary font-bold text-4xl my-10  '>Choose the set of muscles</h2>
                    <ul className='grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto'>
                        {
                            data && data.map((item, index) => (
                                <div className=' min-h-[200px] flex flex-col border border-gray-300 rounded-md bg-blue-400 bg-opacity-5' key={index}>
                                    <img src="/imgs/bgCard.jpg" alt="" className='h-32 w-full object-cover opacity-30' />
                                    <div className='h-full  flex flex-col gap-4 justify-center p-8'>
                                        <h4 className='text-primary font-bold text-2xl'>{item.name}</h4>
                                        <p className='text-gray-400 font-semibold'>{item.description}</p>
                                        {/* <Link to={'/dashboard/search/' + item.name} className='bg-btn w-44 text-center text-white py-2 rounded-sm hover:opacity-50 transition-all duration-200'>Search</Link> */}
                                        <BtnAction path={'/dashboard/search/' + item.name}>Search</BtnAction>
                                    </div>
                                </div>
                            ))
                        }
                    </ul>
                </>
            }
        </div >
    )
}

export default ListOfBodyParts
