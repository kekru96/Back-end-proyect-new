import React, { useState } from 'react'
import { Spinner } from '../components/Spinner';
import useFetch from '../hooks/useFetch';
import { Link, useParams } from 'react-router-dom';
import { ItemCount } from '../components/ItemCount';
import { useAuth } from '../context/AuthContext';
import axios from '../utils/axios'
import { RelatedProducts } from '../components/RelatedProducts';
import { Toaster, toast } from 'sonner';

export const ProductDetail = () => {
  const { productId } = useParams()
  const { user, isAuthenticated } = useAuth()
  const apiUrl = `http://localhost:9090/api/products/${productId}`;
  const { data, isLoading, error } = useFetch(apiUrl);

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const res = axios.post(`/carts/${user.cart}/products/${data.payload.product._id}`)
        .then(result => {
          toast.success('Product added to cart successfully')
        })
    } catch (error) {
      toast.success('Error trying to add product to cart')
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <Toaster position="top-right" richColors closeButton />
      <div className='container mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
        <div className='hidden md:grid grid-cols-2 grid-rows-2 place-items-center gap-2'>
          {data.payload.product.thumbnails.map((img) => (
            <img src={img} key={img} alt="Product image" />
          ))}
        </div>
        <div className='block md:hidden'>
          <img src={data.payload.product.thumbnails[0]} alt="Product image" />
        </div>
        <div>
          <p className='text-4xl font-bold'>{data.payload.product.title}</p>
          <p className='text-xl text-myLightGreen font-semibold'>${data.payload.product.price}</p>
          <span className='text-sm font-light'>About this product</span>
          <p>{data.payload.product.description}</p>
          <form onSubmit={handleSubmit}>
            {
              isAuthenticated
                ?
                <button className="btn mt-2">Add to cart</button>
                :
                <Link className="btn mt-2" to="/login">Log in to buy</Link>
            }
          </form>
          <hr className='my-4' />
          <RelatedProducts category={data.payload.product.category} />
        </div>
      </div>
    </>
  )
}
