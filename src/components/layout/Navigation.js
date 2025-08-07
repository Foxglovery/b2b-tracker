import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded text-sm sm:text-base whitespace-nowrap ${active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700 hover:text-white'}`}
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
    <nav className="bg-blue-600 text-white w-full">
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="font-bold text-lg">Sales Tracker</h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/contacts">Contacts</NavLink>
          {currentUser.role === 'admin' && <NavLink to="/admin">Admin</NavLink>}
          <button
            onClick={() => { setCurrentUser(null); navigate('/login'); }}
            className="underline text-sm px-3 py-2 rounded hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
