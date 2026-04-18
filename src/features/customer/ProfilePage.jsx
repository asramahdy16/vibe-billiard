import React, { useState } from 'react';
import useAuthStore from '../../store/authStore';
import * as authApi from '../../api/authApi';
import toast from 'react-hot-toast';
import { User, Mail, Phone, Shield, Pencil, X, Eye, EyeOff } from 'lucide-react';

const ProfilePage = () => {
  const { user, checkAuth } = useAuthStore();
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'profile' or 'password'
  const [submitting, setSubmitting] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || ''
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const openProfileModal = () => {
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || ''
    });
    setActiveModal('profile');
  };

  const openPasswordModal = () => {
    setPasswordForm({
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    });
    setShowPassword(false);
    setActiveModal('password');
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!profileForm.name) {
      toast.error('Nama lengkap wajib diisi');
      return;
    }

    setSubmitting(true);
    try {
      await authApi.updateProfile(profileForm);
      toast.success('Profil berhasil diperbarui');
      await checkAuth(); // Refetch user data
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal memperbarui profil');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.new_password_confirmation) {
      toast.error('Konfirmasi password baru tidak cocok');
      return;
    }

    setSubmitting(true);
    try {
      await authApi.updatePassword(passwordForm);
      toast.success('Password berhasil diubah');
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengubah password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5 md:p-8 max-w-screen-lg mx-auto relative">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-1">Profil Saya</h1>
        <p className="text-on-surface-variant">Kelola informasi akun dan preferensimu.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Avatar Card */}
        <div className="card-elevated p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-primary/20 to-tertiary/20"></div>
          <div className="relative z-10 pt-6">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 border-4 border-surface-container-high flex items-center justify-center mx-auto mb-4 text-4xl font-black text-primary">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <h2 className="text-xl font-bold text-on-surface">{user?.name || 'Loading...'}</h2>
            <p className="text-sm text-on-surface-variant mb-4">{user?.email}</p>
            <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border bg-primary/10 text-primary border-primary/20">
              {user?.role === 'admin' ? 'Admin' : 'Customer'}
            </span>
          </div>
        </div>

        {/* Detail Info */}
        <div className="md:col-span-2 card-elevated p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Informasi Akun</h3>
            <button 
              onClick={openProfileModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-primary/10 text-xs font-bold transition-all"
            >
              <Pencil className="h-3 w-3" /> Edit Profil
            </button>
          </div>

          <div className="space-y-5">
            {[
              { icon: <User className="h-5 w-5" />, label: 'Nama Lengkap', value: user?.name || '' },
              { icon: <Mail className="h-5 w-5" />, label: 'Email', value: user?.email || '' },
              { icon: <Phone className="h-5 w-5" />, label: 'No. WhatsApp', value: user?.phone || 'Belum diatur' },
              { icon: <Shield className="h-5 w-5" />, label: 'Role', value: user?.role === 'admin' ? 'Administrator' : 'Customer' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-surface-container text-on-surface-variant flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{item.label}</p>
                  <p className="text-on-surface font-medium truncate">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Change Password */}
          <div className="mt-8 pt-6 border-t border-outline-variant/10">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Keamanan</h3>
            <button onClick={openPasswordModal} className="btn-secondary !px-4 !py-2.5 text-sm">Ubah Password</button>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {activeModal === 'profile' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative w-full max-w-md card-elevated p-6 animate-in slide-in-from-bottom-8 fade-in-0 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Edit Profil</h2>
              <button onClick={closeModal} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">No. WhatsApp</label>
                <input 
                  type="text" 
                  className="input-field"
                  placeholder="Contoh: 081234567890"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                />
              </div>
              
              <div className="bg-surface-container rounded-lg p-3 text-xs text-on-surface-variant leading-relaxed border border-outline-variant/10">
                Email tidak dapat diubah secara langsung demi keamanan. Harap hubungi administrator melalui WhatsApp admin jika ingin mengganti email.
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative w-full max-w-md card-elevated p-6 animate-in slide-in-from-bottom-8 fade-in-0 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Ubah Password</h2>
              <button onClick={closeModal} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Password Saat Ini</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="input-field pr-12"
                    value={passwordForm.current_password}
                    onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Password Baru</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                  required
                  minLength={8}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Konfirmasi Password Baru</label>
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="input-field"
                  value={passwordForm.new_password_confirmation}
                  onChange={(e) => setPasswordForm({...passwordForm, new_password_confirmation: e.target.value})}
                  required
                  minLength={8}
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Memproses...' : 'Ubah Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
