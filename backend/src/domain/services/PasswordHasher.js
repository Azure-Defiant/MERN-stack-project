class PasswordHasher {
    async hash (raw) {throw new Error('Not implemented'); }
    async compare (raw, hash) {throw new Error('Not implemented'); }
}
module.exports = PasswordHasher;