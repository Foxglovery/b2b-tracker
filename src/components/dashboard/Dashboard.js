import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatsCard from './StatsCard';
import ActivityItem from './ActivityItem';

import { Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { contacts, activities } = useData();

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

  const userContacts = currentUser?.role === 'admin'
    ? contacts
    : contacts.filter(c => c.salesPerson === currentUser.id);

  const stats = {
    total: userContacts.length,
    recent: userContacts.filter(c => getUrgencyLevel(daysSinceContact(c.lastContact)) === 'recent').length,
    urgent: userContacts.filter(c => getUrgencyLevel(daysSinceContact(c.lastContact)) === 'urgent').length,
    critical: userContacts.filter(c => getUrgencyLevel(daysSinceContact(c.lastContact)) === 'critical').length
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard label="Total Contacts" count={stats.total} icon={<Users />} color="text-gray-900" />
        <StatsCard label="Recent Contact" count={stats.recent} icon={<CheckCircle />} color="text-green-600" />
        <StatsCard label="Need Follow-up" count={stats.urgent} icon={<Clock />} color="text-orange-600" />
        <StatsCard label="Critical" count={stats.critical} icon={<AlertCircle />} color="text-red-600" />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {activities
              .filter(activity => 
                currentUser?.role === 'admin' || 
                activity.salesPerson === currentUser?.id
              )
              .slice(0, 5)
              .map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
