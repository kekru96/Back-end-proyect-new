const passport = require('passport')
const userManager = require('../dao/mongo/user.mongo')
const GitHubStrategy = require('passport-github2')
const jwtStrategy = require('passport-jwt')

const JWTStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwtCookieToken'];
    }
    return token;
};

const initPassport = () => {

    const jwtOptions = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'SecretCoderKey',
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
        clientID: 'Iv1.5221eb12b0627adf',
        clientSecret: '7ac8095c895540f5450a2094ea998cac545dbf99',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback' },
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