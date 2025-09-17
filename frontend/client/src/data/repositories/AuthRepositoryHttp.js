import { http } from '../http/apiClient';

export default function AuthRepositoryHttp() {
  return {
    async register({ name, email, password }) {
      const { token, user } = await http('/api/auth/register', { method: 'POST', body: { name, email, password } });
      return { token, user };
    },
    async login({ email, password }) {
      const { token, user } = await http('/api/auth/login', { method: 'POST', body: { email, password } });
      return { token, user };
    },
    async getMe() {
      const { user } = await http('/api/auth/me');
      return user;
    },
    async logout() {
      await http('/api/auth/logout', { method: 'POST' });
    }
  };
}