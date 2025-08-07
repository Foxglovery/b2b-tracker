import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Mail, Phone, MessageSquare, Edit2, Trash2, List } from 'lucide-react';
import ContactNotesModal from './ContactNotesModal';
import ContactHistory from './ContactHistory';

/* small helpers */
const daysSince = (dateStr) => {
  const diff = Math.abs(new Date() - new Date(dateStr));
  return Math.ceil(diff / 86_400_000);
};
const urgency = (d) => (d <= 7 ? 'recent' : d <= 14 ? 'moderate' : d <= 30 ? 'urgent' : 'critical');
const hue = {
  recent:   'bg-green-100 border-green-300',
  moderate: 'bg-yellow-100 border-yellow-300',
  urgent:   'bg-orange-100 border-orange-300',
  critical: 'bg-red-100 border-red-300'
};

const ContactCard = ({ contact, setShowModal, setEditingContact, setSelectedContactId }) => {
  const { currentUser } = useAuth();
  const { users, deleteContact, markContactedToday } = useData();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  const days = daysSince(contact.lastContact);
  const level = urgency(days);
  const salesPerson = users.find(u => u.id === contact.salesPerson);

  const handleContactAction = (method) => {
    setSelectedMethod(method);
    setShowNotesModal(true);
  };

  const handleSaveNotes = (notes) => {
    markContactedToday(contact.id, currentUser.id, selectedMethod, notes);
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${hue[level]}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{contact.name}</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Status: <span className="capitalize">{contact.status}</span></p>
            <p>Preferred Contact: <span className="capitalize">{contact.preferredContactMethod}</span></p>
            {currentUser.role === 'admin' && <p>Sales Person: {salesPerson?.name}</p>}
            <p>Last Contact: {contact.lastContact} ({days} days ago)</p>
            {contact.notes && <p>Notes: {contact.notes}</p>}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="flex space-x-1">
            <button
              onClick={() => handleContactAction('email')}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded"
              title="Mark contacted via email"
            >
              <Mail className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleContactAction('phone')}
              className="p-2 text-green-600 hover:bg-green-100 rounded"
              title="Mark contacted via phone"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleContactAction('text')}
              className="p-2 text-purple-600 hover:bg-purple-100 rounded"
              title="Mark contacted via text"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => {
              setEditingContact(contact);
              setShowModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
            title="Edit"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => deleteContact(contact.id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setSelectedContactId(contact.id)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
            title="View Contact Logs"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {showNotesModal && (
        <ContactNotesModal
          contact={contact}
          method={selectedMethod}
          onSave={handleSaveNotes}
          onClose={() => setShowNotesModal(false)}
        />
      )}
    </div>
  );
};

export default ContactCard;
