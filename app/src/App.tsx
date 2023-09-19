import React, { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './page/HomePage'
import DashboardPage from './page/DashboardPage'
import { ProtectRoutes } from './components/ProtectRoutes'
import { useDispatch, useSelector } from 'react-redux'

import { setLogged, setUser } from './redux/slice/userSlice'
import RoutinePage from './page/RoutinePage'
import { RootState } from './interface'
import ExercisesPage from './page/ExercisesPage'
import CalculatorPage from './page/CalculatorPage'
import ExerciseFoundsPage from './page/ExerciseFoundsPage'
import NotFound from './components/NotFound'
import { AppDispatch } from './redux/store/store'
import SpinnerComponent from './components/SpinnerComponent'

function App () {
  const { isLogged } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
    if (loggedUserJSON) {
      dispatch(setUser(JSON.parse(loggedUserJSON)))
      // Establece isLogged como true después de cargar el estado de autenticación
    } else {
      dispatch(setLogged(false))
    }
  }, [isLogged])

  if (isLogged === null) {
    // Si isLogged es null, puedes mostrar un indicador de carga o lo que consideres apropiado
    return <SpinnerComponent styles='border-4 border-white animate-spin w-6 h-8 rounded-full mx-auto' />
  }

  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />} />

        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/routine' element={<RoutinePage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/search' element={<ExercisesPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} redirectTo={'/dashboard'} />}>
          <Route path='/dashboard/search/:name' element={<ExerciseFoundsPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/calculator' element={<CalculatorPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />

      </Routes>
    </div >
  )
}

export default App
