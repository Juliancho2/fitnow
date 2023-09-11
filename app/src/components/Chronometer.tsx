import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, SetStateAction } from 'react';

const Temporizador = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval = 0;
    if (active) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setActive(false);
            }
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, hours, minutes, seconds]);

  const handleIncrement = (setter:React.Dispatch<SetStateAction<number>>, value:number) => {
    if (value < 59) {
      setter(value + 1);
    }
  };

  const handleDecrement = (setter:React.Dispatch<SetStateAction<number>>, value:number) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const iniciarTemporizador = () => {
    setActive(true);
  };

  const detenerTemporizador = () => {
    setActive(false);
  };

  const reiniciarTemporizador = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setActive(false);
  };

  return (
    <div className=' space-y-10 min-h-[200px] max-w-2xl mx-auto rounded-md'>
      <div className='flex gap-20 '>
        <div className='flex flex-col gap-4'>
          <span className='text-2xl text-center'>Hours</span>
          <div className='text-center text-3xl'>{hours}</div>
          <div className='flex gap-10'>
            <span
              onClick={() => handleIncrement(setHours, hours)}
              className='bg-gray-500 p-2 w-10 text-center rounded-md text-white'
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span
              onClick={() => handleDecrement(setHours, hours)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <span className='text-2xl text-center'>Minutes</span>
          <div className='text-center text-3xl'>{minutes}</div>
          <div className='flex gap-10'>
            <span
              onClick={() => handleIncrement(setMinutes, minutes)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span
              onClick={() => handleDecrement(setMinutes, minutes)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <span className='text-2xl text-center'>Seconds</span>
          <div className='text-center text-3xl'>{seconds}</div>
          <div className='flex gap-10'>
            <span
              onClick={() => handleIncrement(setSeconds, seconds)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span
              onClick={() => handleDecrement(setSeconds, seconds)}
              className='bg-gray-500 p-2 rounded-md text-white w-10 text-center'
            >
              <FontAwesomeIcon icon={faMinus} />
            </span>
          </div>
        </div>
      </div>
      <div className='flex gap-5  justify-start'>
        <button className='bg-btn w-full text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={iniciarTemporizador}>Iniciar</button>
        <button className='bg-btn text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={detenerTemporizador}>Detener</button>
        <button className='bg-btn text-white p-2 rounded-md hover:opacity-50 transition-all duration-200' onClick={reiniciarTemporizador}>Reiniciar</button>
      </div>
    </div>
  );
};

export default Temporizador;






