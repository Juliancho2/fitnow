import './App.css'
import { Routes, Route, useNavigate, json } from 'react-router-dom'
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import DashboardPage from './page/DashboardPage'
import { ProtectRoutes } from './components/ProtectRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch } from './store/store'
import { setUser } from './slice/userSlice'
import RoutinePage from './page/RoutinePage'
import { RootState } from './type'

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
      navigate('/dashboard');
    }
  }, [])


  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='/dashboard/' element={<DashboardPage />} />
        </Route>
        <Route element={<ProtectRoutes isAllowed={!!isLogged} />}>
          <Route path='dashboard/routine' element={<RoutinePage />} />
        </Route>

      </Routes>
    </div >
  )

}

export default App
