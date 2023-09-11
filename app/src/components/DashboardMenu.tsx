import React from 'react'
import { Link } from 'react-router-dom'

const routes = [
  { img: "routine.svg", label: "My routine", path: "/dashboard/routine", id: 0 },
  { img: "calculatorc.svg", label: "Bmi calculator", path: "/dashboard/calculator", id: 1 },
  { img: "exercise.svg", label: "Search exercise", path: "/dashboard/search", id: 2 },
]

const DashboardMenu = () => {
  return (
    <div className='min-h-[450px] px-10'>
      <div className='grid grid-cols-2 grid-rows-2 gap-3 h-full '>
        {
          routes.map((item) => (
            <Link to={item.path} key={item.id} className={`${item.id === 0 && 'col-span-2'} flex flex-col items-center justify-center  rounded-lg hover:opacity-60 hover:border-gray-600 transition-all duration-300 border border-gray-300 bg-blue-400 bg-opacity-5`}>
              <div className='flex flex-col gap-3 items-center'>
                <img src={item.img} className='w-52' alt="" />
                <h2 className='text-primary font-bold text-2xl'>{item.label}</h2>
              </div>
            </Link>
          ))
        }

      </div>
    </div>
  )
}

export default DashboardMenu
