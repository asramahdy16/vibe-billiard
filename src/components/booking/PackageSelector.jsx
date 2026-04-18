import React, { useState, useEffect } from 'react';
import { getDay } from 'date-fns';
import * as packageApi from '../../api/packageApi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const PackageSelector = ({ date, startTime, duration, selectedPackage, onSelectPackage }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await packageApi.getPackages();
        setPackages(data.data);
      } catch (error) {
        toast.error('Gagal mengambil data paket.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (!date || !startTime) return null;

  const day = getDay(date);
  const isWeekday = day >= 1 && day <= 5;
  const startHour = parseInt(startTime.split(':')[0], 10);
  const endHour = startHour + duration;

  // Calculate price for a package
  const calculatePrice = (pkg) => {
    if (pkg.harga_flat !== null) {
      // Paket Hemat: flat price + extra hours at regular rate
      const regularPkg = packages.find(p => p.harga_flat === null);
      const regularRate = regularPkg ? Number(regularPkg.harga_per_jam) : 35000;
      const extraHours = Math.max(0, duration - pkg.durasi_min_jam);
      return Number(pkg.harga_flat) + (extraHours * regularRate);
    }
    // Paket Reguler: per hour
    return Number(pkg.harga_per_jam) * duration;
  };

  // Check if package is eligible based on conditions
  const isEligible = (pkg) => {
    if (pkg.harga_flat === null) return true; // Reguler always eligible
    // Hemat: check weekday, time range, min duration
    const isEligibleTime = startHour >= 8 && endHour <= 17;
    return isWeekday && isEligibleTime && duration >= pkg.durasi_min_jam;
  };

  const handleSelect = (pkg) => {
    const price = calculatePrice(pkg);
    onSelectPackage({ id: pkg.id, name: pkg.nama_paket, price });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant">
        <Loader2 className="h-8 w-8 animate-spin mb-3 text-primary" />
        <p className="font-medium text-sm">Memuat data paket...</p>
      </div>
    );
  }

  const eligiblePackages = packages.filter(isEligible);

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Pilih Paket</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {eligiblePackages.map((pkg) => {
          const isHemat = pkg.harga_flat !== null;
          const price = calculatePrice(pkg);
          const isSelected = selectedPackage?.id === pkg.id;
          const color = isHemat ? 'tertiary' : 'primary';
          const pricePerUnit = isHemat ? pkg.harga_flat : pkg.harga_per_jam;
          const unitLabel = isHemat ? `/${pkg.durasi_min_jam} jam` : '/jam';

          return (
            <div key={pkg.id} className="relative group" onClick={() => handleSelect(pkg)}>
              <div className={`absolute -inset-1 bg-gradient-to-r ${isHemat ? 'from-tertiary/30 to-primary/30' : 'from-primary/20 to-transparent'} rounded-2xl blur transition duration-500 ${isSelected ? 'opacity-100' : isHemat ? 'opacity-70' : 'opacity-0 group-hover:opacity-50'}`}></div>
              <div className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border overflow-hidden
                ${isSelected 
                  ? `bg-${color}/10 border-${color} ring-2 ring-${color} ${isHemat ? '' : 'shadow-[0_0_25px_rgba(173,198,255,0.2)]'}` 
                  : `${isHemat ? 'bg-surface-container-highest border-primary/20' : 'bg-surface-container-high border-outline-variant/10'} hover:bg-surface-container-highest`}
              `}>
                {isHemat && (
                  <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-bl-xl">
                    HEMAT
                  </div>
                )}

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-2xl font-bold text-on-surface">{pkg.nama_paket.replace('Paket ', '')}</h4>
                    <p className={`${isHemat ? 'text-tertiary' : 'text-on-surface-variant'} uppercase text-[10px] tracking-widest font-bold mt-1`}>
                      {isHemat ? 'Pilihan Pro' : 'Standar Terbaik'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${isSelected ? `border-${color} bg-${color}` : 'border-outline'}`}>
                    {isSelected && <div className={`w-2 h-2 ${isHemat ? 'bg-on-tertiary' : 'bg-on-primary-container'} rounded-full`} />}
                  </div>
                </div>

                <p className="text-on-surface-variant text-sm mb-1">
                  Rp {Number(pricePerUnit).toLocaleString('id-ID')} <span className="text-xs">{unitLabel}</span>
                </p>
                <p className="text-on-surface mb-4">
                  Total: <span className={`font-black text-2xl text-${color}`}>Rp {price.toLocaleString('id-ID')}</span>
                </p>

                <ul className={`text-sm space-y-2 ${isHemat ? '' : 'text-on-surface-variant'}`}>
                  {isHemat ? (
                    <>
                      <li className="flex items-center gap-2 text-tertiary font-medium"><span>✓</span> Senin - Jumat, 08:00 - 17:00</li>
                      <li className="flex items-center gap-2 text-on-surface-variant"><span className="text-tertiary">✓</span> {duration > pkg.durasi_min_jam ? `+ ${duration - pkg.durasi_min_jam} jam reguler` : `Pas ${pkg.durasi_min_jam} Jam`}</li>
                      <li className="flex items-center gap-2 text-on-surface-variant"><span className="text-tertiary">✓</span> Hemat hingga 30%!</li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center gap-2"><span className="text-tertiary">✓</span> Berlaku setiap saat</li>
                      <li className="flex items-center gap-2"><span className="text-tertiary">✓</span> Durasi fleksibel</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PackageSelector;
