const fs = require('fs').promises

class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
    }

    async loadProducts() {
        try {
            if(fs.stat(this.path)){
                const fileData = await fs.readFile(this.path, 'utf-8');
                this.products = JSON.parse(fileData)
            }
        } catch (err) {
            fs.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
        }
    }
    
    async saveProducts() {
        try {
            const jsonData = JSON.stringify(this.products)
            await fs.writeFile(this.path, jsonData)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async addProduct(product){
        const isRepeated = this.products.some((productSaved) => productSaved.code == product.code)
        
        if(isRepeated)
            throw new Error("Duplicate product code")
        
        if(isRepeated == false && product.title && product.description && product.code && product.price && product.stock && product.category){
            this.products.push({
                id: this.products.length + 1,
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status === false ? false : true,
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails == null ? [] : product.thumbnails
            })
            
            await this.saveProducts()
        }else{
            throw new Error("Need to add some features to add this")
        }
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const productById = this.products.find((product) => product.id == id)
        if(productById){ return productById }
        else{ throw new Error("There is no product with the id: " + id) }
    }

    async updateProduct(id, updatedProduct){
        const productToUpdate = this.products.find( product => product.id == id )
        if(productToUpdate){
            const isRepeated = this.products.some((productSaved) => productSaved.code == updatedProduct.code) // check if the product code already exists
            if(isRepeated == false){
                this.products[id - 1] = { // id - 1 because the ids are not equal to the length of the array
                    ...this.products[id - 1], // previous values
                    ...updatedProduct // new values
                }

                await this.saveProducts()
            }else{
                throw new Error("There is already a product with the code: " + updatedProduct.code)
            }
        }else{
            throw new Error("There is no product with the id: " + id)
        }
    }

    async deleteProduct(id){
        const productToDelete = this.products.find( product => product.id == id )
        if(productToDelete){
            this.products = this.products.filter( product => product.id !== id )

            await this.saveProducts()
        }else{
            throw new Error("There is no product with the id: " + id)
        }
    }
}

module.exports = ProductManager;