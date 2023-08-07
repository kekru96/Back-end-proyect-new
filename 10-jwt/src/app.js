// ---- Server
const express = require('express')
const objectConfig = require('./config/objectConfig')

// ---- Socketio
const { Server } = require('socket.io')
const socketProduct = require('./utils/socketProducts')
const socketChat = require('./utils/socketChat')

// ---- Routers
const productRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const viewsRouter = require('./routes/views.router')
const sessionsRouter = require('./routes/sessions.router')

// ---- Handlebars
const handlebars = require('express-handlebars')

// ---- Passport
const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport.config.js')
const cookieParser = require('cookie-parser')

const app = express()
objectConfig.connectDB()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})

const hbs = handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    }
})

app.set('views', __dirname+'/views')
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())

initPassport()
// initPassportGithub()
app.use(passport.initialize())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)

app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: 'Requested path not found',});
});

const io = new Server(httpServer)
socketProduct(io)
socketChat(io)