import React from 'react';

const TableCard = ({ table, selected, onSelect }) => {
  const isAvailable = table.status === 'available';

  const statusConfig = {
    available: { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'border-tertiary/30', label: 'Tersedia', dot: '🟢' },
    booked:    { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30', label: 'Dibooking', dot: '' },
    in_use:    { bg: 'bg-error/10', text: 'text-error', border: 'border-error/30', label: 'Dipakai', dot: '' },
    inactive:  { bg: 'bg-outline/10', text: 'text-outline', border: 'border-outline/30', label: 'Nonaktif', dot: '' },
  };

  const sc = statusConfig[table.status];

  return (
    <div 
      onClick={() => isAvailable && onSelect(table)}
      className={`relative rounded-2xl p-5 cursor-pointer transition-all duration-300 border overflow-hidden group
        ${selected 
          ? 'border-primary bg-primary/10 ring-2 ring-primary shadow-[0_0_25px_rgba(173,198,255,0.2)]' 
          : 'border-outline-variant/10 bg-surface-container-low hover:bg-surface-container-high'}
        ${!isAvailable && 'opacity-40 cursor-not-allowed'}
      `}
    >
      {/* Background number decoration */}
      <div className="absolute -bottom-2 -right-2 text-7xl font-black text-on-surface/5 group-hover:text-on-surface/10 transition-opacity">
        {table.name.replace('Meja ', '')}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="absolute top-0 right-0">
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${sc.bg} ${sc.text} ${sc.border}`}>
            {sc.dot} {sc.label}
          </span>
        </div>
        
        <div className={`w-16 h-16 rounded-xl mb-3 mt-4 flex items-center justify-center text-3xl transition-all
          ${selected ? 'bg-primary/20 scale-110' : 'bg-surface-container-high group-hover:bg-surface-container-highest'}`}>
          🎱
        </div>
        <h3 className="font-bold text-lg text-on-surface">{table.name}</h3>
      </div>
    </div>
  );
};

export default TableCard;
