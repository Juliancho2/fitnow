import React from 'react';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterApp = () => {
  return (
    <footer className="w-full bg-[#E7E9EE]  py-5">
      <div className="grid grid-cols-1 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 gap-5 p-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <p>+33758127283</p>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <p>fitnow@gmail.com</p>
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 p-5 ">
            <FontAwesomeIcon icon={faInstagram} className="text-2xl text-gray-700" />
            <FontAwesomeIcon icon={faFacebook} className="text-2xl text-gray-700" />
          </div>
        </div>
        <div className="col-span-2 text-center">
          <p className="text-lg font-bold text-gray-700 my-6">
            Made by 👽 <a href="https://www.twitter.com/julianchoms" target="_blank" className="text-blue-500">@julianchoms</a>
          </p>
          <p className="text-sm text-gray-700">© 2023 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
