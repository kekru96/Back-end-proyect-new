const express = require('express')
const productManager = require('../dao/mongo/product.mongo')

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        let query = {}
        if(req.query.query === undefined){ // query undefined
            query = {}
        }else if(req.query.query === 'true'){ // status === true
            query.status = true
        }else if(req.query.query === 'false'){ // status === false
            query.status = false
        }else{ // category === req.query.params
            query.category = req.query.query
        }

        let sort = null
        if (req.query.sort === "asc") { // asc or desc
            sort = { price: 1 };
        } else if (req.query.sort === "desc") {
            sort = { price: -1 };
        }

        const options = {
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            page: req.query.page ? parseInt(req.query.page) : 1,
            sort: sort
        }

        const products = await productManager.getProducts(query, options)
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = products
        hasPrevPage === false ? prevLink = null : prevLink = `/api/products?page=${parseInt(prevPage)}`
        hasNextPage === false ? nextLink = null : nextLink = `/api/products?page=${parseInt(nextPage)}`

        res.status(200).send({status: 'succes', payload: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink })
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