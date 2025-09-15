module.exports = function RegisterUser({ userRepo, hasher, tokenService }) {
    return async ({ name, email, password }) => {
      if (!name || !email || !password) throw new Error('All fields are required');
      const existing = await userRepo.findByEmail(email);
      if (existing) throw new Error('Email already in use');
  
      const passwordHash = await hasher.hash(password);
      const user = await userRepo.create({ name, email, passwordHash });
      const token = tokenService.sign({ id: user.id });
      return { user, token };
    };
  };
  