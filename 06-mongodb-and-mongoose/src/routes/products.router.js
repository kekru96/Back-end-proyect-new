const express = require('express')
const productManager = require('../dao/mongo/product.mongo')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const products = await productManager.getProducts()
        const { limit } = req.query
        limit ?
            res.status(200).send({
                status: 'succes',
                payload: products.slice(0, limit)})
            :
            res.status(200).send({
                status: 'succes',
                payload: products})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.get('/:pid', async (req, res) => {
    try{
        const product = await productManager.getProductById(req.params.pid)
        res.status(200).send({status: 'succes', payload: product})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const product = req.body
        await productManager.addProduct(product)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.put('/:pid', async (req, res) => {
    try{
        const product = req.body
        await productManager.updateProduct(req.params.pid, product)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.delete('/:pid', async (req, res) => {
    try{
        await productManager.deleteProduct(req.params.pid)
        res.status(200).send({status: 'succes', payload: await productManager.getProducts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

module.exports = router;