const { Router } = require('express');

module.exports = (controller, authMiddleware) => {
  const r = Router();
  r.post('/register', controller.register);
  r.post('/login', controller.login);
  r.get('/me', authMiddleware, controller.me);
  r.post('/logout', controller.logout);
  return r;
};