import React from 'react'
import { Product } from './Product'
import { Link } from 'react-router-dom'

export const ProductList = ({ products, pagination }) => {
  return (
    <>
      <main className='grid grid-cols-2 lg:grid-cols-4 lg:gap-5'>
        {products.map((product) => (
          <Product key={product._id} product={product}/>
        ))}
      </main>
      <div className='w-full flex justify-center items-center gap-4 mt-5'>
          {pagination.hasPrevPage ? <Link className='btn btn-sm bg-myLightGreen' to={pagination.prevLink}>{pagination.prevPage}</Link>: <button className='btn btn-sm btn-disabled'>-</button>}
          <p>{pagination.page}</p>
          {pagination.hasNextPage ? <Link className='btn btn-sm bg-myLightGreen' to={pagination.nextLink}>{pagination.nextPage}</Link>: <button className='btn btn-sm btn-disabled'>-</button>}
        </div>
    </>
  )
}
