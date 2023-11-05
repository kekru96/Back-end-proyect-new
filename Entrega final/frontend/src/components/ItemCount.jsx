import React from 'react'

export const ItemCount = ({ max, amount, setAmount }) => {
    const handleSubtract = () => {
        amount > 1 && setAmount(amount - 1)
    }

    const handleAdd = () => {
        amount < max && setAmount(amount + 1)
    }

    return (
        <div className="mt-3 flex-col flex md:flex-row items-center gap-5">
            <div>
                <div className="flex items-center gap-5">
                <button
                    onClick={handleSubtract}
                    className={`block w-20 font-bold bg-red-500 focus:outline-none text-white ${amount === 1 ? 'hover:border-transparent' : 'hover:border-red-200 active:bg-red-800'}`}
                    disabled={amount === 1}>{amount === 1 ? "MIN" : '-'}
                </button>
                <p className="font-bold text-xl block w-5 text-center">{amount}</p>
                <button
                    onClick={handleAdd}
                    className={`block w-20 font-bold text-white bg-green-600 focus:outline-none ${amount === max ? 'hover:border-transparent' : 'hover:border-green-200 active:bg-green-800'}`}
                    disabled={amount === max}>{amount === max ? "MAX" : '+'}
                </button>
                </div>
            </div>
            <button className="block w-60 btn">Add to cart</button>
        </div>
    )
}
