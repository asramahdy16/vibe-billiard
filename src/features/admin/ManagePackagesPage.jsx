import React, { useState, useEffect } from 'react';
import * as packageApi from '../../api/packageApi';
import toast from 'react-hot-toast';
import { Pencil, AlertTriangle, Loader2, X } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

const ManagePackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    nama_paket: '',
    harga_per_jam: '',
    harga_flat: '',
    durasi_min_jam: 1
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchPackages = async () => {
    try {
      const data = await packageApi.adminGetPackages();
      setPackages(data.data);
    } catch (error) {
      toast.error('Gagal mengambil data paket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const openEditModal = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      nama_paket: pkg.nama_paket,
      harga_per_jam: pkg.harga_per_jam || '',
      harga_flat: pkg.harga_flat || '',
      durasi_min_jam: pkg.durasi_min_jam || 1
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPackage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama_paket) {
      toast.error('Nama paket harus diisi');
      return;
    }

    const isHemat = editingPackage.harga_flat !== null;
    if (isHemat && !formData.harga_flat) {
      toast.error('Harga flat wajib diisi untuk Paket Hemat');
      return;
    }
    if (!isHemat && !formData.harga_per_jam) {
      toast.error('Harga per jam wajib diisi untuk Paket Reguler');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        nama_paket: formData.nama_paket,
        durasi_min_jam: formData.durasi_min_jam,
        harga_per_jam: formData.harga_per_jam ? Number(formData.harga_per_jam) : null,
        harga_flat: formData.harga_flat ? Number(formData.harga_flat) : null
      };

      await packageApi.adminUpdatePackage(editingPackage.id, payload);
      toast.success('Paket berhasil diupdate');
      closeModal();
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal mengubah paket');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 relative">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-on-surface mb-1">Manajemen Paket</h1>
        <p className="text-on-surface-variant">Kelola paket harga untuk pelanggan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {packages.map((pkg, idx) => {
          const isHemat = pkg.harga_flat !== null;
          const price = isHemat ? pkg.harga_flat : pkg.harga_per_jam;
          const unit = isHemat ? `/${pkg.durasi_min_jam} jam` : '/jam';
          const color = isHemat ? 'tertiary' : 'primary';

          return (
            <ScrollReveal delay={idx * 0.1} key={pkg.id} className="relative group">
              {/* Glow border */}
              <div className={`absolute -inset-1 rounded-2xl blur transition duration-500
                ${color === 'tertiary' 
                  ? 'bg-gradient-to-r from-tertiary/30 to-primary/30 opacity-100' 
                  : 'bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100'}`}>
              </div>
              
              <div className={`relative h-full rounded-2xl p-8 border overflow-hidden
                ${color === 'tertiary' 
                  ? 'bg-surface-container-highest border-primary/20 shadow-[0_0_20px_rgba(74,225,118,0.2)]' 
                  : 'bg-surface-container-high border-outline-variant/10 shadow-lg'}`}>
                
                {/* Best value badge */}
                {isHemat && (
                  <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[10px] font-black tracking-widest uppercase px-4 py-1 rounded-bl-xl rounded-tr-2xl shadow-md">
                    Best Value
                  </div>
                )}

                {/* Edit button */}
                <button 
                  onClick={() => openEditModal(pkg)}
                  className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container/80 text-on-surface-variant z-20 hover:text-primary hover:bg-primary/10 text-xs font-bold transition-all backdrop-blur-sm"
                >
                  <Pencil className="h-3 w-3" /> Edit
                </button>

                <div className="mt-8">
                  <p className={`uppercase text-[10px] tracking-widest font-bold mb-2 ${color === 'tertiary' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
                    {isHemat ? 'Pilihan Pro' : 'Standar Terbaik'}
                  </p>
                  <h2 className="text-3xl font-black text-on-surface mb-6 group-hover:scale-[1.02] transition-transform origin-left">{pkg.nama_paket}</h2>
                  
                  <div className="flex items-end gap-1 mb-8">
                    <span className={`text-5xl font-black ${color === 'tertiary' ? 'text-tertiary' : 'text-primary'}`}>
                      Rp {Number(price).toLocaleString('id-ID')}
                    </span>
                    <span className="text-on-surface-variant text-sm font-medium mb-2">{unit}</span>
                  </div>

                  {isHemat ? (
                    <div className="space-y-3 text-sm text-on-surface-variant font-medium">
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Senin - Jumat</p>
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Pukul 08:00 - 17:00</p>
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Minimum {pkg.durasi_min_jam} jam</p>
                    </div>
                  ) : (
                    <div className="space-y-3 text-sm text-on-surface-variant font-medium">
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Setiap Hari</p>
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Durasi Fleksibel</p>
                      <p className="flex items-center gap-2 text-on-surface"><span className="text-tertiary">✓</span> Jam Operasional Penuh</p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
      
      {/* Warning Note */}
      <div className="mt-8 max-w-4xl flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-xl">
        <AlertTriangle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-sm text-on-surface-variant">
          <span className="font-bold text-on-surface">Catatan:</span> Logika Paket Hemat (diskon waktu tertentu) divalidasi langsung oleh sistem backend. Mengubah tipe paket memerlukan penyesuaian di sisi server.
        </p>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isModalOpen && editingPackage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeModal}></motion.div>
            <motion.div initial={{opacity:0, scale:0.95, y:20}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.95, y:20}} className="relative w-full max-w-md card-elevated p-6 shadow-[0_20px_60px_-15px_rgba(0,40,93,0.3)]">
              <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-on-surface">Edit Paket</h2>
              <button onClick={closeModal} className="p-2 hover:bg-surface-container rounded-lg text-on-surface-variant transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nama Paket</label>
                <input 
                  type="text" 
                  className="input-field"
                  value={formData.nama_paket}
                  onChange={(e) => setFormData({...formData, nama_paket: e.target.value})}
                  required
                />
              </div>

              {editingPackage.harga_flat !== null ? (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Harga Flat (Rp)</label>
                  <input 
                    type="number" 
                    className="input-field"
                    value={formData.harga_flat}
                    onChange={(e) => setFormData({...formData, harga_flat: e.target.value})}
                    required
                  />
                  <p className="text-xs text-on-surface-variant mt-2">Harga total untuk {formData.durasi_min_jam} jam pertama.</p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Harga Per Jam (Rp)</label>
                  <input 
                    type="number" 
                    className="input-field"
                    value={formData.harga_per_jam}
                    onChange={(e) => setFormData({...formData, harga_per_jam: e.target.value})}
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Durasi Minimum (Jam)</label>
                <input 
                  type="number" 
                  min="1"
                  className="input-field"
                  value={formData.durasi_min_jam}
                  onChange={(e) => setFormData({...formData, durasi_min_jam: e.target.value})}
                  required
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={closeModal} className="btn-secondary flex-1">Batal</button>
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePackagesPage;
