const productController = require('../controllers/products.controller')
const cartController = require('../controllers/carts.controller')
const { authToken } = require('../utils/jwt')
const RouterClass = require('./RouterClass')


class ViewRouter extends RouterClass {
    init(){
        this.get('/realtimeproducts', ['ADMIN'], authToken, async (req, res) => {
            res.render('realTimeProducts', {})
        })

        this.get('/chat', ['PUBLIC'], authToken, async (req, res) => {
            res.render('chat', {})
        })

        this.get('/products', ['PUBLIC'], authToken, async (req, res) => {
           try{
                const result = await productController.get(req, res)
                const { products, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, session  } = result
                res.render('products', {status: 'success', payload: products, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, session })
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/cart/:cid', ['PUBLIC'], authToken, async (req, res) => {
            res.render('cart', {status: 'succes', payload: await cartController.getById(req, res)})
        })

        this.get('/login', ['PUBLIC'], async (req, res) => {
            res.render('login', {})
        })

        this.get('/register', ['PUBLIC'], async (req, res) => {
            res.render('register', {})
        })
    }
}

module.exports = ViewRouter