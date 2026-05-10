import { useState, useEffect } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function TickerManager() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ text: '', urgent: false });

  const fetchTickers = async () => {
    try {
      const res = await fetch('http://localhost:5003/api/tickers/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchTickers();
  }, [token]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ text: '', urgent: false });
    setEditId(null);
  };

  const handleEdit = (item) => {
    setFormData({ text: item.text, urgent: item.urgent });
    setEditId(item._id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId ? `http://localhost:5003/api/tickers/${editId}` : 'http://localhost:5003/api/tickers';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        handleCloseModal();
        fetchTickers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await fetch(`http://localhost:5003/api/tickers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) fetchTickers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const res = await fetch(`http://localhost:5003/api/tickers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchTickers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Running Text Management</h2>
        <button 
          onClick={() => { setEditId(null); setIsModalOpen(true); }}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={20} />
          Add Announcement
        </button>
      </div>

      <div className="bg-surface rounded-xl shadow border border-outline-variant overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="p-4 font-medium text-on-surface-variant">Announcement Text</th>
              <th className="p-4 font-medium text-on-surface-variant w-32">Type</th>
              <th className="p-4 font-medium text-on-surface-variant w-32">Status</th>
              <th className="p-4 font-medium text-on-surface-variant w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {items.map(item => (
              <tr key={item._id} className="hover:bg-surface-container-lowest">
                <td className="p-4 text-on-surface">{item.text}</td>
                <td className="p-4">
                  {item.urgent ? (
                    <span className="px-2 py-1 bg-error-container text-on-error-container rounded text-xs font-bold uppercase">Urgent</span>
                  ) : (
                    <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-xs font-bold uppercase">Normal</span>
                  )}
                </td>
                <td className="p-4">
                  <button onClick={() => handleToggle(item._id, item.isActive)} className="text-secondary flex items-center gap-1">
                    {item.isActive ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} className="text-outline" />}
                  </button>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-surface-tint hover:bg-surface-variant rounded-lg">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 text-error hover:bg-error-container rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface-container-lowest rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="font-headline-md text-on-surface mb-4">{editId ? 'Edit Announcement' : 'New Announcement'}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Text</label>
                <input type="text" required value={formData.text} onChange={e => setFormData({...formData, text: e.target.value})} className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="urgent" checked={formData.urgent} onChange={e => setFormData({...formData, urgent: e.target.checked})} className="rounded border-outline-variant text-primary focus:ring-primary" />
                <label htmlFor="urgent" className="text-sm font-medium text-on-surface-variant">Mark as Urgent</label>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
