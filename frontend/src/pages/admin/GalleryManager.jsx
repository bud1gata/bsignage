import { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function GalleryManager() {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=400&auto=format&fit=crop',
      title: 'Spring 2024 Registration Opens Next Week',
      description: 'Ensure your academic advising appointments are scheduled before November 1st...'
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Gallery Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus size={20} />
          Upload Photo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="bg-surface rounded-xl shadow border border-outline-variant overflow-hidden">
            <img src={photo.url} alt={photo.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-headline-md text-on-surface mb-1 truncate">{photo.title || 'Untitled'}</h3>
              <p className="text-surface-variant text-sm line-clamp-2 mb-4">
                {photo.description || 'No caption provided.'}
              </p>
              <div className="flex gap-2 justify-end">
                <button className="p-2 text-surface-tint hover:bg-surface-variant rounded-lg">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-error hover:bg-error-container rounded-lg">
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
            <h3 className="font-headline-md text-on-surface mb-4">Upload New Photo</h3>
            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Photo URL (Mock Upload)</label>
                <input type="text" className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Caption Title (Optional)</label>
                <input type="text" className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-1">Caption Description (Optional)</label>
                <textarea className="w-full rounded-lg border-outline-variant focus:ring-primary focus:border-primary" rows="3"></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg font-medium">Cancel</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-primary text-on-primary rounded-lg font-medium hover:bg-primary/90">Save & Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
