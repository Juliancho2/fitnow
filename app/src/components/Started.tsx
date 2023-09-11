import React from 'react';

const Started = () => {
  return (
    <section  className="bg-started relative bg-center bg-cover bg-blur-xl h-[40vh] ">
      <div className="absolute  z-10 bg-opacity-70 h-full w-full bg-black"></div>
      <div className='absolute opacity-70 flex justify-center w-full'>
        <img src="https://district0x.io/images/parts/hero-cloud3.png" alt="" />
      </div>

      <div className="flex flex-col justify-center items-center w-full h-full  max-w-screen-xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-white z-20">Get started</h3>
        <button className="bg-[#11E0F8] px-2 z-20 border-none rounded-md text-white w-40  font-bold mt-3  hover:opacity-70 transition-all duration-500 ease-in-out cursor-pointer py-3 text-xl">
          Start To Free
        </button>
      </div>
    </section>
  );
};

export default Started;
