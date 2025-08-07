import React from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const { contacts } = useData();
  const contact = contacts.find(c => c.id === activity.contactId);

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
        return 'Phone Call';
      case 'email':
        return 'Email';
      case 'text':
        return 'Text Message';
      default:
        return 'Contact';
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <div className="flex-shrink-0">
        {getIcon(activity.type)}
      </div>
      <div className="flex-grow">
                 <div className="flex items-center space-x-2">
           <p className="font-medium">{activity.clientName || contact?.name}</p>
           <span className="text-xs text-gray-500">•</span>
           <p className="text-sm text-gray-600">{getMethodLabel(activity.type)}</p>
         </div>
        <p className="text-sm text-gray-600">{activity.notes}</p>
        <p className="text-xs text-gray-500">by {activity.salesPersonName}</p>
      </div>
      <div className="text-sm text-gray-500">{activity.date}</div>
    </div>
  );
};

export default ActivityItem;
