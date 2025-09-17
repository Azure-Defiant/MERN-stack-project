const bcrypt = require('bcryptjs');
const PasswordHasher = require('../../services/PasswordHasher');

class BcryptPasswordHasher extends PasswordHasher {
  async hash(raw) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(raw, salt);
  }
  async compare(raw, hash) {
    return bcrypt.compare(raw, hash);
  }
}
module.exports = BcryptPasswordHasher;