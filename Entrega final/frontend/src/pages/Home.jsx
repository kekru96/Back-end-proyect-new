import React from 'react'
import { Hero } from '../components/Hero'
import { CategoryCard } from '../components/CategoryCard'
import { ProductsCarousel } from '../components/ProductsCarousel'

export const Home = () => {
  return (
    <div>
      <Hero />
      <div className='container mx-auto flex-col md:flex-row flex justify-between items-center gap-8 mt-5'>
        <CategoryCard
          image="https://images.pexels.com/photos/989939/pexels-photo-989939.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          text="Gaming"
          link="/products/videogames" />
        <CategoryCard 
          image="https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          text="Audio devices"
          link="/products/audio" />
        <CategoryCard
          image="https://images.pexels.com/photos/213162/pexels-photo-213162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          text="Home devices"
          link="/products/home-appliances" />
      </div>
      <div className='container mx-auto mt-5'>
        <h2 className='text-4xl font-bold text-myDarkColor'>Our more expensive products</h2> 
        <div>
          <ProductsCarousel />
        </div>
      </div> 
    </div>
  )
}