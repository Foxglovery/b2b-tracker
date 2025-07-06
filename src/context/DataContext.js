import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // paste your mock arrays here ↓ (contacts, users, activities)
  const [contacts, setContacts] = useState([...]);
  const [users] = useState([...]);
  const [activities, setActivities] = useState([...]);

  /* CRUD helpers (addContact, updateContact, etc.) from your old code */

  return (
    <DataContext.Provider value={{
      contacts, setContacts,
      users,
      activities, setActivities,
      /* expose helpers */
    }}>
      {children}
    </DataContext.Provider>
  );
};