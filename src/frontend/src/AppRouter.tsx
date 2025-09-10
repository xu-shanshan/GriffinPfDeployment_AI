import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import VeManagementPage from './pages/VeManagementPage';
import VeDetailPage from './pages/VeDetailPage';
import VeServiceInVePage from './pages/VeServiceInVePage';
import ServicesManagementPage from './pages/ServicesManagementPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import DeploymentHistoryPage from './pages/DeploymentHistoryPage';
import LoginPage from './pages/LoginPage';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/ves" element={<VeManagementPage />} />
        <Route path="/ve/:name" element={<VeDetailPage />} />
        <Route path="/ve/:ve/service/:service" element={<VeServiceInVePage />} />
        <Route path="/services" element={<ServicesManagementPage />} />
        <Route path="/service/:id" element={<ServiceDetailPage />} />
        <Route path="/deployments" element={<DeploymentHistoryPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
);

export default AppRouter;
