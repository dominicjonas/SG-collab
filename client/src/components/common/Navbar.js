import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav>
        <div className='search-field'>
          <h2>Search...</h2>
        </div>
        <Link to='/' className='nav-title'>
          <h2>
            <span>S</span>ignature
            <span>G</span>uitar
            <span>S</span>tore
          </h2>
        </Link>
        <div className='auth-btns'>
          <button className='login-btn'>login</button>
          <button className='register-btn'>register</button>
        </div>
      </nav>
      <div className='nav-container'>
        <Link to='/brands' className='nav-link'>
          brands
        </Link>
        <Link to='/' className='nav-link middle-link'>
          signature guitars
        </Link>
        <Link to='/' className='nav-link'>
          artists
        </Link>
      </div>
    </>
  )
}

export default Navbar
