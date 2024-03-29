import React, { SetStateAction, useEffect } from 'react'
import { daysOfWeek } from '../static'

type Props = {
    day: string,
    setDay: React.Dispatch<SetStateAction<string>>
}

const Days = ({ day, setDay }: Props) => {
  useEffect(() => {
    const currentDate = new Date()
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDayName = daysOfWeek[currentDate.getDay()]

    setDay(currentDayName)
  }, [])
  return (
        <div className='pt-40  max-w-screen-xl mx-auto p-8 flex justify-center  relative z-10 '>
            <nav className=' flex md:justify-center flex-wrap gap-3 md:gap-5 w-full px-10  items-center overflow-x-auto '>
                {
                    daysOfWeek.map((item) => (
                        <div onClick={() => setDay(item.name)} key={item.id} className={`flex border-2 border-gray-400 h-20 w-20 md:h-24 md:w-24 shadow-sm  rounded-full  p-6 gap-2 flex-col justify-center items-center 
                        ${day.toLowerCase() === item.name.toLowerCase() && 'border-sky-600'} transition-all duration-500 cursor-pointer`}>

                            <h3
                                className={`font-bold text-gray-400  text-xs ${day.toLowerCase() === item.name.toLowerCase() &&
                                    'text-primary'}`}>{item.name}</h3>
                        </div>
                    ))
                }
            </nav>

        </div>
  )
}

export default Days
