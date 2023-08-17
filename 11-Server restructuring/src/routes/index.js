const express = require('express')
const ProductRouter = require('./products.router')
const CartRouter = require('./carts.router')
const viewsRouter = require('./views.router')
const SessionsRouter = require('./sessions.router')

const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
// const viewsRouter = new ViewsRouter()
const sessionsRouter = new SessionsRouter()

const mainRouter = express.Router()

mainRouter.use('/api/products', productRouter.getRouter())
mainRouter.use('/api/carts', cartRouter.getRouter())
mainRouter.use('/api/sessions', sessionsRouter.getRouter())
mainRouter.use('/', viewsRouter)
mainRouter.use('*', (req, res, next) => {
    res.status(404).send({status: "error", error: 'Requested path not found',});
})

module.exports = mainRouter