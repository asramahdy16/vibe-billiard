import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import useAuthStore from './store/authStore';
import ScrollToTop from './components/layout/ScrollToTop';

function App() {
  const { checkAuth } = useAuthStore();

  React.useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#222a3d',
            color: '#dae2fd',
            border: '1px solid rgba(66, 71, 84, 0.3)',
            borderRadius: '12px',
            backdropFilter: 'blur(12px)',
            fontSize: '14px',
            fontWeight: '600',
          },
          success: {
            iconTheme: {
              primary: '#4ae176',
              secondary: '#003915',
            },
          },
          error: {
            iconTheme: {
              primary: '#ffb4ab',
              secondary: '#690005',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
