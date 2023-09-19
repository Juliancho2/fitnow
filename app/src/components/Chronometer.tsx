import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect, SetStateAction } from 'react'

const Temporizador = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    let interval = 0
    if (active) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1)
            setSeconds(59)
          } else {
            if (hours > 0) {
              setHours(hours - 1)
              setMinutes(59)
              setSeconds(59)
            } else {
              setActive(false)
            }
          }
        }
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [active, hours, minutes, seconds])

  const handleIncrement = (setter: React.Dispatch<SetStateAction<number>>, value: number) => {
    if (value < 59) {
      setter(value + 1)
    }
  }

  const handleDecrement = (setter: React.Dispatch<SetStateAction<number>>, value: number) => {
    if (value > 0) {
      setter(value - 1)
    }
  }

  const formatTime = (value: number) => {
    // La función padStart garantiza que haya dos dígitos en el número
    return value.toString().padStart(2, '0')
  }

  const startTimer = () => {
    setActive(true)
  }

  const stopTimer = () => {
    setActive(false)
  }

  const resetTimer = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setActive(false)
  }

  return (
    <div className=' space-y-5 min-h-[200px] max-w-2xl mx-auto my-8 rounded-md'>
      <section className='grid md:grid-cols-2 gap-4 items-center'>
        <div className='flex border-2 rounded-full h-80 w-80 items-center justify-center'>
          <div className='flex flex-col '>
            <div className='text-center text-5xl text-gray-500'>{formatTime(hours)}</div>

          </div>:
          <div className='flex flex-col '>
            <div className='text-center text-5xl text-gray-500'>{formatTime(minutes)}</div>

          </div>
          :
          <div className='flex flex-col '>
            <div className='text-center text-5xl text-gray-500'>{formatTime(seconds)}</div>

          </div>
        </div>

        <div className='flex gap-8 justify-center'>
          <div className='flex flex-col items-center gap-2'>
            <span
              onClick={() => handleIncrement(setHours, hours)}
              className='bg-gray-500 p-2 w-10 text-center rounded-md text-white'
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span>Hours</span>
            <span
              onClick={() => handleDecrement(setHours, hours)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>

          <div className='flex flex-col gap-2 items-center'>
            <span
              onClick={() => handleIncrement(setMinutes, minutes)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span>Minutes</span>
            <span
              onClick={() => handleDecrement(setMinutes, minutes)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>

          <div className='flex flex-col gap-2 items-center'>
            <span
              onClick={() => handleIncrement(setSeconds, seconds)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faPlus} />

            </span>
            <span>Seconds</span>
            <span
              onClick={() => handleDecrement(setSeconds, seconds)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>

        </div>
      </section>

      <div className='flex gap-5 max-w-md   justify-start'>
        <button className='bg-btn w-full text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={startTimer}>Start</button>
        <button className='bg-btn text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={stopTimer}>Stop</button>
        <button className='bg-btn text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default Temporizador
