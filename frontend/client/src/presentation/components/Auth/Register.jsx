import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../state/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register({ name, email, password });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto' }}>
      <h2>Register</h2>
      {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" required minLength={2} style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required style={{ width: '100%' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} style={{ width: '100%' }} />
        </div>
        <button disabled={loading} type="submit">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <p style={{ marginTop: 12 }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}


