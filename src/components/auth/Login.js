import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { users } = useData();
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sales Activity Tracker</h2>
          <p className="text-sm text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          {users.map(user => (
            <button
              key={user.id}
              onClick={() => {
                setCurrentUser(user);
                navigate('/');
              }}
              className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50"
            >
              <div className="text-left">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-500">{user.role}</div>
              </div>
              <UserCheck className="h-5 w-5 text-blue-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;