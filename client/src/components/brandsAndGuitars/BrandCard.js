import React from 'react'

const BrandCard = ({ _id, brand, brandLogoUrl }) => {
  return (
    <div className='card' id={_id}>
      <div className='card-content'>
        <img src={brandLogoUrl} />
        <h4 className='card-title'>{brand}</h4>
        <p className='card-body'>
          some text about the brand, some other things about the brand, and
          some more..
        </p>
        <button className='card-btn info'>Learn more</button>
        <button className='card-btn guitars'>Guitars</button>
      </div>
    </div>
  )
}

export default BrandCard

// TODO
// <Link> card with id
