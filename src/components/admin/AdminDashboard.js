import React from 'react';
import { useData } from '../../context/DataContext';
import SalespersonCard from './SalespersonCard';

const AdminDashboard = () => {
  const { users } = useData();
  const salespeople = users.filter(u => u.role === 'salesperson');

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid gap-6">
        {salespeople.map(sp => (
          <SalespersonCard key={sp.id} salesperson={sp} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
