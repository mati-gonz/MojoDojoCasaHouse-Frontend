import '../assets/styles/components/logInForm.css'
import { useState } from 'react'

const LoginForm = ({ setUser }) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name === '' || password === '') {
      setError(true)
      return
    }
    setError(false)

    setUser([name, password])
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
          onChange={e => setName(e.target.value)}/>
          <input
          type="password"
          className='inputField'
          value={password}
          onChange={e => setPassword(e.target.value)}/>
          <button className='submitButton'>Iniciar Sesión</button>
          {error && <p className='errorStyle'>Todos los campos son obligatorios</p>}
        </form>
      </section>
  )
}

export default LoginForm
