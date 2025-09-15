module.exports = function LoginUser({ userRepo, hasher, tokenService }) {
    return async ({ email, password }) => {

      if (!email || !password) throw new Error('Email & password required');
      const user = await userRepo.findByEmail(email);

      if (!user) throw new Error('Invalid credentials');
      const ok = await hasher.compare(password, user.passwordHash);

      if (!ok) throw new Error('Invalid credentials');
      const token = tokenService.sign({ id: user.id });
      
      return { user, token };
    };
  };
  