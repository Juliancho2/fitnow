import React from 'react'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const FooterApp = () => {
  return (
    <footer className="w-full bg-[#E7E9EE]  py-5">
      <div className="grid grid-cols-2 w-full max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 gap-5 p-5 col-span-2">
          <div className="flex flex-col gap-2 justify-start">
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              <p>+33758127283</p>
            </div>
            <div className="flex items-center text-lg text-gray-700">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              <p>fitnow@gmail.com</p>
            </div>
          </div>
          <div className="text-end">
            <div className="flex items-center justify-end gap-5">
              <Link to={''}>
                <FontAwesomeIcon icon={faInstagram} className="text-3xl text-gray-700" />
              </Link>
              <Link to={''}>
                <FontAwesomeIcon icon={faFacebook} className="text-3xl text-gray-700" />
              </Link>
            </div>

          </div>
        </div>
        <p className="text-lg text-center text-gray-700 col-span-2">© 2023 All rights reserved.</p>
      </div>
    </footer>
  )
}

export default FooterApp
