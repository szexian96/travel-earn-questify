
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/Dashboard';
import QuestsManagement from './components/QuestsManagement';
import StoriesManagement from './components/StoriesManagement';
import ModelRoutesManagement from './components/ModelRoutesManagement';
import UsersManagement from './components/UsersManagement';
import SocialMediaManagement from './components/SocialMediaManagement';
import PerksManagement from './components/PerksManagement';

// Admin Panel component that handles routing for admin pages
const AdminPanel = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quests" element={<QuestsManagement />} />
        <Route path="/stories" element={<StoriesManagement />} />
        <Route path="/routes" element={<ModelRoutesManagement />} />
        <Route path="/users" element={<UsersManagement />} />
        <Route path="/social" element={<SocialMediaManagement />} />
        <Route path="/perks" element={<PerksManagement />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;
