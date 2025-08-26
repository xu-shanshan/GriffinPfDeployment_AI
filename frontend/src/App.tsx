import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import Dashboard from './pages/Dashboard'
import VEManagement from './pages/VEManagement'
import VEDetail from './pages/VEDetail'
import ServiceDetail from './pages/ServiceDetail'
import DeploymentHistory from './pages/DeploymentHistory'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="ve-management" element={<VEManagement />} />
        <Route path="ve/:veName" element={<VEDetail />} />
        <Route path="ve/:veName/service/:serviceName" element={<ServiceDetail />} />
        <Route path="deployment-history" element={<DeploymentHistory />} />
      </Route>
    </Routes>
  )
}

export default App
