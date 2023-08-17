const UserDao = require('../dao/mongo/user.mongo')
const CartDao = require('../dao/mongo/cart.mongo')
const ProductDao = require('../dao/mongo/product.mongo')

const userService = new UserDao()
const cartService = new CartDao()
const productService = new ProductDao()

module.exports = { userService, cartService, productService }