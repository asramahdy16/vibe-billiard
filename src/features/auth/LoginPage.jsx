import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, MessageCircle, ArrowLeft } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('user@contoh.com');
  const [password, setPassword] = React.useState('password123');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Email dan Password wajib diisi!');
      return;
    }
    
    try {
      const data = await login({ email, password });
      toast.success('Login berhasil!');
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login gagal. Periksa kembali email dan password Anda.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pb-24 md:pb-4 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="glass-panel rounded-2xl border border-outline-variant/10 p-8 relative overflow-hidden">
          {/* Top accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-container"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2">Masuk</h1>
            <p className="text-on-surface-variant text-sm">Selamat datang kembali di Vibe Billiard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                className="input-field"
                placeholder="email@contoh.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field !pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <div className="flex justify-between items-center mt-3">
                <label className="flex items-center space-x-2 text-sm text-on-surface-variant cursor-pointer">
                  <input type="checkbox" className="rounded border-outline-variant bg-surface-container accent-primary" />
                  <span>Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">Lupa password?</a>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-primary w-full !py-3.5 text-base disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'MEMPROSES...' : 'MASUK'}
            </button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-surface-variant text-on-surface-variant font-medium rounded-full">atau</span>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white hover:scale-[1.02] active:scale-95">
            <MessageCircle className="h-5 w-5" /> Login via WhatsApp
          </button>

          <p className="text-center mt-8 text-sm text-on-surface-variant">
            Belum punya akun? <Link to="/register" className="text-primary font-bold hover:underline">Daftar sekarang</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
