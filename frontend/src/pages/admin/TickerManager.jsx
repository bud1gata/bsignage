import { useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

export default function TickerManager() {
  const [items, setItems] = useState([
    { id: 1, text: 'Library closing early at 5PM today for maintenance.', urgent: true, active: true },
    { id: 2, text: 'Cafeteria Special: Taco Tuesday.', urgent: false, active: true },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Running Text Management</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
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
              <th className="p-4 font-medium text-on-surface-variant w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {items.map(item => (
              <tr key={item.id} className="hover:bg-surface-container-lowest">
                <td className="p-4 text-on-surface">{item.text}</td>
                <td className="p-4">
                  {item.urgent ? (
                    <span className="px-2 py-1 bg-error-container text-on-error-container rounded text-xs font-bold uppercase">Urgent</span>
                  ) : (
                    <span className="px-2 py-1 bg-secondary-container text-on-secondary-container rounded text-xs font-bold uppercase">Normal</span>
                  )}
                </td>
                <td className="p-4">
                  <button className="text-secondary flex items-center gap-1">
                    {item.active ? <ToggleRight size={24} className="text-primary" /> : <ToggleLeft size={24} className="text-outline" />}
                  </button>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-2 text-error hover:bg-error-container rounded-lg">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal could be added here similar to GalleryManager */}
    </div>
  );
}
