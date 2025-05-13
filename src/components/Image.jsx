import React from 'react'

const Image = ({ image, name, className }) => {
  return <img src={image} alt={name} className={`w-full aspect-[16/16] ${className}`} loading='lazy' />
}

export default Image
