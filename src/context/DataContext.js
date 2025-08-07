import React, { createContext, useContext, useState, useCallback } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

// ---------- helpers ----------
const todayISO = () => new Date().toISOString().split('T')[0];

export const DataProvider = ({ children }) => {
  /* seed data (swap for Firestore later) */
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'ABC Corp',
      email: 'john@abccorp.com',
      phone: '555-0123',
      lastContact: '2024-06-20',
      status: 'prospect',
      salesPerson: 'alice',
      notes: 'Interested in premium package',
      preferredContactMethod: 'email'
    },
    {
      id: 2,
      name: 'XYZ Industries',
      email: 'sarah@xyzind.com',
      phone: '555-0456',
      lastContact: '2024-06-25',
      status: 'qualified',
      salesPerson: 'bob',
      notes: 'Follow up on pricing discussion',
      preferredContactMethod: 'phone'
    },
    {
      id: 3,
      name: 'Tech Solutions LLC',
      email: 'mike@techsolutions.com',
      phone: '555-0789',
      lastContact: '2024-05-15',
      status: 'cold',
      salesPerson: 'alice',
      notes: 'Need to reconnect after vacation',
      preferredContactMethod: 'text'
    }
  ]);

  const [users] = useState([
    { id: 'alice', name: 'Alice Johnson', role: 'salesperson', email: 'alice@company.com' },
    { id: 'bob',   name: 'Bob Smith',     role: 'salesperson', email: 'bob@company.com' },
    { id: 'admin', name: 'Admin User',    role: 'admin',       email: 'admin@company.com' }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      contactId: 1,
      type: 'phone',
      date: '2024-06-20',
      notes: 'Discussed pricing and timeline',
      salesPerson: 'alice',
      salesPersonName: 'Alice Johnson',
      clientName: 'ABC Corp'
    },
    {
      id: 2,
      contactId: 2,
      type: 'email',
      date: '2024-06-25',
      notes: 'Sent proposal document',
      salesPerson: 'bob',
      salesPersonName: 'Bob Smith',
      clientName: 'XYZ Industries'
    }
  ]);

  /* CRUD wrapped in useCallback so children aren't re-rendered unnecessarily */
  const addContact = useCallback((data) => {
    setContacts(prev => [...prev, { id: Date.now(), lastContact: todayISO(), ...data }]);
  }, []);

  const updateContact = useCallback((updated) => {
    setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  }, []);

  const deleteContact = useCallback((id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    setActivities(prev => prev.filter(a => a.contactId !== id)); // tidy logs
  }, []);

  const markContactedToday = useCallback((contactId, salesPerson, method = 'phone', notes = '') => {
    const contact = contacts.find(c => c.id === contactId);
    const salesPersonUser = users.find(u => u.id === salesPerson);
    
    setContacts(prev =>
      prev.map(c =>
        c.id === contactId ? { ...c, lastContact: todayISO(), salesPerson } : c
      )
    );
    setActivities(prev => [
      {
        id: Date.now(),
        contactId,
        type: method,
        date: todayISO(),
        notes: notes || `Contacted via ${method}`,
        salesPerson,
        salesPersonName: salesPersonUser?.name || 'Unknown User',
        clientName: contact?.name || 'Unknown Client'
      },
      ...prev
    ]);
  }, [contacts, users]);

  return (
    <DataContext.Provider
      value={{
        contacts,
        users,
        activities,
        addContact,
        updateContact,
        deleteContact,
        markContactedToday
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
