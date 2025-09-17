const isProd = process.env.NODE_ENV === 'production';

const cookieOpts = {
  httpOnly: true,
  sameSite: isProd ? 'none' : 'lax',
  secure: isProd,
  maxAge: 7 * 24 * 60 * 60 * 1000
};

module.exports = ({ registerUser, loginUser, getCurrentUser, tokenService }) => ({
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body || {};
      const { user, token } = await registerUser({ name, email, password });
      res.cookie('token', token, cookieOpts);
      res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body || {};
      const { user, token } = await loginUser({ email, password });
      res.cookie('token', token, cookieOpts);
      res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  },

  me: async (req, res) => {
    try {
      if (!req.token) return res.status(401).json({ message: 'Not authenticated' });
      const user = await getCurrentUser({ token: req.token });
      res.json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
      res.status(401).json({ message: e.message });
    }
  },

  logout: (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: isProd ? 'none' : 'lax', secure: isProd });
    res.json({ message: 'Logged out' });
  }
});