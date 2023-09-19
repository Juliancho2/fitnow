import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store/store'
import { RootState } from '../interface'
import DropdownMenu from './Dropdown'
import { setActive } from '../redux/slice/modalSlice'

const HeaderApp = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isLogged } = useSelector((state: RootState) => state.user)

  const handleModal = (value: string) => dispatch(setActive(value))

  return (
    <header className="fixed top-0 left-0 w-full min-h-[60px] z-30 bg-white border-b border-gray-300">
      <nav className="w-full max-w-screen-xl mx-auto flex justify-between items-center px-3">
        <div className="ml-4">
          <Link to={'/'}>
            <img src="/logo.svg" alt="" className="w-[50px]" />
          </Link>
        </div>
        {isLogged
          ? (
          <DropdownMenu/>
            )
          : (
          <div className="flex justify-end items-center gap-5">
            <Link
              to={'#'}
              className="text-decoration-none text-[#2c2c2c] font-bold w-50% h-100 text-center text-base py-2 px-5  rounded-md hover:bg-d9790cd1"
              style={{ border: '1.5px solid #11E0F8' }}
              onClick={() => handleModal('login')}
            >
              Log in
            </Link>
            <Link
              to={'#'}
              className="text-decoration-none text-white  bg-[#11E0F8]  font-bold w-50% h-100 text-center text-base mr-4 py-2 px-5  rounded-md hover:bg-d9790cd1"

              onClick={() => handleModal('signup')}
            >
              Sign up
            </Link>
          </div>
            )}
      </nav>
    </header>
  )
}

export default HeaderApp
