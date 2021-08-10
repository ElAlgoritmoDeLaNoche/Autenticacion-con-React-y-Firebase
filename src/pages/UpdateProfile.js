import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default function UpdateProfile() {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Las contraseñas no son iguales')
    }

    const promises = []
    setLoading(true)
    setError('')

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
    .then(() => {
      history.push('/dashboard')
    })
    .catch(() => {
      setError('Fallo al actualizar')
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <div>
      <section className="login">
        <div className="loginContainer">
          <h1>Actualizar email</h1>
          { error && <h1>{error}</h1> }
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              autoFocus
              required
              ref={emailRef}
              defaultValue={currentUser.email}
            />
            <label>Password</label>
            <input
              type='password'
              required
              ref={passwordRef}
              placeholder='Deja en blanco para mantener la misma contraseña'
            />
            <label>Confirmar Password</label>
            <input
              type='password'
              required
              ref={passwordConfirmRef}
              placeholder='Deja en blanco para mantener la misma contraseña'
            />
            <div className="btnContainer">
              <button type='submit' disabled={loading}>Actualizar</button>
              <p><Link to='/dashboard'><span>Regresar</span></Link></p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
