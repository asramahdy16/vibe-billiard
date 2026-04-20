import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// Layout Components
import Navbar from '../components/layout/Navbar';
import UserLayout from '../components/layout/UserLayout';
import Sidebar from '../components/layout/Sidebar';

// Public Pages
import LandingPage from '../features/home/LandingPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';

// Customer Pages
import UserDashboard from '../features/customer/UserDashboard';
import BookingPage from '../features/customer/BookingPage';
import CheckoutPage from '../features/customer/CheckoutPage';
import BookingSuccessPage from '../features/customer/BookingSuccessPage';
import MyBookingsPage from '../features/customer/MyBookingsPage';
import ProfilePage from '../features/customer/ProfilePage';

// Admin Pages
import DashboardPage from '../features/admin/DashboardPage';
import ManageTablesPage from '../features/admin/ManageTablesPage';
import ManagePackagesPage from '../features/admin/ManagePackagesPage';
import TransactionsPage from '../features/admin/TransactionsPage';
import ManageBookingsPage from '../features/admin/ManageBookingsPage';

// === Layouts ===
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 pt-16">{children}</main>
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="flex-1 ml-64 overflow-x-hidden min-h-screen">{children}</main>
  </div>
);

// === Route Guards ===
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return null; // Prevent redirect flash during auth check
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
      <Route path="/login" element={<GuestRoute><PublicLayout><LoginPage /></PublicLayout></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><PublicLayout><RegisterPage /></PublicLayout></GuestRoute>} />

      {/* ===== CUSTOMER ROUTES (Requires Login) ===== */}
      <Route path="/dashboard" element={<PrivateRoute><UserLayout><UserDashboard /></UserLayout></PrivateRoute>} />
      <Route path="/booking" element={<PrivateRoute><UserLayout><BookingPage /></UserLayout></PrivateRoute>} />
      <Route path="/booking/checkout" element={<PrivateRoute><UserLayout><CheckoutPage /></UserLayout></PrivateRoute>} />
      <Route path="/booking/success" element={<PrivateRoute><UserLayout><BookingSuccessPage /></UserLayout></PrivateRoute>} />
      <Route path="/my-bookings" element={<PrivateRoute><UserLayout><MyBookingsPage /></UserLayout></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserLayout><ProfilePage /></UserLayout></PrivateRoute>} />

      {/* ===== ADMIN ROUTES ===== */}
      <Route path="/admin" element={<AdminRoute><AdminLayout><DashboardPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/tables" element={<AdminRoute><AdminLayout><ManageTablesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/packages" element={<AdminRoute><AdminLayout><ManagePackagesPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/bookings" element={<AdminRoute><AdminLayout><ManageBookingsPage /></AdminLayout></AdminRoute>} />
      <Route path="/admin/transactions" element={<AdminRoute><AdminLayout><TransactionsPage /></AdminLayout></AdminRoute>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
