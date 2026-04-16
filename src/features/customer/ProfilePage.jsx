import React from 'react';
import useAuthStore from '../../store/authStore';
import { User, Mail, Phone, Shield, Pencil } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-5 md:p-8 max-w-screen-lg mx-auto">
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
            <h2 className="text-xl font-bold text-on-surface">{user?.name || 'John Doe'}</h2>
            <p className="text-sm text-on-surface-variant mb-4">{user?.email || 'user@contoh.com'}</p>
            <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border bg-primary/10 text-primary border-primary/20">
              {user?.role === 'admin' ? 'Admin' : 'Customer'}
            </span>
          </div>
        </div>

        {/* Detail Info */}
        <div className="md:col-span-2 card-elevated p-6 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Informasi Akun</h3>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-primary hover:bg-primary/10 text-xs font-bold transition-all">
              <Pencil className="h-3 w-3" /> Edit Profil
            </button>
          </div>

          <div className="space-y-5">
            {[
              { icon: <User className="h-5 w-5" />, label: 'Nama Lengkap', value: user?.name || 'John Doe' },
              { icon: <Mail className="h-5 w-5" />, label: 'Email', value: user?.email || 'user@contoh.com' },
              { icon: <Phone className="h-5 w-5" />, label: 'No. WhatsApp', value: '+62 812-3456-7890' },
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
            <button className="btn-secondary !px-4 !py-2.5 text-sm">Ubah Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
