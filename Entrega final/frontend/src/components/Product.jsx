import React from 'react';
import { Link } from 'react-router-dom';

export const Product = ({ product }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <Link to={`/detail/${product._id}`} className='w-64 h-80 flex flex-col justify-between items-center gap-2 hover:scale-105 transform transition-transform duration-300'>
      <img
        src={product.thumbnails[0]}
        alt={product.title}
        className="h-40 w-auto"
      />
      <div className="px-2">
        <h3 className="text-gray-800 text-lg font-semibold">{product.title}</h3>
        <div className='flex justify-between items-center gap-5'>
          <p className="text-green-600 text-xl font-bold">${product.price}</p>
          <p className="text-gray-500 text-sm">{product.stock} in stock</p>
        </div>
      </div>
    </Link>
  );
};
