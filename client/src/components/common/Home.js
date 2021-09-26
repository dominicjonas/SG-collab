import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className='header-container'>
        <h1 className='sgs-header'>SGS!!</h1>
        <Link to='/brands' className='btn'>
          Brands
        </Link>
        <hr className='header-hr' />
      </div>
    </div>
  )
}

export default Home
