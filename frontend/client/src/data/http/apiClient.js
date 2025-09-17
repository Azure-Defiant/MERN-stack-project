const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export async function http(path, { method = 'GET', body, headers = {}, credentials = 'include' } = {}) {
  const token = localStorage.getItem('token');
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials,
    headers: { 'Content-Type': 'application/json', ...authHeader, ...headers },
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}