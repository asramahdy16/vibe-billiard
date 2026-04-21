import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 0.5,
  className = '',
  amount = 0.1
}) => {
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, amount }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
