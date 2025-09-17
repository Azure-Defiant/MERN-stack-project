require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 5001,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRE || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL,
  CLIENT_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
