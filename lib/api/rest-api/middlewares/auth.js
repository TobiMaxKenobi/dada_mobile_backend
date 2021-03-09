const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {db} = require('../../../domain');
const jwtConfig = require('../../../config/mobileJwtConfig');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

passport.use('mobileJwt', new JwtStrategy(options, async ({id}, done) => {
  try {
    const user = await db.models.BaseUser.findById(id);

    return done(null, user);
  } catch (error) {
    return done({status: 401, message: 'Token is invalid.'}, null);
  }
}));

const mobileJwtMiddleware = (req, res, next) => {
  passport.authenticate('mobileJwt', {session: false})(req, res, next);
}

module.exports = {
  passportMiddleware: passport.initialize(),
  mobileJwtMiddleware
};