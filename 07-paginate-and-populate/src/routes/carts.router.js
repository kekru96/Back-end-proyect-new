const express = require('express')
const cartManager = require('../dao/mongo/cart.mongo') 

const router = express.Router()

router.get('/:cid', async (req, res) => {
    try{
        res.status(200).send({status: 'succes', payload: await cartManager.getCartById(req.params.cid)})
    }catch(error){  
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/', async (req, res) => {
    try{
        await cartManager.createCart()
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/:cid/products/:pid', async (req, res) => {
    try{
        await cartManager.addProductToCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.put('/:cid', async (req, res) => {
    try{
        const { products } = req.body
        await cartManager.updateCart(req.params.cid, products)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    try{
        const quantity = req.body.quantity
        await cartManager.updateQuantity(req.params.cid, req.params.pid, quantity)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.delete('/:cid/products/:pid', async (req,res) => {
    try{
        await cartManager.deleteProductFromCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.delete('/:cid', async (req,res) => {
    try{
        await cartManager.deleteAllProductsFromCart(req.params.cid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

module.exports = router;