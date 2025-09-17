const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const { CLIENT_URL, PORT } = require('../domain/infrastructure/config/env');

module.exports = ({ authRoutes }) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(cors({ origin: CLIENT_URL, credentials: true }));

  app.get('/', (_, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRoutes);

  return {
    app,
    listen: () => app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
  };
};