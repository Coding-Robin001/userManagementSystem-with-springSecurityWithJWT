import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from "./component/navigation/navbar/Navbar"
import LoginPage from "./component/auth/LoginPage"
import ProfilePage from "./component/usersPage/ProfilePage"import RegistrationPage from "./component/auth/RegistrationPage"
import UserManagementPage from "./component/usersPage/UserManagement"
import UpdateUser from "./component/usersPage/UpdateUser"
import { adminOnly } from './component/service/UserService'

function App() {

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/profile' element={<ProfilePage />} />

            {
              adminOnly() && (
                <>
                  <Route path='/register' element={<RegistrationPage />} />
                  <Route path='/admin/userManagement' element={<UserManagementPage />} />
                  <Route path='/updateUser/:userId' element={<UpdateUser />} />
                </>
               )
            } 

            <Route path='*' element={<Navigate to="/login" />} />

          </Routes>
        </div>
        <footer />
      </div>
    </BrowserRouter>
  )
}

export default App
