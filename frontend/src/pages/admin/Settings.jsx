import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KeyRound } from 'lucide-react';

export default function Settings() {
  const { token, logout } = useAuth();
  
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Konfirmasi password baru tidak cocok!');
      return;
    }

    try {
      const res = await fetch('http://localhost:5003/api/auth/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      const data = await res.json();
      if (res.ok) {
        setPasswordMessage(data.message + ' Anda akan dialihkan dalam beberapa detik...');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        setPasswordError(data.message || 'Failed to update password');
      }
    } catch (err) {
      setPasswordError('Server connection error');
    }
  };

  return (
    <div>
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">Settings</h2>
      
      <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant max-w-md">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
          <KeyRound size={24} className="text-primary" />
          Change Password
        </h3>
        
        {passwordMessage && <div className="bg-primary-container text-on-primary-container p-3 rounded mb-4 text-sm font-medium">{passwordMessage}</div>}
        {passwordError && <div className="bg-error-container text-on-error-container p-3 rounded mb-4 text-sm font-medium">{passwordError}</div>}
        
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Current Password</label>
            <input 
              type="password" 
              required 
              value={passwordData.currentPassword} 
              onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} 
              className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">New Password</label>
            <input 
              type="password" 
              required 
              value={passwordData.newPassword} 
              onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} 
              className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-1">Confirm New Password</label>
            <input 
              type="password" 
              required 
              value={passwordData.confirmPassword} 
              onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} 
              className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" 
            />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:bg-primary/90 mt-2">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
