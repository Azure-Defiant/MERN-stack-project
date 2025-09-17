// Wire everything together (DI)
const { connect } = require('./domain/infrastructure/db/mongoos');
const { PORT } = require('./domain/infrastructure/config/env');

const UserModel = require('./domain/infrastructure/models/UserModel');
const MongoUserRepository = require('./domain/infrastructure/repositories/MongoUserRepository');
const BcryptPasswordHasher = require('./domain/infrastructure/security/BcryptPasswordHasher');
const JwtTokenService = require('./domain/infrastructure/security/JwtTokenService');

const RegisterUser = require('./domain/usecases/RegisterUser');
const LoginUser = require('./domain/usecases/LoginUser');
const GetCurrentUser = require('./domain/usecases/GetCurrentUser');

const makeAuthController = require('./app/http/controllers/authController');
const makeAuthRoutes = require('./app/http/routes/authRoutes');
const makeAuthMiddleware = require('./app/http/middleware/auth');
const makeServer = require('./app/server');

(async () => {
  await connect();

  // Infrastructure
  const userRepo = new MongoUserRepository(UserModel);
  const hasher = new BcryptPasswordHasher();
  const tokenService = new JwtTokenService();

  // Use cases
  const registerUser = RegisterUser({ userRepo, hasher, tokenService });
  const loginUser = LoginUser({ userRepo, hasher, tokenService });
  const getCurrentUser = GetCurrentUser({ userRepo, tokenService });

  // Controllers & Routes
  const authController = makeAuthController({ registerUser, loginUser, getCurrentUser, tokenService });
  const authMiddleware = makeAuthMiddleware(tokenService);
  const authRoutes = makeAuthRoutes(authController, authMiddleware);

  // Server
  const { listen } = makeServer({ authRoutes });
  listen();
})();
