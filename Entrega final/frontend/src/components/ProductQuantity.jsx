import React from 'react'
import { useState } from 'react'

export const ProductQuantity = ({ amount, max, productId, handleUpdate }) => {
    const [quantity, setQuantity] = useState(amount)

    const handleSubtract = () => {
        quantity > 1 && setQuantity(quantity - 1)
    }

    const handleAdd = () => {
        quantity < max && setQuantity(quantity + 1)
    }

    return (
        <div className='h-full flex flex-col justify-around items-center'>
            <div className="flex items-center gap-5">
                <button
                    onClick={handleSubtract}
                    className='btn btn-error btn-sm w-14 '
                    disabled={quantity === 1}>{quantity === 1 ? "MIN" : '-'}
                </button>
                <p className="font-bold text-xl block w-5 text-center">{quantity}</p>
                <button
                    onClick={handleAdd}
                    className='w-14 btn btn-success btn-sm'
                    disabled={quantity === max}>{quantity === max ? "MAX" : '+'}
                </button>
            </div>
            <button onClick={ () =>  handleUpdate(quantity, productId)} className='btn btn-sm'>Update</button>
        </div>
    )
}
