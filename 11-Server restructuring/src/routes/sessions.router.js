const passport = require('passport')
const RouterClass = require('./RouterClass')
const userController = require('../controllers/users.controller')

const authenticateJWT = passport.authenticate('current', { session: false });

// router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async (req, res)=>{})

// router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async (req, res)=>{
//     const user = req.user
//     if(!user) return res.status(401).send({status: 'error', message: 'Invalid credentials'})

//     const access_token = generateToken(user)
//     res.cookie(process.env.JWT_COOKIE_KEY, access_token)
//     res.send({status: 'success', payload: access_token})
// })

class SessionRouter extends RouterClass {
    init(){
        this.get('/current', ['PUBLIC'], authenticateJWT,  async (req, res) => {
            try{
                res.sendSuccess(await userController.current(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/register', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.register(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/login', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.login(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/logout', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.logout(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })
    }
}

module.exports = SessionRouter;