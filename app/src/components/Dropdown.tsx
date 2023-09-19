import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../interface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { logOut } from '../redux/slice/userSlice'

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { username } = useSelector((state:RootState) => state.user)
  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleMenu}
        className="px-4 flex items-center gap-1 border border-gray-300 rounded-md py-2 text-sm  font-bold text-slate-400  focus:outline-none focus:text-gray-900"
      >
        {username}
        <FontAwesomeIcon icon={faChevronDown}/>
      </button>
      {
        isOpen &&
        <div
        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg "
      >
        <div className="py-1 bg-white rounded-md shadow-xs ">
          <Link
            to="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/routine"
            className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100"
          >
            My Routine
          </Link>
          <Link
            to="#"
            onClick={() => handleLogOut()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
          >
            Logout
          </Link>
        </div>
      </div>
      }
    </div>
  )
}

export default DropdownMenu
