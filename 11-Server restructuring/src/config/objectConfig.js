const mongoose = require('mongoose')
let URL = process.env.MONGO

module.exports = {
    connectDB: () => {
        mongoose.connect(URL)
        console.log("Connected to the DB");
    }
}