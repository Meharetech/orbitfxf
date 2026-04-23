import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layout/AdminLayout';
import AdminDashboard from './dashboard/AdminDashboard';
import AdminUserManagement from './AdminUserManagement';
import PaymentGateways from './payments/PaymentGateways';
import FundApprovals from './funds/FundApprovals';
import WithdrawalApprovals from './withdrawals/WithdrawalApprovals';
import AdminSettings from './AdminSettings';
import AdminInvestments from './investments/AdminInvestments';
import AdminInvestmentReports from './investments/AdminInvestmentReports';
import AdminDirectNetwork from './network/AdminDirectNetwork';
import AdminMatrixNetwork from './network/AdminMatrixNetwork';
import AdminInvestmentWithdrawals from './funds/AdminInvestmentWithdrawals';
import AdminAdjustmentHistory from './adjustments/AdminAdjustmentHistory';

const PlaceholderPage = ({ title }) => (
  <div className="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in-95 duration-700">
    <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/10">
      <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <h1 className="text-3xl font-black text-white uppercase tracking-tight">{title}</h1>
    <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mt-4">Administrative Node Under Construction</p>
    <div className="mt-8 flex gap-4">
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100"></div>
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200"></div>
    </div>
  </div>
);

const AdminRoutes = () => {
  // Simple check for admin token (Mock)
  const isAdminAuthenticated = !!localStorage.getItem('adminToken');

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUserManagement />} />
        <Route path="payments" element={<PaymentGateways />} />
        <Route path="funds" element={<FundApprovals />} />
        <Route path="investments" element={<AdminInvestments />} />
        <Route path="investment-withdrawals" element={<AdminInvestmentWithdrawals />} />
        <Route path="adjustment-history" element={<AdminAdjustmentHistory />} />
        
        {/* Management Routes */}
        <Route path="reports" element={<AdminInvestmentReports />} />
        <Route path="withdrawals" element={<WithdrawalApprovals />} />
        <Route path="settings" element={<AdminSettings />} />
        
        {/* Network Routes */}
        <Route path="network/direct" element={<AdminDirectNetwork />} />
        <Route path="network/levels" element={<AdminMatrixNetwork />} />
        
        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
