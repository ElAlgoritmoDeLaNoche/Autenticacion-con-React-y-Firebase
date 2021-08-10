import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div className="hero">
      <nav>
        <h2>Bienvenido</h2>
        <div className="menu">
          <button><Link to='/login'>Inicia Sesión</Link></button>
          <button><Link to='/signup'>Registrate</Link></button>
        </div>
      </nav>
    </div>
  )
}

export default home