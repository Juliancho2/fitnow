import React, { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  children?: ReactElement;
  isAllowed: boolean;
  redirectTo?: string;
}

export const ProtectRoutes = ({ children, isAllowed, redirectTo = '/' }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }
  return (
    children || <Outlet />
  )
}
