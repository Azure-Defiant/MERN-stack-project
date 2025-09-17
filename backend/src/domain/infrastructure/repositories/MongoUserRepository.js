const UserRepository = require('../../repositories/UserRepositories');
const UserEntity = require('../../entities/User');

class MongoUserRepository extends UserRepository {
  constructor(UserModel) {
    super();
    this.UserModel = UserModel;
  }

  async findEmail(email) {
    const doc = await this.UserModel.findOne({ email: email.toLowerCase() });
    return doc ? this.#toEntity(doc) : null;
  }

  async findId(id) {
    const doc = await this.UserModel.findById(id);
    return doc ? this.#toEntity(doc) : null;
  }

  async create({ name, email, passwordHash }) {
    const doc = await this.UserModel.create({ name, email: email.toLowerCase(), passwordHash });
    return this.#toEntity(doc);
  }

  #toEntity(doc) {
    return new UserEntity({
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      passwordHash: doc.passwordHash
    });
  }
}

module.exports = MongoUserRepository;