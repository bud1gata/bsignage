import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../config/api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      
      if (res.ok) {
        login(data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low font-body-md">
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="font-headline-lg text-headline-lg mb-6 text-center text-primary">Admin Login</h1>
        {error && <div className="bg-error-container text-on-error-container p-3 rounded mb-4 text-sm font-medium">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Username</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:bg-primary/90 mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
