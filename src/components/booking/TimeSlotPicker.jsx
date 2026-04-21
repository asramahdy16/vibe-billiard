import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion, AnimatePresence } from 'framer-motion';

const TimeSlotPicker = ({ date, onDateChange, startTime, duration, onTimeChange, onDurationChange }) => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 08:00 - 23:00

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Pilih Tanggal</label>
        <DatePicker 
          selected={date} 
          onChange={onDateChange} 
          minDate={new Date()}
          className="input-field"
          dateFormat="dd MMMM yyyy"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Pilih Jam Mulai</label>
        <p className="text-sm text-on-surface-variant mb-4">Operasional 08:00 - 23:00. Pilih jam mulai bermain.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {hours.map((h, i) => {
            const timeString = `${h.toString().padStart(2, '0')}:00`;
            const isSelected = startTime === timeString;

            return (
              <motion.button
                key={h}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02, duration: 0.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTimeChange(timeString)}
                className={`py-2.5 rounded-xl text-center font-bold text-sm transition-colors border
                  ${isSelected 
                    ? 'gradient-primary text-on-primary-container border-primary glow-primary shadow-sm' 
                    : 'bg-surface-container-low border-outline-variant/10 text-on-surface hover:bg-surface-container-high hover:border-primary/30'
                  }
                `}
              >
                {timeString}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {startTime && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Durasi Bermain</label>
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((h, i) => (
                  <motion.button 
                    key={h}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onDurationChange(h)}
                    className={`py-3 rounded-xl text-center font-bold text-sm transition-colors border
                      ${duration === h 
                        ? 'gradient-primary text-on-primary-container border-primary glow-primary shadow-sm' 
                        : 'bg-surface-container-low border-outline-variant/10 text-on-surface hover:bg-surface-container-high'
                      }
                    `}
                  >
                    {h} Jam
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimeSlotPicker;
