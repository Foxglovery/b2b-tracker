import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, X } from 'lucide-react';

const ContactNotesModal = ({ contact, method, onSave, onClose }) => {
  const [notes, setNotes] = useState('');

  const getMethodIcon = (method) => {
    switch (method) {
      case 'email':
        return <Mail className="h-5 w-5 text-blue-600" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-green-600" />;
      case 'text':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      default:
        return <Phone className="h-5 w-5 text-gray-600" />;
    }
  };

  const getMethodLabel = (method) => {
    switch (method) {
      case 'email':
        return 'Email';
      case 'phone':
        return 'Phone Call';
      case 'text':
        return 'Text Message';
      default:
        return 'Contact';
    }
  };

  const handleSave = () => {
    onSave(notes);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {getMethodIcon(method)}
            <h3 className="text-lg font-semibold">
              {getMethodLabel(method)} with {contact.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Notes about this interaction
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter any notes about this conversation, follow-up items, or important details..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Ctrl+Enter to save quickly
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save & Log Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactNotesModal; 