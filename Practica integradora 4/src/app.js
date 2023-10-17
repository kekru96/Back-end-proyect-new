// ---- Server
const express = require('express')
const objectConfig = require('./config/objectConfig')
const { addLogger, logger } = require('./config/logger')
const cors = require('cors')

// ---- Socketio
const { Server } = require('socket.io')
const socketProduct = require('./utils/socketProducts')
const socketChat = require('./utils/socketChat')

// ---- Router
const mainRouter = require('./routes/index')

// ---- Handlebars
const handlebars = require('express-handlebars')

// ---- Passport
const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport.config.js')
const cookieParser = require('cookie-parser')

const app = express()
app.use(addLogger)

const PORT = process.env.PORT
const httpServer = app.listen(PORT, () => {
    logger.info('Server running on port: ' + PORT)
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
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

initPassport()
initPassportGithub()
app.use(passport.initialize())

app.use(mainRouter)

const io = new Server(httpServer)
socketProduct(io)
socketChat(io)