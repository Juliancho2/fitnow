import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store/store'
import { setClose } from '../redux/slice/modalSlice'
import { FormLogin, RootState } from '../interface'
import { faEye, faEyeSlash, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { loginUser } from '../redux/thunk'
import SpinnerComponent from './SpinnerComponent'
import Swal from 'sweetalert2'
import { setError, setIsLoading } from '../redux/slice/userSlice'

const initialForm: FormLogin = {
  username: '',
  password: ''
}

type Props = {
  setIsLoggin: (value: React.SetStateAction<boolean>) => void
}

const Login = ({ setIsLoggin }: Props) => {
  const [form, setForm] = useState(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const userState = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  const navigate = useNavigate()
  const { isLogged, isLoading, errorMessage } = userState

  useEffect(() => {
    if (isLogged) {
      navigate('/dashboard')
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }, [isLogged])

  useEffect(() => {
    if (errorMessage.isError) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: errorMessage.name,
        showConfirmButton: false,
        timer: 1500
      })
    }

    return () => {
      dispatch(setError())
      dispatch(setIsLoading(false))
    }
  }, [errorMessage.isError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser(form))
    setForm(initialForm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center animate-scaleImg">
      <div className="w-[400px]  h-[300px] bg-white shadow-lg rounded-lg p-8 relative">
        <div className="">
          <FontAwesomeIcon
            onClick={() => dispatch(setClose())}
            className='absolute top-5 right-5 text-xl text-gray-400 cursor-pointer'
            icon={faXmark}
          />
          <form onSubmit={handleSubmit} className='mt-10 px-8'>
            <div className="mb-4">
              <label className="block text-gray-600  font-semibold text-base" htmlFor="username">
                Username
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FontAwesomeIcon className="text-gray-400 ml-2" icon={faUser} />
                <input
                  autoComplete="current-username"
                  className="w-full py-2 px-2 outline-none"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  name="username"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-base font-semibold" htmlFor="password">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded">
                <FontAwesomeIcon className="text-gray-400 ml-2" icon={faLock} />
                <input
                  autoComplete="current-password"
                  className="w-full py-2 px-2 outline-none"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  name="password"
                />
                {showPassword
                  ? (
                  <FontAwesomeIcon
                    onClick={() => setShowPassword(false)}
                    className="text-gray-400 mr-2 cursor-pointer"
                    icon={faEye}
                  />
                    )
                  : (
                  <FontAwesomeIcon
                    onClick={() => setShowPassword(true)}
                    className="text-gray-400 mr-2 cursor-pointer"
                    icon={faEyeSlash}
                  />
                    )}
              </div>
            </div>
            <p className="text-gray-600 text-base flex items-center justify-center gap-1">
              Are you not account?{' '}
              <Link to="#" onClick={() => setIsLoggin(false)} className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
            <button
              className="w-full py-2 px-4 bg-[#11E0F8] hover:bg-blue-600 text-white font-semibold rounded-md mt-4"
              type="submit"
            >
              {!isLoading ? 'Log in' : <SpinnerComponent styles='border-4 border-white animate-spin w-6 h-8 rounded-full mx-auto' />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
