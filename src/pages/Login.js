import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('/dashboard')
    } catch {
      setError('Fallo al crear la cuenta')
    }
    
    setLoading(false)
  }

  return (
    <div>
      <section className="login">
        <div className="loginContainer">
          <h1>Inicia Sesión</h1>
          { error && <h1>{error}</h1> }
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              autoFocus
              required
              ref={emailRef}
            />
            <label>Password</label>
            <input
              type='password'
              required
              ref={passwordRef}
            />
            <div className="btnContainer">
              <button type='submit' disabled={loading}>Inicia Sesión</button>
              <p>No tienes cuenta? <Link to='/signup'><span>Registrate</span></Link></p>
              <p>Olvidaste tu contraseña? <Link to='/forgot-password'><span>Recuperarla</span></Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
