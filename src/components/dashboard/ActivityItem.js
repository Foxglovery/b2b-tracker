import React from 'react';
import { useData } from '../../context/DataContext';
import { Phone, Mail } from 'lucide-react';

const ActivityItem = ({ activity }) => {
  const { contacts } = useData();
  const contact = contacts.find(c => c.id === activity.contactId);

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg">
      <div className="flex-shrink-0">
        {activity.type === 'call' ? (
          <Phone className="h-5 w-5 text-blue-600" />
        ) : (
          <Mail className="h-5 w-5 text-green-600" />
        )}
      </div>
      <div className="flex-grow">
        <p className="font-medium">{contact?.name}</p>
        <p className="text-sm text-gray-600">{activity.notes}</p>
      </div>
      <div className="text-sm text-gray-500">{activity.date}</div>
    </div>
  );
};

export default ActivityItem;
