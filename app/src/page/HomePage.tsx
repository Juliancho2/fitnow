import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import FooterApp from '../components/FooterApp';
import { features } from '../static';
import Started from '../components/Started';
import BmiCalculator from '../components/BmiCalculator';
import hero from '/hero.svg';
import ModalAuth from '../components/ModalAuth';
import { ModalInterface } from '../type';

const HomePage = () => {
  const { isActive, mode } = useSelector((state: ModalInterface) => state.modal);

  return (
    <div className="min-h-screen w-full animate-loadedPage">
      {isActive && <ModalAuth mode={mode} />}
      <HeaderApp />
      <main className="h-auto">
        <div className="relative flex flex-col justify-center items-center w-full min-h-screen pt-[80px]">
          <div className='absolute opacity-10'>
            <img src="https://district0x.io/images/hero-blobs.png" alt="" />
          </div>
          <h2 className="text-7xl text-center  font-bold text-[#1F2937] z-2 max-w-[800px] mb-10 relative z-10">
            Unlock Your Potential, Transform Your Fitness
          </h2>
          <p className="font-semibold text-2xl text-gray-500 z-2 mb-20 relative z-10">
            Discover Your Ideal Fitness Journey: Tailor-Made Workouts, Personalized Results
          </p>
          <Link
            to="/register"
            className=" relative z-10 flex items-center border-none bg-[#11E0F8] rounded-md px-10 py-5px text-white h-[36px] w-[130px] mt-10 text-center font-bold text-lg hover:opacity-40"
          >
            Start To Free
          </Link>
          <img src={hero} alt="" className="w-[450px] mt-[40px]" />
        </div>
        <div className=" flex flex-col justify-center space-y-40 w-full max-w-[1300px] mx-auto min-h-[80vh] px-[80px] pb-[80px]">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`md:flex items-center space-x-8 md:w-[700px] ${feature.id === 1 ? 'md:self-end' : ''}`}
            >
              <img
                src={feature.img}
                alt=""
                className="w-[280px] h-[250px]"
              />
              <div>
                <h4 className="text-5xl font-bold text-[#1F2937]">

                  {feature.title}
                </h4>
                <svg width="329" height="330" viewBox="0 0 329 330" fill="none" xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute mt-36 hidden md:block  h-auto w-56 text-gray-600 lg:block"><path d="M49.4338 281.625C82.5158 295.39 157.097 293.77 150.777 202.011C147.515 154.651 176.889 66.7823 320.48 94.1868" stroke="#E9E9EE" stroke-width="3" stroke-linecap="round"></path><path d="M8.05684 234.256C41.1389 248.021 115.72 246.401 109.4 154.642C106.138 107.282 135.512 19.4132 279.103 46.8177" stroke="#E9E9EE" stroke-width="3" stroke-linecap="round"></path></svg>
                <p className="text-[1.5rem] font-normal text-gray-500 mt-10 ">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <BmiCalculator color='bg-[#F5FEFD]'/>
        <Started />
      </main>
      <FooterApp />
    </div>
  );
};

export default HomePage;
