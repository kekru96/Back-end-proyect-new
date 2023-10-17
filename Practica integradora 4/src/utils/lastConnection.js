const userModel = require('../dao/mongo/models/user.model')

const lastConnection = async (userId) => {
    const connection = await userModel.findByIdAndUpdate(userId, { last_connection: new Date() })
}

module.exports = lastConnection