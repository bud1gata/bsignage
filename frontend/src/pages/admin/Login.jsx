import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
      <div className="bg-surface-container-lowest p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-primary">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Username</label>
            <input type="text" className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Password</label>
            <input type="password" className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:bg-primary/90 mt-4">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
