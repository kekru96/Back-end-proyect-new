import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../assets/hero.png'

export const Hero = () => {

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <Link to="/products?page=1&limit=10&sort=default">
        <img src={hero} alt="Hero image" className="w-full h-full object-cover object-center hover:scale-110 transition-all" />
      </Link>
    </div>
  )
}