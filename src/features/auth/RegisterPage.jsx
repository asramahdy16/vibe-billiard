import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    toast.success('Pendaftaran berhasil! Silakan login.');
    navigate('/login');
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pb-24 md:pb-4 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="glass-panel rounded-2xl border border-outline-variant/10 p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-tertiary-container"></div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2">Daftar Akun</h1>
            <p className="text-on-surface-variant text-sm">Buat akun untuk mulai booking mejamu</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nama Lengkap</label>
              <input type="text" required className="input-field" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
              <input type="email" required className="input-field" placeholder="email@contoh.com" />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">No. WhatsApp</label>
              <input type="tel" required className="input-field" placeholder="0812xxxxxxxx" />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="input-field !pr-12"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-tertiary w-full !py-3.5 text-base mt-2">
              DAFTAR SEKARANG
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-on-surface-variant">
            Sudah punya akun? <Link to="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
