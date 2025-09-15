class User {
    constructor({id = null,name, email, passwordHash}) {
        this.id = id;
        this.name = name;
        this.email = email.toLowerCase();
        this.passwordHash = passwordHash;
    }
}
module.exports = User;