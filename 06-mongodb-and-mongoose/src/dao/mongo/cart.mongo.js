const cartModel = require('./models/cart.model')


class CartManagerMongo{
    constructor(model){
        this.cartModel = model
    }

    async createCart(){
        try{
            return await cartModel.create({products: []})
        }catch(err){
            return new Error(err)
        }
    }

    async getCarts(){
        try{
            return await cartModel.find({})
        }catch(err){
            return new Error(err)
        }
    }

    async getCartById(cid){
        try{
            return await cartModel.findOne({_id: cid})
        }catch(err){
            return new Error(err)
        }
    }

    async addProductToCart(cid, pid){ // cid = cartId, pid= productId
        const cart = await this.getCartById(cid)
        const index = cart.products.findIndex(product => product._id === pid)

        if (index === -1) { // product not found
            const update = { $push: { products: { _id: pid, quantity: 1 } } };
            await cartModel.updateOne({ _id: cid }, update);
        } else { // product found
            const filter = { _id: cid, 'products._id': pid };
            const update = { $inc: { 'products.$.quantity': 1 } };
            await cartModel.updateOne(filter, update);
        }
    }
}

module.exports = new CartManagerMongo