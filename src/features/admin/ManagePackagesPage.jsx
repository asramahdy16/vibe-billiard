import React from 'react';
import { Pencil, AlertTriangle } from 'lucide-react';

const mockPackages = [
  { id: 1, name: 'Paket Reguler', price: 'Rp 35.000', unit: '/jam', type: 'reguler', color: 'primary' },
  { id: 2, name: 'Paket Hemat', price: 'Rp 50.000', unit: '/2 jam', type: 'hemat', color: 'tertiary' },
];

const ManagePackagesPage = () => {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Manajemen Paket</h1>
        <p className="text-on-surface-variant">Kelola paket harga untuk pelanggan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {mockPackages.map(pkg => (
          <div key={pkg.id} className="relative group">
            {/* Glow border */}
            <div className={`absolute -inset-1 rounded-2xl blur transition duration-500
              ${pkg.color === 'tertiary' 
                ? 'bg-gradient-to-r from-tertiary/30 to-primary/30 opacity-100' 
                : 'bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100'}`}>
            </div>
            
            <div className={`relative rounded-2xl p-8 border overflow-hidden
              ${pkg.color === 'tertiary' 
                ? 'bg-surface-container-highest border-primary/20' 
                : 'bg-surface-container-high border-outline-variant/10'}`}>
              
              {/* Best value badge */}
              {pkg.type === 'hemat' && (
                <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[10px] font-black tracking-widest uppercase px-4 py-1 rounded-bl-xl rounded-tr-2xl">
                  Best Value
                </div>
              )}

              {/* Edit button */}
              <button className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container/50 text-on-surface-variant hover:text-primary hover:bg-primary/10 text-xs font-bold transition-all">
                <Pencil className="h-3 w-3" /> Edit
              </button>

              <div className="mt-8">
                <p className={`uppercase text-[10px] tracking-widest font-bold mb-2 ${pkg.color === 'tertiary' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                  {pkg.type === 'hemat' ? 'Pilihan Pro' : 'Standar Terbaik'}
                </p>
                <h2 className="text-3xl font-black text-on-surface mb-6">{pkg.name}</h2>
                
                <div className="flex items-end gap-1 mb-8">
                  <span className={`text-5xl font-black ${pkg.color === 'tertiary' ? 'text-tertiary' : 'text-primary'}`}>{pkg.price}</span>
                  <span className="text-on-surface-variant text-sm font-medium mb-2">{pkg.unit}</span>
                </div>

                {pkg.type === 'hemat' ? (
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Senin - Jumat</p>
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Pukul 08:00 - 17:00</p>
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Minimum 2 jam</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Setiap Hari</p>
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Durasi Fleksibel</p>
                    <p className="flex items-center gap-2"><span className="text-tertiary">✓</span> Jam Operasional Penuh</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Warning Note */}
      <div className="mt-8 max-w-4xl flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
        <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-on-surface-variant">
          <span className="font-bold text-on-surface">Catatan:</span> Logika Paket Hemat (diskon waktu tertentu) divalidasi langsung oleh sistem backend. Mengubah tipe paket memerlukan penyesuaian di sisi server.
        </p>
      </div>
    </div>
  );
};

export default ManagePackagesPage;
