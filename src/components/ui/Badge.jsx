import React from 'react';

const Badge = ({ variant = 'default', children, className = '' }) => {
  const configs = {
    pending: 'bg-primary/10 text-primary border-primary/20',
    confirmed: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    in_progress: 'bg-secondary/10 text-secondary border-secondary/20',
    completed: 'bg-outline/10 text-on-surface-variant border-outline/20',
    cancelled: 'bg-error/10 text-error border-error/20',
    
    // Status Meja
    available: 'bg-tertiary/10 text-tertiary border-tertiary/30',
    booked: 'bg-primary/10 text-primary border-primary/30',
    in_use: 'bg-error/10 text-error border-error/30',
    inactive: 'bg-outline/10 text-outline border-outline/30',

    // Status Bayar
    paid: 'bg-tertiary/10 text-tertiary border-tertiary/20',
    unpaid: 'bg-primary/10 text-primary border-primary/20',

    default: 'bg-surface-container-high text-on-surface border-outline-variant/20',
  };

  const style = configs[variant] || configs.default;

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider border transition-colors ${style} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
