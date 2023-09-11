import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './page/HomePage'
import DashboardPage from './page/DashboardPage'
import { ProtectRoutes } from './components/ProtectRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from './store/store'
import { setUser } from './slice/userSlice'
import RoutinePage from './page/RoutinePage'
import { RootState } from './type'
import ExercisesPage from './page/ExercisesPage'
import CalculatorPage from './page/CalculatorPage'
import ExerciseFoundsPage from './page/ExerciseFoundsPage'
import DetailExercise from './page/DetailExercise'
import NotFound from './components/NotFound'

function App() {
  const userState = useSelector((state: RootState) => state.user)
  const { isLogged } = userState;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      // const loggedUserParse = JSON.parse(loggedUserJSON);

      dispatch(setUser(JSON.parse(loggedUserJSON)));
      // navigate('/dashboard');
    }
  }, [])


  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />} />

        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/' element={<DashboardPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/routine' element={<RoutinePage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/search' element={<ExercisesPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} redirectTo={'/dashboard'} />}>
          <Route path='/dashboard/search/:target' element={<ExerciseFoundsPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/detail/:id' element={<DetailExercise />} />
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
