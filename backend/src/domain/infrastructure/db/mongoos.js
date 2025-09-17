const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config/env');

async function connect() {
  await mongoose.connect(MONGODB_URI);
  console.log('MongoDB connected');
}
module.exports = { connect };
