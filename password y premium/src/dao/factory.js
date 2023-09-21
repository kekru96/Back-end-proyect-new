const objectConfig = require('../config/objectConfig')

let UserDao, ProductDao, CartDao, TicketDao

switch(process.env.PERSISTENCE){
    case 'MONGO':
        objectConfig.mongoInstance()
        const UserDaoMongo = require('../dao/mongo/user.mongo')
        const ProductDaoMongo = require('../dao/mongo/product.mongo')
        const CartDaoMongo = require('../dao/mongo/cart.mongo')
        const TicketDaoMongo = require('../dao/mongo/ticket.mongo')

        UserDao = UserDaoMongo
        ProductDao = ProductDaoMongo
        CartDao = CartDaoMongo
        TicketDao = TicketDaoMongo
    break; 
    case 'FILE':
        const UserDaoFile = require('../dao/filesystem/user.file')
        const ProductDaoFile = require('../dao/filesystem/product.file')
        const CartDaoFile = require('../dao/filesystem/cart.file')
        // const TicketDaoFile = require('../dao/filesystem/ticket.file')

        UserDao = UserDaoFile
        ProductDao = ProductDaoFile
        CartDao = CartDaoFile
        // TicketDao = TicketDaoFile
    break;
}

module.exports = { UserDao, ProductDao, CartDao, TicketDao }