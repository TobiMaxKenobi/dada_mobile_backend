const jwt = require('jsonwebtoken');

const jwtConfig = require(
  '../../config/mobileJwtConfig');

const createToken = (data, config) => {
  return jwt.sign(
    data,
    config.secret,
    {expiresIn: config.expiresIn},
  );
};

const createApiToken = (data) => {
  return createToken(data, jwtConfig);
};

module.exports = {
  createApiToken,
};

