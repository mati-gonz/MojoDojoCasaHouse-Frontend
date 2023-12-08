import LoginForm from '../components/logInForm'
import AdminView from './AdminView'
import { useState } from 'react'
import '../assets/styles/views/logIn.css'

const AdminLogin = () => {
  const [user, setUser] = useState([])

  return (
    <div className='logInLayout'>
      {
        !user.length > 0
          ? <LoginForm setUser={setUser}/>
          : <AdminView/>
      }
    </div>
  )
}

export default AdminLogin
