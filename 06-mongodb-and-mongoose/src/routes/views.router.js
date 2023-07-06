const express = require('express')
// const ProductManager = require('../dao/filesystem/ProductManager') 
const productManager = require('../dao/mongo/product.mongo') 

const router = express.Router()
// const pm = new ProductManager("./src/data/products.json")

router.get('/', async(req, res) => {
    res.render('home', {
        products: await productManager.getProducts()
    })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/chat', (req,res) => {
    res.render('chat', {})
})

module.exports = router;