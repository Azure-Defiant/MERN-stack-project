module.exports = function GetCurrentUser({ userRepo, tokenService }) {
    return async ({ token }) => {

      const decoded = tokenService.verify(token);
      const user = await userRepo.findById(decoded.id);

      if (!user) throw new Error('User not found');
      
      return user;
    };
  };
  