const { cartService } = require('../service')

class CartController {
    getById = async (req, res) => {
        try{
            const cart = await cartService.getCartById(req.params.cid)
            return { cart }
            // res.status(200).send({status: 'succes', payload: await cartService.getCartById(req.params.cid)})
        }catch(error){  
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    create = async (req, res) => {
        try{
            const createdCart = await cartService.createCart()
            return { createdCart }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    addProduct = async (req, res) => {
        try{
            const addedProduct = await cartService.addProductToCart(req.params.cid, req.params.pid)
            return { addedProduct }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch (error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    update = async (req, res) => {
        try{
            const { products } = req.body
            const updatedProduct = await cartService.updateCart(req.params.cid, products)
            return { updatedProduct }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    updateQuantity = async (req, res) => {
        try{
            const quantity = req.body.quantity
            const updatedProduct = await cartService.updateQuantity(req.params.cid, req.params.pid, quantity)
            return { updatedProduct }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    deleteProduct = async (req,res) => {
        try{
            const deletedProduct = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
            return { deletedProduct }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    deleteAllProducts = async (req,res) => {
        try{
            const deletedProducts = await cartService.deleteAllProductsFromCart(req.params.cid)
            return { deletedProducts }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }
}

module.exports = new CartController()