import React from 'react';
import { useData } from '../../context/DataContext';

/* helpers – duplicate from card for simplicity */
const daysSince = (d) => Math.ceil(Math.abs(Date.now() - new Date(d)) / 86_400_000);
const urgency = (n) => (n <= 7 ? 'recent' : n <= 14 ? 'moderate' : n <= 30 ? 'urgent' : 'critical');
const hue = {
  recent:   'bg-green-100 border-green-300',
  moderate: 'bg-yellow-100 border-yellow-300',
  urgent:   'bg-orange-100 border-orange-300',
  critical: 'bg-red-100 border-red-300'
};

const SalespersonCard = ({ salesperson }) => {
  const { contacts } = useData();
  const myContacts = contacts.filter(c => c.salesPerson === salesperson.id);

  const stats = {
    total: myContacts.length,
    recent: myContacts.filter(c => urgency(daysSince(c.lastContact)) === 'recent').length,
    urgent: myContacts.filter(c => urgency(daysSince(c.lastContact)) === 'urgent').length,
    critical: myContacts.filter(c => urgency(daysSince(c.lastContact)) === 'critical').length
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">{salesperson.name}</h3>

      <div className="grid grid-cols-4 gap-4 mb-6 text-center">
        {['total','recent','urgent','critical'].map(key => (
          <div key={key}>
            <div className={`text-2xl font-bold ${key === 'recent'
              ? 'text-green-600'
              : key === 'urgent'
              ? 'text-orange-600'
              : key === 'critical'
              ? 'text-red-600'
              : 'text-gray-900'}`}>
              {stats[key]}
            </div>
            <div className="text-sm text-gray-600 capitalize">{key}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Contacts needing attention:</h4>
        {myContacts
          .filter(c => ['urgent','critical'].includes(urgency(daysSince(c.lastContact))))
          .slice(0, 3)
          .map(c => {
            const d = daysSince(c.lastContact);
            const lvl = urgency(d);
            return (
              <div key={c.id} className={`p-3 rounded border ${hue[lvl]} flex justify-between`}>
                <span>{c.name}</span>
                <span className="text-sm text-gray-600">{d} d</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SalespersonCard;
