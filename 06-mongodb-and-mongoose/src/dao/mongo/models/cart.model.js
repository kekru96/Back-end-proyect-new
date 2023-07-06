const mongoose = require('mongoose')

const collection = 'carts'

const cartSchema = new mongoose.Schema({
    products: Array
})

const cartModel = mongoose.model(collection, cartSchema)

module.exports = cartModel