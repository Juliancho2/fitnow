import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  children: React.ReactNode,
  path?: string,
  onClick?: () => void,
  type?: "button" | "submit" | "reset" | undefined
}

const BtnAction = ({ children, path, onClick, type = "button", ...props }: Props) => {
  return (
    <>
      {
        !path ?
          <button {...props} type={type} onClick={onClick} className=" relative z-10 flex items-center justify-center border-none bg-[#11E0F8] rounded-md px-10 py-5px text-white h-[36px] w-[130px] mt-10 text-center font-bold text-lg hover:opacity-60 transition-all duration-200">{children}</button>
          : <Link
            {...props}
            to={path}
            className="relative z-10 flex items-center justify-center border-none bg-[#11E0F8] rounded-md px-10 py-5px text-white h-[36px] w-[130px] mt-10 text-center font-bold text-lg hover:opacity-60 transition-all duration-200"

          >
            {children}
          </Link>
      }
    </>
  )
}

export default BtnAction
