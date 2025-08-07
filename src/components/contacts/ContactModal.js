import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const ContactModal = ({ editingContact, closeModal }) => {
  const { currentUser } = useAuth();
  const { addContact, updateContact } = useData();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'prospect',
    preferredContactMethod: 'email',
    notes: ''
  });

  /* preload when editing */
  useEffect(() => {
    if (editingContact) setForm(editingContact);
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    if (!form.name || !form.email) return; // minimal validation

    if (editingContact) {
      updateContact(form);
    } else {
      addContact({ ...form, salesPerson: currentUser.id });
    }
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-4">
          {editingContact ? 'Edit Contact' : 'Add New Contact'}
        </h3>

        {/* --- form fields --- */}
        <div className="space-y-4">
          {['name', 'email', 'phone'].map(field => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {['prospect','qualified','proposal','negotiation','closed','cold']
                .map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Contact Method</label>
            <select
              name="preferredContactMethod"
              value={form.preferredContactMethod}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              {['email', 'phone', 'text'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              rows={3}
              value={form.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* --- actions --- */}
        <div className="flex space-x-4 mt-6">
          <button
            onClick={closeModal}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editingContact ? 'Update' : 'Add'} Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
