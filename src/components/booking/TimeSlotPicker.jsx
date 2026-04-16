import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeSlotPicker = ({ date, onDateChange, startTime, duration, onTimeChange, onDurationChange }) => {
  const hours = Array.from({ length: 16 }, (_, i) => i + 8);
  const [disabledSlots] = React.useState([10, 14, 15]);

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
        <p className="text-sm text-on-surface-variant mb-4">Operasional 08:00 - 23:00. Slot abu-abu sudah terisi.</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {hours.map(h => {
            const timeString = `${h.toString().padStart(2, '0')}:00`;
            const isSelected = startTime === timeString;
            const isDisabled = disabledSlots.includes(h);

            return (
              <button
                key={h}
                disabled={isDisabled}
                onClick={() => onTimeChange(timeString)}
                className={`py-2.5 rounded-xl text-center font-bold text-sm transition-all duration-300 border
                  ${isDisabled 
                    ? 'bg-surface-container border-outline-variant/5 text-on-surface-variant/30 cursor-not-allowed' 
                    : isSelected 
                      ? 'gradient-primary text-on-primary-container border-primary glow-primary scale-105' 
                      : 'bg-surface-container-low border-outline-variant/10 text-on-surface hover:bg-surface-container-high hover:border-primary/30'
                  }
                `}
              >
                {timeString}
              </button>
            );
          })}
        </div>
      </div>

      {startTime && (
        <div>
          <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">Durasi Bermain</label>
          <div className="grid grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map(h => (
              <button 
                key={h} 
                onClick={() => onDurationChange(h)}
                className={`py-3 rounded-xl text-center font-bold text-sm transition-all duration-300 border
                  ${duration === h 
                    ? 'gradient-primary text-on-primary-container border-primary glow-primary' 
                    : 'bg-surface-container-low border-outline-variant/10 text-on-surface hover:bg-surface-container-high'
                  }
                `}
              >
                {h} Jam
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
