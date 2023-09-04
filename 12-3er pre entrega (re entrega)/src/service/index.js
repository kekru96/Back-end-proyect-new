const { UserDao, ProductDao, CartDao, TicketDao } = require('../dao/factory')
const UserRepository = require('../repositories/user.repository')
const ProductRepository = require('../repositories/product.repository')
const CartRepository = require('../repositories/cart.repository')
const TicketRepository = require('../repositories/ticket.repository')

const userService = new UserRepository(new UserDao)
const productService = new ProductRepository(new ProductDao)
const cartService = new CartRepository(new CartDao)
const ticketService = new TicketRepository(new TicketDao)

module.exports = { userService, cartService, productService, ticketService }