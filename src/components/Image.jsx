import React from 'react'

const Image = ({ image, name, className }) => {
  return <img src={image} alt={name} className={`w-full ${className}`} />
}

export default Image
