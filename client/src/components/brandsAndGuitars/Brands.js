import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllBrands } from '../api/callerFunctions.js'
import BrandCard from './BrandCard.js'

const Brands = () => {
  const [brands, setBrands] = useState([])

  useEffect(() => {
    getAllBrands().then((brands) => {
      setBrands(brands)
    })
  }, [])

  console.log('this is the brands state:', brands)

  return (
    <>
      <div className='header-container'>
        <h1 className='sgs-header'>SGS Brands Page</h1>
        <Link to='/' className='btn'>
          Back Home
        </Link>
        <hr className='header-hr' />
      </div>
      <div className='brand-cards-container'>
        {brands.map((brand) => (
          <BrandCard
            key={brand._id}
            brand={brand.brand}
            placeOfOrigin={brand.placeOfOrigin}
            brandLogoUrl={brand.brandLogoUrl}
          />
        ))}
      </div>
    </>
  )
}

export default Brands
