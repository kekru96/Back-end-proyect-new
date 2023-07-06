const mongoose = require('mongoose')

const collection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    thumbnails: Array,
    category: String,
    price: Number,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        unique: true,
        required: true,
    }
})

const productModel = mongoose.model(collection, productSchema)

module.exports = productModel