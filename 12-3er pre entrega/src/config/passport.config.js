const passport = require('passport')
const UserManager = require('../dao/mongo/user.mongo')
const GitHubStrategy = require('passport-github2')
const jwtStrategy = require('passport-jwt')

const userManager = new UserManager

const JWTStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[process.env.JWT_COOKIE_KEY];
    }
    return token;
};

const initPassport = () => {

    const jwtOptions = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_KEY,
    };

    passport.use('current', new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload.user);
        }catch(error){
            return done(error);
        }
    }))
}

const initPassportGithub = () => {
    passport.use('github', new GitHubStrategy({ 
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: process.env.GITHUB_CALLBACK_URL },
    async(accessToken, refreshToken, profile, done) => {
        try{
            let user = await userManager.getUserByEmail(profile._json.email)
            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: ' ',
                    date_of_birth: ' ',
                    email: profile._json.email,
                    password: ' ',
                }
                const result = await userManager.addUser(newUser)
                return done(null, result)
            }else{
                return done(null, user)
            }
        }catch(error){
            done(error)
        }
    }))
}

module.exports = { initPassport, initPassportGithub }