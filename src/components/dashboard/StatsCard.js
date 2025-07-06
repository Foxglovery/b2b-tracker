import React from 'react';

const StatsCard = ({ label, count, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{count}</p>
      </div>
      <div className={`h-8 w-8 ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatsCard;
