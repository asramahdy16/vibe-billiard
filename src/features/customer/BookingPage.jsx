import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBookingStore from '../../store/bookingStore';
import * as tableApi from '../../api/tableApi';
import TableCard from '../../components/booking/TableCard';
import TimeSlotPicker from '../../components/booking/TimeSlotPicker';
import PackageSelector from '../../components/booking/PackageSelector';
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const { 
    selectedTable, setTable, 
    selectedDate, startTime, setDateTime,
    selectedPackage, setPackage 
  } = useBookingStore();

  React.useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await tableApi.getTables();
        // Map backend 'nama_meja' to frontend 'name' for TableCard component
        const formattedTables = data.data.map(t => ({
          ...t,
          name: t.nama_meja
        }));
        setTables(formattedTables);
      } catch (error) {
        toast.error('Gagal mengambil data meja.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTables();
  }, []);

  const [date, setDate] = useState(selectedDate ? new Date(selectedDate) : new Date());
  const [time, setTime] = useState(startTime || null);
  const [duration, setDuration] = useState(2);

  const handleNextStep = () => {
    if (step === 1 && selectedTable) setStep(2);
    else if (step === 2 && date && time) {
      const startHour = parseInt(time.split(':')[0]);
      let endHour = startHour + duration;
      let endTimeStr = `${endHour.toString().padStart(2, '0')}:00`;
      
      if (endHour >= 24) {
        endTimeStr = '23:59';
      }
      
      // Format date as local YYYY-MM-DD to avoid UTC timezone shift
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const localDateStr = `${year}-${month}-${day}`;
      
      setDateTime(localDateStr, time, endTimeStr);
      setStep(3);
    }
    else if (step === 3 && selectedPackage) navigate('/booking/checkout');
  };

  const steps = ['Pilih Meja', 'Pilih Waktu', 'Pilih Paket'];

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-2">Pemesanan Meja</h1>
        <p className="text-on-surface-variant">Ikuti langkah-langkah berikut untuk memesan mejamu.</p>
      </div>

      {/* Stepper */}
      <div className="glass-panel rounded-2xl border border-outline-variant/10 p-5 mb-8">
        <div className="flex items-center">
          {steps.map((label, idx) => (
            <React.Fragment key={idx}>
              <div className={`flex flex-col items-center flex-1 transition-all duration-500 ${step >= idx + 1 ? 'text-primary' : 'text-on-surface-variant/50'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black mb-2 transition-all duration-500
                  ${step > idx + 1 
                    ? 'bg-tertiary text-on-tertiary' 
                    : step === idx + 1 
                      ? 'gradient-primary text-on-primary-container glow-primary' 
                      : 'bg-surface-container text-on-surface-variant/50'}`}>
                  {step > idx + 1 ? <CheckCircle className="h-5 w-5" /> : idx + 1}
                </div>
                <span className="text-xs sm:text-sm font-bold">{label}</span>
              </div>
              {idx < 2 && (
                <div className={`h-0.5 flex-1 mx-2 rounded-full transition-all duration-500 ${step > idx + 1 ? 'bg-tertiary' : 'bg-surface-container'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="card-elevated p-6 md:p-8 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
        
        <div className="relative z-10">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">Pilih Meja yang Tersedia</h2>
              <p className="text-on-surface-variant text-sm mb-6">Meja dengan status hijau bisa langsung dipesan.</p>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                  <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
                  <p className="font-medium">Memuat data meja...</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tables.map(t => (
                    <TableCard key={t.id} table={t} selected={selectedTable?.id === t.id} onSelect={setTable} />
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">🎱</div>
                <div>
                  <h2 className="text-2xl font-bold text-on-surface">{selectedTable.name}</h2>
                  <p className="text-on-surface-variant text-sm">Pilih tanggal dan waktu bermain</p>
                </div>
              </div>
              <TimeSlotPicker 
                date={date} onDateChange={setDate}
                startTime={time} onTimeChange={setTime}
                duration={duration} onDurationChange={setDuration}
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">Pilih Paket Anda</h2>
              <p className="text-on-surface-variant text-sm mb-6">Paket hemat hanya muncul jika hari dan jam memenuhi kriteria.</p>
              <PackageSelector 
                date={date} startTime={time} duration={duration}
                selectedPackage={selectedPackage}
                onSelectPackage={(pkg) => setPackage(pkg, pkg.price)}
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-between items-center relative z-10">
          <button 
            onClick={() => setStep(Math.max(1, step - 1))}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
              step === 1 ? 'invisible' : 'bg-surface-container-low border border-outline-variant/10 text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </button>
          
          <button 
            onClick={handleNextStep}
            disabled={
              (step === 1 && !selectedTable) || 
              (step === 2 && (!date || !time)) || 
              (step === 3 && !selectedPackage)
            }
            className="btn-primary flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {step === 3 ? 'Lanjut Checkout' : 'Lanjut'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
