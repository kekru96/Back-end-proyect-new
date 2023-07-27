const express = require('express')
const productRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const viewsRouter = require('./routes/views.router')
const sessionsRouter = require('./routes/sessions.router')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const socketProduct = require('./utils/socketProducts')
const socketChat = require('./utils/socketChat')
const objectConfig = require('./config/objectConfig')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { create } = require('connect-mongo') 

const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport.config.js')

const app = express()
objectConfig.connectDB()

const PORT = 8080
const httpServer = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})

const io = new Server(httpServer)

app.set('views', __dirname+'/views')

const hbs = handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    }
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())

app.use(session({
    store: create({
        mongoUrl: 'mongodb+srv://CoderUser:1234@ecommerce.5odsxhx.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 1000000,
    }),
    secret: 'secretCode',
    resave: false,
    saveUninitialized: false
}))

initPassport()
initPassportGithub()
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)

app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: 'Requested path not found',});
});

socketProduct(io)
socketChat(io)