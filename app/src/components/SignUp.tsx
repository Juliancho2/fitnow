import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setClose } from '../redux/slice/modalSlice'
import { ErrorsForm, FormValues, RootState } from '../interface'
import { faEye, faEyeSlash, faLock, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import MessageErrorValidate from './MessageErrorValidate'
import { useForm } from '../hooks/useForm'
import Swal from 'sweetalert2'
import { setError, setIsLoading } from '../redux/slice/userSlice'
import SpinnerComponent from './SpinnerComponent'

const initialForm: FormValues = {
  username: '',
  password: '',
  confirmPassword: ''
}

const validateForm = (form: FormValues) => {
  const errors: ErrorsForm = {}

  const regexusername = /^[a-zA-Z0-9._-]{3,15}$/
  const regexPassword = /^.{4,}$/

  if (!form.username.trim()) {
    errors.username = 'The field username is required'
  } else if (!regexusername.test(form.username.trim())) {
    errors.username = 'Username is invalided'
  }
  if (!form.password.trim()) {
    errors.password = 'The field password is required'
  } else if (!regexPassword.test(form.password.trim())) {
    errors.password = 'Password is invalided'
  }
  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = 'The field confirm password is required'
  } else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match'

  return errors
}
type Props = {
    setIsLoggin: (value: React.SetStateAction<boolean>) => void
}

const SignUp = ({ setIsLoggin }: Props) => {
  const dispatch = useDispatch()
  const {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm({ initialForm, validateForm })
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const { isLoading, errorMessage } = useSelector((state:RootState) => state.user)

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

  return (
        <div className="min-h-screen flex items-center justify-center animate-scaleImg">
            <div className="w-[400px]  bg-white shadow-lg rounded-lg p-8 relative">
                <div>
                    <FontAwesomeIcon
                        className='absolute top-5 right-5 text-xl text-gray-400 cursor-pointer'
                        onClick={() => dispatch(setClose())}
                        icon={faXmark}
                    />
                    <form onSubmit={handleSubmit} className='mt-10 px-8 flex flex-col gap-4 min-h-[300px] relative'>
                        <div>
                            <label htmlFor="username" className='text-base font-semibold'>Username</label>
                            <div className="flex items-center border border-gray-300 rounded px-2">
                                <FontAwesomeIcon className="text-gray-400 ml-2" icon={faUser} />
                                <input
                                    required
                                    value={form.username}
                                    name="username"
                                    type="text"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-2 px-2 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password " className='text-base font-semibold mt-10'>Password</label>
                            <div className="flex items-center border border-gray-300 rounded px-2">
                                <FontAwesomeIcon className="text-gray-400 ml-2" icon={faLock} />
                                <input
                                    required
                                    value={form.password}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-2 px-2 outline-none"
                                />
                                {!showPassword
                                  ? (
                                    <FontAwesomeIcon
                                        className='text-gray-400'
                                        onClick={() => setShowPassword(true)}
                                        icon={faEyeSlash}
                                    />
                                    )
                                  : (
                                    <FontAwesomeIcon
                                        className='text-gray-400'
                                        onClick={() => setShowPassword(false)}
                                        icon={faEye}
                                    />
                                    )}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className='text-base font-semibold'>Confirm password</label>
                            <div className="flex items-center border px-2 border-gray-300 rounded text-gray-600">
                                <FontAwesomeIcon className="text-gray-400 ml-2" icon={faLock} />
                                <input
                                    required
                                    value={form.confirmPassword}
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    name="confirmPassword"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full py-2 px-2 outline-none"
                                />
                                {!showPasswordConfirm
                                  ? (
                                    <FontAwesomeIcon
                                        className='text-gray-400'
                                        onClick={() => setShowPasswordConfirm(true)}
                                        icon={faEyeSlash}
                                    />
                                    )
                                  : (
                                    <FontAwesomeIcon
                                        onClick={() => setShowPasswordConfirm(false)}
                                        className='text-gray-400'
                                        icon={faEye}
                                    />
                                    )}
                            </div>
                        </div>

                        <p className="text-gray-600 text-base flex items-center justify-center gap-1">
                            Are you not account?{' '}
                            <Link to="#" onClick={() => setIsLoggin(true)} className="text-blue-500 hover:underline">
                                Log in
                            </Link>
                        </p>
                        <button
                            disabled={!!isLoading}
                            className="w-full py-2 px-4 bg-[#11E0F8]  hover:bg-blue-600 text-white font-semibold rounded-md mt-4"
                            type="submit"
                        >
                           {!isLoading ? 'Sign Up' : <SpinnerComponent styles='border-4 border-white animate-spin w-6 h-8 rounded-full mx-auto' />}
                        </button>
                        {Object.keys(errors).length >= 1 && <MessageErrorValidate message={Object.values(errors)} />}

                    </form>
                </div>
            </div>
        </div>
  )
}

export default SignUp
