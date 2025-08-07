import React from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const { contacts } = useData();
  const contact = contacts.find(c => c.id === activity.contactId);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-5 w-5 text-green-600" />;
      case 'email':
        return <Mail className="h-5 w-5 text-blue-600" />;
      case 'text':
        return <MessageSquare className="h-5 w-5 text-purple-600" />;
      default:
        return <Phone className="h-5 w-5 text-gray-600" />;
    }
  };

  const getMethodLabel = (type) => {
    switch (type) {
      case 'phone':
        return 'Call';
      case 'email':
        return 'Email';
      case 'text':
        return 'Text';
      default:
        return 'Contact';
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 border rounded-lg relative">
      <div className="flex-shrink-0 flex items-start mt-8">
        {getIcon(activity.type)}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center space-x-2 min-w-0">
          <p className="font-medium">{activity.clientName || contact?.name}</p>
          <span className="text-xs text-gray-500">•</span>
          <p className="text-sm text-gray-600">{getMethodLabel(activity.type)}</p>
        </div>
        <p className="text-sm text-gray-600">{activity.notes}</p>
        <p className="text-xs text-gray-500">by {activity.salesPersonName}</p>
      </div>
      <div className="absolute bottom-0 right-2 text-xs text-gray-400">{formatDate(activity.date)}</div>
    </div>
  );
};

export default ActivityItem;
