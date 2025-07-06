import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Plus } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactModal from './ContactModal';

const Contacts = () => {
  const { currentUser } = useAuth();
  const { contacts } = useData();

  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const daysSinceContact = (lastContact) => {
    const today = new Date();
    const contactDate = new Date(lastContact);
    const diffTime = Math.abs(today - contactDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getUrgencyLevel = (days) => {
    if (days <= 7) return 'recent';
    if (days <= 14) return 'moderate';
    if (days <= 30) return 'urgent';
    return 'critical';
  };

  const userContacts = currentUser.role === 'admin'
    ? contacts
    : contacts.filter(c => c.salesPerson === currentUser.id);

  const urgencyOrder = { 'critical': 0, 'urgent': 1, 'moderate': 2, 'recent': 3 };

  const sortedContacts = [...userContacts].sort((a, b) => {
    const aUrgency = getUrgencyLevel(daysSinceContact(a.lastContact));
    const bUrgency = getUrgencyLevel(daysSinceContact(b.lastContact));
    return urgencyOrder[aUrgency] - urgencyOrder[bUrgency];
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contacts</h2>
        <button
          onClick={() => {
            setEditingContact(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="grid gap-4">
        {sortedContacts.map(contact => (
          <ContactCard
            key={contact.id}
            contact={contact}
            setShowModal={setShowModal}
            setEditingContact={setEditingContact}
          />
        ))}
      </div>

      {showModal && (
        <ContactModal
          editingContact={editingContact}
          closeModal={() => {
            setShowModal(false);
            setEditingContact(null);
          }}
        />
      )}
    </div>
  );
};

export default Contacts;
