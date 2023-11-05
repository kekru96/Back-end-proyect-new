import React from 'react'
import { Link } from 'react-router-dom'
import { ProductQuantity } from '../components/ProductQuantity';

export const CartList = ({ data, user, handleDelete, handleUpdate }) => {
    return (
        <div className='flex flex-col gap-5'>
            {data.payload.products.map((product) => (
                <div className='flex justify-between' key={product.product._id}>
                    <Link to={`/detail/${product.product._id}`} className='flex items-start gap-5'>
                        <div className='h-20 overflow-hidden'>
                            <img className='w-full h-full object-contain object-center' src={product.product.thumbnails[0]} alt={product.product.title} />
                        </div>
                        <div className='flex justify-center flex-col'>
                            <p className='text-myDarkColor text-center'>{product.product.title}</p>
                            <p className='font-semibold text-sm text-myLightGreen'>${product.product.price}</p>
                        </div>
                    </Link>
                    <div className='flex gap-5'>
                        <ProductQuantity productId={product.product._id} amount={product.quantity} max={product.product.stock} handleUpdate={handleUpdate} />
                        <button onClick={() => handleDelete(product.product._id)} className='btn btn-error h-full'>DELETE</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
