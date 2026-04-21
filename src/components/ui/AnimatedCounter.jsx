import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, prefix = '', suffix = '', className = '' }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  });

  useEffect(() => {
    if (hasStarted) {
      // Remove all non-numeric characters for the counter
      const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.-]+/g,"")) : value;
      springValue.set(numericValue || 0);
    }
  }, [value, hasStarted, springValue]);

  const display = useTransform(springValue, (current) => {
    return `${prefix}${Math.round(current).toLocaleString('id-ID')}${suffix}`;
  });

  return (
    <motion.span 
      className={className}
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true }}
    >
      {display}
    </motion.span>
  );
};

export default AnimatedCounter;
