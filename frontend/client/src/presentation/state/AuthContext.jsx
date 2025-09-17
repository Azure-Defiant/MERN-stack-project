import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AuthRepositoryHttp from '../../data/repositories/AuthRepositoryHttp';
import registerUseCase from '../../core/usecases/register';
import loginUseCase from '../../core/usecases/login';
import getMeUseCase from '../../core/usecases/getMe';
import logoutUseCase from '../../core/usecases/logout';

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const repo = useMemo(() => AuthRepositoryHttp(), []);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const register = registerUseCase(repo);
  const login = loginUseCase(repo);
  const getMe = getMeUseCase(repo);
  const logout = logoutUseCase(repo);

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        // not logged in
      }
      setLoading(false);
    })();
  }, [getMe]);

  async function handleLogin(payload) {
    setError(null);
    const { token, user } = await login(payload);
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  }

  async function handleRegister(payload) {
    setError(null);
    const { token, user } = await register(payload);
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setUser(null);
    try { logout(); } catch {}
  }

  const value = { user, setUser, loading, error, login: handleLogin, register: handleRegister, logout: handleLogout };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);