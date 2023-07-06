const mongoose = require('mongoose')

let url = "mongodb+srv://CoderUser:1234@ecommerce.5odsxhx.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
    connectDB: () => {
        mongoose.connect(url)
        console.log("Connected to the DB");
    }
}