import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Trophy, Gift, ArrowRight, Shield, Headphones, MapPin, Phone, Clock, Mail } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== HERO SECTION (BERANDA) ===== */}
      <section id="beranda" className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-lowest to-surface-container opacity-80"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="badge-live w-fit">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Buka Setiap Hari</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-surface leading-[0.9]">
              Main Billiard<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
                Tanpa Ribet.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Pesan meja favoritmu secara online. Cek ketersediaan real-time, pilih paket terbaik, dan langsung main. Tanpa antri.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="btn-primary !px-10 !py-4 text-lg flex items-center gap-2">
                Masuk & Booking <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#tentang" className="btn-secondary !px-10 !py-4 text-lg">
                Pelajari Lebih
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/10 to-tertiary/10 border border-outline-variant/10 flex items-center justify-center animate-float">
                <div className="w-60 h-60 lg:w-72 lg:h-72 rounded-full bg-surface-container-high border border-outline-variant/10 flex items-center justify-center">
                  <span className="text-8xl lg:text-9xl">🎱</span>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-tertiary/20 backdrop-blur-sm flex items-center justify-center border border-tertiary/20 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-2xl">🏆</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-sm flex items-center justify-center border border-primary/20 animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TENTANG SECTION ===== */}
      <section id="tentang" className="py-20 lg:py-24 px-6 lg:px-8 max-w-screen-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">Tentang Kami</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Vibe Billiard adalah tempat bermain billiard premium yang mengutamakan kenyamanan dan pengalaman terbaik bagi setiap pelanggan.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: <Zap className="h-7 w-7" />, iconBg: 'bg-primary/10 text-primary', title: 'Booking Instan', desc: 'Skip antrian dengan sistem booking online. Amankan mejamu dalam hitungan detik lewat website.' },
            { icon: <Trophy className="h-7 w-7" />, iconBg: 'bg-tertiary/10 text-tertiary', title: 'Meja Premium', desc: 'Main di meja billiard kualitas terbaik. Perawatan rutin untuk pengalaman bermain yang sempurna.' },
            { icon: <Gift className="h-7 w-7" />, iconBg: 'bg-primary-container/10 text-primary-container', title: 'Paket Hemat', desc: 'Paket khusus untuk yang sering main. Harga spesial di hari kerja jam 08:00 - 17:00.' },
          ].map((item, idx) => (
            <div key={idx} className="group card-surface relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-8xl font-black text-on-surface">
                0{idx + 1}
              </div>
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paket Harga */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black tracking-tight text-on-surface mb-4">Pilihan Paket</h3>
          <p className="text-on-surface-variant">Opsi fleksibel untuk main santai maupun sesi latihan intensif.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Reguler */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative card-elevated p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-3xl font-bold text-on-surface mb-1">Reguler</h4>
                  <p className="text-on-surface-variant uppercase text-xs tracking-widest font-bold">Standar Terbaik</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-primary">Rp 35K</span>
                  <span className="text-on-surface-variant text-sm">/jam</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['Akses meja premium', 'Setiap hari tersedia', 'Durasi fleksibel'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface-variant"><span className="text-tertiary">✓</span>{t}</li>
                ))}
              </ul>
              <Link to="/login" className="block w-full py-3.5 rounded-xl font-bold text-center bg-surface-variant text-on-surface hover:bg-primary hover:text-on-primary transition-all">
                Login untuk Booking
              </Link>
            </div>
          </div>

          {/* Hemat */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-tertiary/30 to-primary/30 rounded-2xl blur opacity-100 transition duration-500"></div>
            <div className="relative bg-surface-container-highest p-8 rounded-2xl border border-primary/20">
              <div className="absolute top-0 right-0 bg-tertiary text-on-tertiary text-[10px] font-black tracking-widest uppercase px-4 py-1 rounded-bl-xl rounded-tr-2xl">Best Value</div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-3xl font-bold text-on-surface mb-1">Hemat</h4>
                  <p className="text-tertiary uppercase text-xs tracking-widest font-bold">Pilihan Pro</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-black text-tertiary">Rp 50K</span>
                  <span className="text-on-surface-variant text-sm">/2 jam</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {['2 Jam bermain hemat', 'Senin - Jumat', 'Jam 08:00 - 17:00', 'Hemat hingga 30%'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface"><span className="text-tertiary">✓</span>{t}</li>
                ))}
              </ul>
              <Link to="/login" className="btn-tertiary block w-full text-center !py-3.5">
                Login untuk Booking
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOKASI SECTION ===== */}
      <section id="lokasi" className="py-20 lg:py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">Lokasi Kami</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Temukan kami di lokasi strategis yang mudah dijangkau.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            {/* Map Placeholder */}
            <div className="card-elevated overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-surface-container flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-tertiary/5"></div>
                <div className="relative z-10 text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-on-surface font-bold text-lg">Vibe Billiard</p>
                  <p className="text-on-surface-variant text-sm mt-1">Jl. Sudirman No. 123</p>
                  <p className="text-on-surface-variant text-sm">Jakarta Selatan, 12190</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-block mt-4 text-primary text-sm font-bold hover:underline">
                    Buka di Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Info Kontak */}
            <div className="space-y-6">
              {[
                { icon: <MapPin className="h-6 w-6" />, label: 'Alamat', value: 'Jl. Jend. Sudirman No. 123, Gedung Vibe Lt. 2, Jakarta Selatan 12190' },
                { icon: <Clock className="h-6 w-6" />, label: 'Jam Operasional', value: 'Senin - Minggu: 08:00 - 23:00 WIB' },
                { icon: <Phone className="h-6 w-6" />, label: 'Telepon / WhatsApp', value: '+62 812-3456-7890' },
                { icon: <Mail className="h-6 w-6" />, label: 'Email', value: 'info@vibebilliard.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">{item.label}</p>
                    <p className="text-on-surface font-medium leading-relaxed">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-background border-t border-surface-container-high pt-16 pb-10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="text-2xl font-black tracking-tighter text-on-surface uppercase mb-4">Vibe Billiard</div>
              <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed">
                Destinasi utama para pecinta billiard. Kenyamanan premium dan pengalaman bermain terbaik.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-4 text-sm">Navigasi</h4>
              <ul className="space-y-3">
                {[{ label: 'Beranda', href: '#beranda' }, { label: 'Tentang', href: '#tentang' }, { label: 'Lokasi', href: '#lokasi' }].map(l => (
                  <li key={l.label}><a className="text-on-surface-variant hover:text-primary transition-colors text-sm" href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-4 text-sm">Akun</h4>
              <ul className="space-y-3">
                <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/login">Masuk</Link></li>
                <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" to="/register">Daftar</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-surface-container-high flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-on-surface-variant text-sm">© 2026 Vibe Billiard. All rights reserved.</p>
            <div className="flex gap-8">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield className="h-4 w-4" /> Secure
              </span>
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-2">
                <Headphones className="h-4 w-4" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
