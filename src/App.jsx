import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Plan from './pages/Plan';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';

import UserPanelRoutes from './pages/userpannel/UserPanelRoutes';
import AdminLogin from './pages/adminpannel/AdminLogin';
import AdminRoutes from './pages/adminpannel/AdminRoutes';

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* User Panel Routes */}
        <Route path="/user/*" element={<UserPanelRoutes />} />

        {/* Admin Panel Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Public Website Routes (Wrapped in public layout) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/plan" element={<Plan />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
