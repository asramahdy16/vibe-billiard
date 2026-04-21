import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  actionTo, 
  actionOnClick,
  className = '' 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`card-elevated p-12 text-center flex flex-col items-center justify-center border-dashed border-outline-variant/30 ${className}`}
    >
      <div className="w-20 h-20 rounded-3xl bg-surface-container flex items-center justify-center mb-6 text-on-surface-variant/40">
        {Icon ? <Icon className="w-10 h-10" /> : <span className="text-4xl text-on-surface-variant">👻</span>}
      </div>
      
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm mb-8 max-w-sm leading-relaxed">
        {description}
      </p>

      {actionLabel && (
        actionTo ? (
          <Link to={actionTo} className="btn-primary">
            {actionLabel}
          </Link>
        ) : (
          <button onClick={actionOnClick} className="btn-primary">
            {actionLabel}
          </button>
        )
      )}
    </motion.div>
  );
};

export default EmptyState;
