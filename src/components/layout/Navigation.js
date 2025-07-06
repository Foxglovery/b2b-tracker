import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded ${active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white'}`}
    >
      {children}
    </Link>
  );
};

const Navigation = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) return null; // hide nav on login page

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold">Sales Tracker</h1>
      <div className="flex items-center gap-4">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        {currentUser.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
        <button
          onClick={() => { setCurrentUser(null); navigate('/login'); }}
          className="underline text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
