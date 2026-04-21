import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  
  const { register, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const calculateStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strengthScore = calculateStrength(formData.password);
  const strengthColors = ['bg-outline-variant/30', 'bg-error', 'bg-tertiary', 'bg-primary', 'bg-secondary'];
  const strengthLabels = ['Sangat Lemah', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
  const currentStrengthColor = formData.password.length > 0 ? strengthColors[strengthScore] : strengthColors[0];
  const currentStrengthLabel = formData.password.length > 0 ? strengthLabels[strengthScore] : '';

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password_confirmation) {
      toast.error('Konfirmasi password tidak cocok!');
      return;
    }

    try {
      await register(formData);
      toast.success('Pendaftaran berhasil! Selamat datang.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 pb-24 md:pb-4 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div 
        animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-tertiary/10 rounded-full blur-[100px]" 
      />

      <div className="relative w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-2xl border border-outline-variant/10 p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tertiary to-tertiary-container"></div>

          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-3xl">📝</span>
            </motion.div>
            <h1 className="text-3xl font-black tracking-tight text-on-surface mb-2">Daftar Akun</h1>
            <p className="text-on-surface-variant text-sm">Buat akun untuk mulai booking mejamu</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                required 
                className="input-field" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                required 
                className="input-field" 
                placeholder="email@contoh.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">No. WhatsApp</label>
              <input 
                type="tel" 
                required 
                className="input-field" 
                placeholder="0812xxxxxxxx" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required
                  className="input-field !pr-12"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {formData.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden mb-1">
                    {[1, 2, 3, 4].map(level => (
                      <div 
                        key={level} 
                        className={`flex-1 transition-colors duration-300 ${strengthScore >= level ? currentStrengthColor : 'bg-transparent'}`}
                      />
                    ))}
                  </div>
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-right ${strengthScore > 2 ? 'text-primary' : 'text-on-surface-variant'}`}>{currentStrengthLabel}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Konfirmasi Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                required
                className="input-field"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="btn-tertiary w-full !py-3.5 text-base mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> MENDAFTAR...</>
              ) : 'DAFTAR SEKARANG'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-on-surface-variant">
            Sudah punya akun? <Link to="/login" className="text-primary font-bold hover:underline">Masuk di sini</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
