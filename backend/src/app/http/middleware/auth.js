// extracts token from cookie or bearer
module.exports = (tokenService) => (req, res, next) => {
    try {
      const bearer = req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null;
      req.token = req.cookies?.token || bearer;
      next();
    } catch {
      next();
    }
  };  