const express = require('express')
// const CartManager = require('../dao/filesystem/CartManager') // old manager
const cartManager = require('../dao/mongo/cart.mongo') 

const router = express.Router()
// const cm = new CartManager("./src/data/carts.json") // old instance of CartManager

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

router.post('/:cid/product/:pid', async (req, res) => {
    try{
        await cartManager.addProductToCart(req.params.cid, req.params.pid)
        res.status(200).send({status: 'succes', payload: await cartManager.getCarts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

module.exports = router;