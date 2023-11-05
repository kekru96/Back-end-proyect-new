import React from 'react'
import useFetch from '../hooks/useFetch';
import { Spinner } from './Spinner';
import { Link } from 'react-router-dom'

export const RelatedProducts = ({ category }) => {
    const apiUrl = `http://localhost:9090/api/products?limit=4&query=${category}`;
    const { data, isLoading, error } = useFetch(apiUrl);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div>
            <p>Related products</p>
            <div className='flex flex-col md:flex-row  justify-around items-center gap-2 mt-4'>
                {data.payload.products.map((product) => (
                    <Link to={`/detail/${product._id}`} className='w-full h-56' key={product._id}>
                        <div className='h-20 overflow-hidden'>
                            <img className='w-full h-full object-contain object-center' src={product.thumbnails[0]} alt={product.title} />
                        </div>
                        <div className='flex items-center justify-center flex-col'>
                            <p className='text-myDarkColor text-center'>{product.title}</p>
                            <p className='font-semibold text-sm text-myLightGreen'>${product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}