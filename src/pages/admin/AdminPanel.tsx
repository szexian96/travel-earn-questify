
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/Dashboard';
import StoriesManagement from './components/StoriesManagement';
import ModelRoutesManagement from './components/ModelRoutesManagement';
import QuestsManagement from './components/QuestsManagement';
import UsersManagement from './components/UsersManagement';

const AdminPanel = () => {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = user?.username === 'admin' || user?.email === 'admin@questify.com';

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stories" element={<StoriesManagement />} />
        <Route path="/routes" element={<ModelRoutesManagement />} />
        <Route path="/quests" element={<QuestsManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;
