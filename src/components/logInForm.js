import '../assets/styles/components/logInForm.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LoginForm = ({ setUser }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [admin, setAdmin] = useState([])

  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin`)
        setAdmin(response.data)
        console.log(admin)
      } catch (error) {
        console.error('Error al obtener datos del backend:', error)
      }
    }
    fetchAdminUser()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(admin[0].name)

    if (name === '' || password === '') {
      setError(true)
    } else if (name === admin[0].name || password === admin[0].password) {
      setError(false)

      setUser([name, password])
    } else {
      alert('Credenciales Inválidas')
    }
  }

  return (
      <section>
        <form
        className='logInForm'
        onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
          className='inputField'
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder='username'/>
          <input
          type="password"
          className='inputField'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='password'/>
          <button className='submitButton'>Iniciar Sesión</button>
          {error && <p className='errorStyle'>Todos los campos son obligatorios</p>}
        </form>
      </section>
  )
}

export default LoginForm
