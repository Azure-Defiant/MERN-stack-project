const jwt = require('jsonwebtoken');
const TokenService = require('../../services/TokenService');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

class JwtTokenService extends TokenService {
  sign(payload, opts = {}) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, ...opts });
  }
  verify(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
module.exports = JwtTokenService;