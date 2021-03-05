const passport = require('passport');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const BaseUsersShow = require(
  '../../../use-cases/services/users/base/BaseUsersShow');
const jwtConfig = require('../../../config/mobileJwtConfig');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.secret,
};

passport.use('mobileJwt', new JwtStrategy(options, async ({id}, done) => {
  try {
    const user = await BaseUsersShow.execute(id);

    return user ? done(null, user) :
      done({status: 401, message: 'Token is invalid.'}, null);
  } catch (err) {
    return done(err);
  }
}));

const mobileJwtMiddleware = (req, res, next) => passport.authenticate(
  'mobileJwt', {session: false})(req, res, next);

module.exports = {
  passportMiddleware: passport.initialize(),
  mobileJwtMiddleware
};