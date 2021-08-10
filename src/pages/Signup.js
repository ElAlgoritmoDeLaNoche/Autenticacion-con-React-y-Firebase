import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
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
          <h1>Registrate</h1>
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
              <button type='submit' disabled={loading}>Registrate</button>
              <p>Ya tienes cuenta? <Link to='/login'><span>Inicia Sesión</span></Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
