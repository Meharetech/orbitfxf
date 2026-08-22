import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './Layout';
import Dashboard from './dashboard/Dashboard';
import PlaceholderPage from './PlaceholderPage';
import NetworkTeam from './network/NetworkTeam';
import LevelTeam from './network/LevelTeam';
import TreeView from './network/TreeView';
import ProfileView from './profile/ProfileView';
import ChangePassword from './profile/ChangePassword';
import WalletSettings from './profile/WalletSettings';
import FundRequest from './fund/FundRequest';
import FundRequestHistory from './fund/FundRequestHistory';
import InternalTransfer from './fund/InternalTransfer';
import TransferHistory from './fund/TransferHistory';
import ReceivedHistory from './fund/ReceivedHistory';
import WithdrawalRequest from './withdrawal/WithdrawalRequest';
import WithdrawalHistory from './withdrawal/WithdrawalHistory';
import Investment from './topup/Investment';
import TradingProfitReport from './report/TradingProfitReport';
import TradingLevelReport from './report/TradingLevelReport';

const UserPanelRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Profile Routes */}
        <Route path="profile/view" element={<ProfileView />} />
        <Route path="profile/password" element={<ChangePassword />} />
        <Route path="profile/wallet" element={<WalletSettings />} />
        
        {/* Network Routes */}
        <Route path="network/direct" element={<NetworkTeam type="direct" title="Direct Team" />} />
        <Route path="network/level" element={<LevelTeam />} />
        <Route path="network/left" element={<NetworkTeam type="left" title="Left Team" />} />
        <Route path="network/right" element={<NetworkTeam type="right" title="Right Team" />} />
        <Route path="network/tree" element={<TreeView />} />
        
        {/* Top Up Routes */}
        <Route path="topup/investment" element={<Investment />} />
        
        {/* Fund Routes */}
        <Route path="fund/request" element={<FundRequest />} />
        <Route path="fund/request-history" element={<FundRequestHistory />} />
        <Route path="fund/transfer" element={<InternalTransfer />} />
        <Route path="fund/transfer-history" element={<TransferHistory />} />
        <Route path="fund/received-history" element={<ReceivedHistory />} />
        
        {/* Report Routes */}
        <Route path="report/trading-profit" element={<TradingProfitReport />} />
        <Route path="report/trading-level" element={<TradingLevelReport />} />
        
        {/* Withdrawal Routes */}
        <Route path="withdrawal" element={<WithdrawalRequest />} />
        <Route path="withdrawal/history" element={<WithdrawalHistory />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default UserPanelRoutes;
