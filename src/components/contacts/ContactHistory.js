import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Phone, Mail, MessageSquare } from 'lucide-react';

const ContactHistory = ({ contactId }) => {
  const { currentUser } = useAuth();
  const { activities, users } = useData();
  
  // Filter activities for this specific contact and apply role-based access control
  const contactActivities = activities
    .filter(activity => activity.contactId === contactId)
    .filter(activity => 
      currentUser?.role === 'admin' || 
      activity.salesPerson === currentUser?.id
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getIcon = (type) => {
    switch (type) {
      case 'phone':
        return <Phone className="h-4 w-4 text-green-600" />;
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'text':
        return <MessageSquare className="h-4 w-4 text-purple-600" />;
      default:
        return <Phone className="h-4 w-4 text-gray-600" />;
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

  if (contactActivities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No communication history yet.</p>
        <p className="text-sm">Click the contact buttons above to log interactions.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-gray-900 mb-3">Communication History</h4>
      {contactActivities.map((activity) => (
        <div key={activity.id} className="border-l-4 border-gray-200 pl-4 py-2">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {getMethodLabel(activity.type)}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">
                  {formatDate(activity.date)}
                </span>
                <span className="text-xs text-gray-500">•</span>
                <span className="text-xs text-gray-500">
                  by {activity.salesPersonName}
                </span>
              </div>
              {activity.notes && (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {activity.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactHistory; 