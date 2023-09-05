const { MongoSingleton } = require('./mongo.singleton')
const program = require('../utils/commander')
const dotenv = require('dotenv')

const { mode } = program.opts()

dotenv.config({path: './.env'})
dotenv.config({
    path: mode === 'development' ? './.env.development': './.env.production' 
})

const mongoInstance = async () => {
    try{
        await MongoSingleton.getInstance()
    }catch(err){
        console.log(err);
    }
}

module.exports = { mongoInstance }