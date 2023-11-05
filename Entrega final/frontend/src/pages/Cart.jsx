import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/Spinner';
import axios from '../utils/axios'
import { Toaster, toast } from 'sonner';
import { CartList } from '../components/CartList';

export const Cart = () => {
    const { user } = useAuth()
    if (user === null) return <Spinner />
    
    const [purchaseButtonText, setPurchaseButtonText] = useState('Purchase my cart');
    const apiUrl = `http://localhost:9090/api/carts/${user.cart}`
    const { data, isLoading, error, refetch } = useFetch(apiUrl);

    if (isLoading) return <Spinner />;
    if (error) return <div>Error: {error.message}</div>;

    const totalPrice = () => {
        const total = data.payload.products.reduce((total, product) => total + (product.product.price * product.quantity), 0);
        return total.toFixed(2);
    }


    const handleDelete = (productId) => {
        const apiUrlDelete = `http://localhost:9090/api/carts/${user.cart}/products/${productId}`
        try {
            const res = axios.delete(apiUrlDelete)
                .then(result => {
                    toast.success('Product deleted successfully')
                    refetch()
                })
        } catch (error) {
            toast.success('Error trying to delete product from cart')
            refetch()
        }
    }

    const handleUpdate = (quantity, productId) => {
        const apiUrlUpate = `http://localhost:9090/api/carts/${user.cart}/products/${productId}`
        try {
            const res = axios.put(apiUrlUpate, {"quantity": quantity})
                .then(result => {
                    toast.success('Product updated successfully')
                    refetch()
                })
        } catch (error) {
            toast.success('Error trying to update product from cart')
            refetch()
        }
    }

    const handlePurchase = async() => {
        setPurchaseButtonText('Purchasing cart...');

        const apiUrlPurchase = `http://localhost:9090/api/carts/${user.cart}/purchase`
        try{
            const res = axios.get(apiUrlPurchase)
            .then(result => {
                if(result.data.payload.outOfStockProducts){
                    setPurchaseButtonText('Purchase my cart');
                    toast.error('There is no stock for any product, for products that are in stock will be purchased')
                }else{
                    toast.success('Cart purchased successfully, check your email to see your ticket code')
                    setPurchaseButtonText('Purchased');
                    refetch()
                }
            })
        }catch(error){
            toast.error('Error trying to purchase cart')
            refetch()
        }
    }

    return (
        <div className='container mx-auto min-h-screen mt-2 px-8'>
            <Toaster position="top-right" richColors closeButton />
            <p className='text-4xl font-bold text-myDarkColor mb-5'>My cart</p>
            <CartList data={data} user={user} handleDelete={handleDelete} handleUpdate={handleUpdate} />
            <div className='mt-5'>
                <hr />
                <div className='flex justify-between mt-2 items-center'>
                    <p>Total price: <span className='font-bold text-myLightGreen'>${totalPrice()}</span></p>
                    <button onClick={handlePurchase} className='btn'>{purchaseButtonText}</button>
                </div>
            </div>
        </div>
    )
}
