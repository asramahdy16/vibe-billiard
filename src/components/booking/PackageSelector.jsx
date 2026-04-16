import React from 'react';
import { getDay } from 'date-fns';

const PackageSelector = ({ date, startTime, duration, selectedPackage, onSelectPackage }) => {
  if (!date || !startTime) return null;

  const day = getDay(date);
  const isWeekday = day >= 1 && day <= 5;
  const startHour = parseInt(startTime.split(':')[0], 10);
  const isEligibleTime = startHour >= 8 && startHour <= 17;
  const showHemat = isWeekday && isEligibleTime && duration >= 2;

  const handleSelect = (pkgType) => {
    let price = 0;
    if (pkgType === 'reguler') {
      price = duration * 35000;
      onSelectPackage({ id: 1, name: 'Paket Reguler', price });
    } else if (pkgType === 'hemat') {
      price = 50000 + (duration > 2 ? (duration - 2) * 35000 : 0);
      onSelectPackage({ id: 2, name: 'Paket Hemat', price });
    }
  };

  const isRegulerSelected = selectedPackage?.id === 1;
  const isHematSelected = selectedPackage?.id === 2;

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Pilih Paket</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Paket Reguler */}
        <div className="relative group" onClick={() => handleSelect('reguler')}>
          <div className={`absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur transition duration-500 ${isRegulerSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
          <div className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border
            ${isRegulerSelected 
              ? 'bg-primary/10 border-primary ring-2 ring-primary shadow-[0_0_25px_rgba(173,198,255,0.2)]' 
              : 'bg-surface-container-high border-outline-variant/10 hover:bg-surface-container-highest'}
          `}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-2xl font-bold text-on-surface">Reguler</h4>
                <p className="text-on-surface-variant uppercase text-[10px] tracking-widest font-bold mt-1">Standar Terbaik</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                ${isRegulerSelected ? 'border-primary bg-primary' : 'border-outline'}`}>
                {isRegulerSelected && <div className="w-2 h-2 bg-on-primary-container rounded-full" />}
              </div>
            </div>

            <p className="text-on-surface-variant text-sm mb-1">Rp 35.000 <span className="text-xs">/jam</span></p>
            <p className="text-on-surface mb-4">
              Total: <span className="font-black text-2xl text-primary">Rp {(duration * 35000).toLocaleString('id-ID')}</span>
            </p>

            <ul className="text-sm text-on-surface-variant space-y-2">
              <li className="flex items-center gap-2"><span className="text-tertiary">✓</span> Berlaku setiap saat</li>
              <li className="flex items-center gap-2"><span className="text-tertiary">✓</span> Durasi fleksibel</li>
            </ul>
          </div>
        </div>

        {/* Paket Hemat */}
        {showHemat && (
          <div className="relative group" onClick={() => handleSelect('hemat')}>
            <div className={`absolute -inset-1 bg-gradient-to-r from-tertiary/30 to-primary/30 rounded-2xl blur transition duration-500 ${isHematSelected ? 'opacity-100' : 'opacity-70'}`}></div>
            <div className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border overflow-hidden
              ${isHematSelected 
                ? 'bg-tertiary/10 border-tertiary ring-2 ring-tertiary' 
                : 'bg-surface-container-highest border-primary/20 hover:bg-surface-container-highest'}
            `}>
              <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-bl-xl">
                HEMAT
              </div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-2xl font-bold text-on-surface">Hemat</h4>
                  <p className="text-tertiary uppercase text-[10px] tracking-widest font-bold mt-1">Pilihan Pro</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${isHematSelected ? 'border-tertiary bg-tertiary' : 'border-outline'}`}>
                  {isHematSelected && <div className="w-2 h-2 bg-on-tertiary rounded-full" />}
                </div>
              </div>

              <p className="text-on-surface-variant text-sm mb-1">Rp 50.000 <span className="text-xs">/2 jam</span></p>
              <p className="text-on-surface mb-4">
                Total: <span className="font-black text-2xl text-tertiary">Rp {(50000 + (duration > 2 ? (duration - 2) * 35000 : 0)).toLocaleString('id-ID')}</span>
              </p>

              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2 text-tertiary font-medium"><span>✓</span> Senin - Jumat, 08:00 - 17:00</li>
                <li className="flex items-center gap-2 text-on-surface-variant"><span className="text-tertiary">✓</span> {duration > 2 ? `+ ${duration - 2} jam reguler` : 'Pas 2 Jam'}</li>
                <li className="flex items-center gap-2 text-on-surface-variant"><span className="text-tertiary">✓</span> Hemat hingga 30%!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageSelector;
