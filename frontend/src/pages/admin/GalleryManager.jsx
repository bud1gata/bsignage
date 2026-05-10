import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';

export default function GalleryManager() {
  const { token } = useAuth();
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ file: null, url: '', title: '', description: '' });
  const [editId, setEditId] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ file: null, url: '', title: '', description: '' });
    setEditId(null);
  };

  const handleEdit = (photo) => {
    setFormData({ 
      file: null, 
      url: photo.url || '', 
      title: photo.title || '', 
      description: photo.description || '' 
    });
    setEditId(photo._id);
    setIsModalOpen(true);
  };

  const fetchPhotos = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/photos/all`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setPhotos(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchPhotos();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file && !formData.url) return alert('Please select an image file OR provide an image URL');

    if (formData.file && formData.file.size > 2 * 1024 * 1024) {
      return alert('Ukuran file terlalu besar! Maksimal 2MB.');
    }

    const data = new FormData();
    if (formData.file) data.append('image', formData.file);
    if (formData.url) data.append('url', formData.url);
    if (formData.title) data.append('title', formData.title);
    if (formData.description) data.append('description', formData.description);

    try {
      const url = editId ? `${API_BASE_URL}/api/photos/${editId}` : `${API_BASE_URL}/api/photos`;
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      });
      if (res.ok) {
        handleCloseModal();
        fetchPhotos();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/photos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchPhotos();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Gallery Management</h2>
        <button 
          onClick={() => {
            setEditId(null);
            setFormData({ file: null, url: '', title: '', description: '' });
            setIsModalOpen(true);
          }}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={20} />
          Upload Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo._id} className="bg-surface rounded-xl shadow border border-outline-variant overflow-hidden">
            <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-headline-md text-on-surface mb-1 truncate">{photo.title || 'Untitled'}</h3>
              <p className="text-surface-variant text-sm line-clamp-2 mb-4">
                {photo.description || 'No caption provided.'}
              </p>
              <div className="flex gap-2 justify-end">
                <button onClick={() => handleEdit(photo)} className="p-2 text-surface-tint hover:bg-surface-variant rounded-lg">
                  <Edit size={18} />
                </button>
                <button onClick={() => handleDelete(photo._id)} className="p-2 text-error hover:bg-error-container rounded-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-headline-md text-on-surface mb-4">{editId ? 'Edit Photo' : 'Upload New Photo'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Photo Image (Upload)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={e => setFormData({...formData, file: e.target.files[0]})} 
                  className="w-full rounded-lg border border-outline-variant p-2 focus:ring-primary focus:border-primary" 
                />
              </div>
              <div className="flex items-center gap-4">
                <hr className="flex-grow border-outline-variant" />
                <span className="text-sm font-medium text-on-surface-variant">OR</span>
                <hr className="flex-grow border-outline-variant" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Photo URL (Link)</label>
                <input 
                  type="text" 
                  value={formData.url} 
                  onChange={e => setFormData({...formData, url: e.target.value})} 
                  className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" 
                  placeholder="https://..." 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Caption Title (Optional)</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Caption Description (Optional)</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" rows="3"></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90">Save & Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
