import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Spinner } from './Spinner';

export const ProductsCarousel = () => {
  const apiUrl = 'http://localhost:9090/api/products?limit=10&sort=desc';
  const { data, isLoading, error } = useFetch(apiUrl);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      keyBoardControl={true}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      className='mt-5'
    >
      {data.payload.products.map((product) => (
        <Link to={`/detail/${product._id}`} className='w-full h-56' key={product._id}>
          <div className='h-40 overflow-hidden'>
            <img className='w-full h-full object-contain object-center' src={product.thumbnails[0]} alt={product.title} />
          </div>
          <div className='flex items-center justify-center flex-col'>
            <p className='text-myDarkColor text-center'>{product.title}</p>
            <p className='font-bold text-myLightGreen'>${product.price}</p>
          </div>
        </Link>
      ))}
    </Carousel>
  )
}