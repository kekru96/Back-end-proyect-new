const ProductManager = require('../dao/mongo/product.mongo')
const productManager = new ProductManager

const socketProduct = async (io) => {
    const products = await productManager.getProducts()

    io.on('connection', socket => {
        console.log("New client connected");

        socket.emit('products', products)

        socket.on('addProduct', async data => {
            await productManager.addProduct(data)
            const products = await productManager.getProducts()
            socket.emit('products', products)
        })

        socket.on('deleteProduct', async data => {
            await productManager.deleteProduct(data)
            const products = await productManager.getProducts()
            socket.emit('products', products)
        })
    })
}

module.exports = socketProduct