import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required style={{ width: '100%' }} />
        </div>
        <button disabled={loading} type="submit">{loading ? 'Signing in...' : 'Login'}</button>
      </form>
      <p style={{ marginTop: 12 }}>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}


