import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import ProtectedRoute from './components/layout/ProtectedRoute';

import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Contacts from './components/contacts/Contacts';
import AdminDashboard from './components/admin/AdminDashboard';

import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

const App = () => (
  <AuthProvider>
    <DataProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* everything else is gated */}
          <Route element={<ProtectedRoute />}>
            <Route index element={<Dashboard />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>
);

export default App;
