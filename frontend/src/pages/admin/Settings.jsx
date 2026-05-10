import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, Type, SlidersHorizontal, ImagePlus } from 'lucide-react';
import API_BASE_URL from '../../config/api';

export default function Settings() {
  const { token, logout } = useAuth();
  
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [captionSize, setCaptionSize] = useState(1);
  const [captionOpacity, setCaptionOpacity] = useState(80);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/settings`);
        const data = await res.json();
        if (data.captionSize) setCaptionSize(data.captionSize);
        if (data.captionOpacity !== undefined) setCaptionOpacity(data.captionOpacity);
        if (data.logoUrl) setLogoUrl(data.logoUrl);
      } catch (err) {}
    };
    if (token) fetchSettings();
  }, [token]);

  const handleSettingChange = async (key, value) => {
    try {
      await fetch(`${API_BASE_URL}/api/settings/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ value })
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoUpload = async () => {
    if (!logoFile) return alert('Pilih file logo terlebih dahulu');
    if (logoFile.size > 2 * 1024 * 1024) return alert('Ukuran file terlalu besar! Maksimal 2MB.');

    const data = new FormData();
    data.append('logo', logoFile);

    try {
      const res = await fetch(`${API_BASE_URL}/api/settings/logo`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data
      });
      const result = await res.json();
      if (res.ok) {
        setLogoUrl(result.logoUrl);
        setLogoFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Konfirmasi password baru tidak cocok!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/password`, {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Logo Upload */}
          <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <ImagePlus size={24} className="text-primary" />
              Ticker Logo
            </h3>
            
            {logoUrl && (
              <div className="mb-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg border border-outline-variant overflow-hidden bg-primary-container flex items-center justify-center">
                  <img src={logoUrl} alt="Current Logo" className="w-full h-full object-contain p-1" />
                </div>
                <span className="text-sm text-on-surface-variant">Logo saat ini</span>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setLogoFile(e.target.files[0])} 
                className="w-full rounded-lg border border-outline-variant p-2 text-sm focus:ring-primary focus:border-primary" 
              />
              <button 
                onClick={handleLogoUpload} 
                className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:bg-primary/90"
              >
                Upload Logo
              </button>
              <p className="text-xs text-on-surface-variant">Logo akan muncul di area "Campus News" pada running text. Maks 2MB.</p>
            </div>
          </div>

          {/* Display Configuration */}
          <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2">
              <SlidersHorizontal size={24} className="text-primary" />
              Display Configuration
            </h3>
            
            <div className="flex flex-col gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-sm text-on-surface-variant flex items-center gap-1">
                    <Type size={16} /> Caption Size
                  </label>
                  <span className="text-primary font-bold text-sm">{captionSize}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1"
                  value={captionSize} 
                  onChange={e => setCaptionSize(Number(e.target.value))}
                  onMouseUp={() => handleSettingChange('captionSize', captionSize)}
                  onTouchEnd={() => handleSettingChange('captionSize', captionSize)}
                  className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-on-surface-variant mt-1">Scale the size of the gallery text.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-medium text-sm text-on-surface-variant flex items-center gap-1">
                    Caption Opacity
                  </label>
                  <span className="text-primary font-bold text-sm">{captionOpacity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  step="5"
                  value={captionOpacity} 
                  onChange={e => setCaptionOpacity(Number(e.target.value))}
                  onMouseUp={() => handleSettingChange('captionOpacity', captionOpacity)}
                  onTouchEnd={() => handleSettingChange('captionOpacity', captionOpacity)}
                  className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <p className="text-xs text-on-surface-variant mt-1">Transparency of the text background block.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-6 shadow border border-outline-variant">
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
    </div>
  );
}
