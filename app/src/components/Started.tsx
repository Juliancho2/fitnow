import React from 'react';
import BtnAction from './BtnAction';
import { useDispatch } from 'react-redux';
import { setActive } from '../redux/slice/modalSlice';

const Started = () => {
  const dispath=useDispatch()

  return (
    <section  className="bg-started relative bg-center bg-cover bg-blur-xl h-[40vh] ">
      <div className="absolute  z-10 bg-opacity-70 h-full w-full bg-black"></div>
      <div className='absolute opacity-70 flex justify-center w-full'>
        <img src="https://district0x.io/images/parts/hero-cloud3.png" alt="" />
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full  max-w-screen-xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-white z-20">Get started</h3>
        <BtnAction  onClick={()=>dispath(setActive('signup'))}>Start To Free</BtnAction>
      </div>
    </section>
  );
};

export default Started;
