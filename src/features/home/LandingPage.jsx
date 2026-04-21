import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Trophy, Gift, ArrowRight, Shield, Headphones, MapPin, Phone, Clock, Mail, ChevronDown, CheckCircle, Star } from 'lucide-react';
import ScrollReveal from '../../components/ui/ScrollReveal';

// Assumes the image is available at this path
import heroBilliard from '../../assets/hero-billiard.png';

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    { name: 'Andi S.', rating: 5, text: 'Tempat billiard paling nyaman yang pernah saya kunjungi. Meja sangat terawat dan AC dingin!' },
    { name: 'Rina Kartika', rating: 5, text: 'Sistem booking onlinenya sangat membantu, tidak perlu lagi datang jauh-jauh ternyata penuh.' },
    { name: 'Budi W.', rating: 4, text: 'Suasana asik buat nongkrong dan latihan. Paket Hemat benar-benar worth it!' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ===== HERO SECTION ===== */}
      <section id="beranda" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-lowest to-surface-container opacity-80"></div>
          {/* Subtle particle effect */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 lg:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 stagger-children">
            <div className="badge-live w-fit">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Buka 24 Jam</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-on-surface leading-[1.1]">
              Main Billiard<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-container">
                Tanpa Ribet.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed">
              Pesan meja favoritmu secara online. Cek ketersediaan real-time, pilih paket terbaik, dan langsung main. Tanpa antri.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/login" className="btn-primary !px-8 !py-4 text-base md:text-lg flex items-center gap-2">
                Masuk & Booking <ArrowRight className="h-5 w-5" />
              </Link>
              <a href="#tentang" className="btn-secondary !px-8 !py-4 text-base md:text-lg">
                Pelajari Lebih
              </a>
            </div>
          </div>

          <ScrollReveal direction="left" duration={0.8} delay={0.2} className="hidden md:flex justify-center items-center relative">
            <div className="relative w-full aspect-square max-w-lg">
              {/* Premium image */}
              <div className="absolute inset-0 rounded-full border border-outline-variant/20 bg-surface-container-high overflow-hidden shadow-[0_0_50px_rgba(173,198,255,0.15)] glow-shadow animate-float">
                <img src={heroBilliard} alt="Premium Billiard Hall" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
              </div>
              
              {/* Floating Stat Cards */}
              <div className="absolute top-10 -left-6 bg-surface-container-high/90 backdrop-blur-md p-4 rounded-2xl border border-outline/20 shadow-xl flex items-center gap-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary"><Zap className="w-6 h-6" /></div>
                <div>
                  <p className="text-xl font-black text-on-surface">500+</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Booking</p>
                </div>
              </div>

              <div className="absolute bottom-20 -right-6 bg-surface-container-high/90 backdrop-blur-md p-4 rounded-2xl border border-outline/20 shadow-xl flex items-center gap-4 animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="w-12 h-12 bg-tertiary/20 rounded-full flex items-center justify-center text-tertiary"><Star className="w-6 h-6 fill-tertiary" /></div>
                <div>
                  <p className="text-xl font-black text-on-surface">4.9</p>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Rating</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#statistik" className="text-on-surface-variant hover:text-primary transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section id="statistik" className="bg-surface-container border-y border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-outline-variant/10">
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-black text-primary mb-1">500+</p>
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Booking Berhasil</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-black text-on-surface mb-1">10</p>
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Meja Premium</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-black text-tertiary mb-1 flex justify-center items-center gap-1">
                4.9 <Star className="w-6 h-6 fill-tertiary" />
              </p>
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">User Rating</p>
            </div>
            <div className="text-center px-4">
              <p className="text-3xl md:text-4xl font-black text-on-surface mb-1">24/7</p>
              <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant">Jam Buka</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TENTANG SECTION ===== */}
      <section id="tentang" className="py-24 px-6 lg:px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">Kenapa Vibe Billiard?</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Lebih dari sekadar tempat main. Vibe menyajikan atmosfer high-end, meja yang terkalibrasi pro, dan sistem reservasi modern.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="h-7 w-7" />, color: 'primary', title: 'Booking Instan', desc: 'Skip antrian di kasir. Amankan mejamu kapanpun lewat smartphone-mu.' },
            { icon: <Trophy className="h-7 w-7" />, color: 'tertiary', title: 'Standar Pro', desc: 'Felt kualitas turnamen, cue balls premium, dan pencahayaan tanpa bayangan.' },
            { icon: <Gift className="h-7 w-7" />, color: 'primary-container', title: 'Harga Teman', desc: 'Dapatkan diskon paket Hemat saat pagi hingga sore, atau main reguler santai pas malam.' },
          ].map((item, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.15} direction="up" className="group card-surface relative overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-surface-container-high hover:border-outline/20">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity text-8xl font-black text-on-surface">
                0{idx + 1}
              </div>
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-${item.color}/10 text-${item.color} flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-on-surface mb-3">{item.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== HARGA SECTION ===== */}
      <section className="bg-surface-container py-24">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-12">
            <h3 className="text-3xl font-black tracking-tight text-on-surface mb-4">Paket Harga Spesial</h3>
            <p className="text-on-surface-variant max-w-xl mx-auto">Kami merancang opsi untuk semua gaya—baskara untuk bermain panjang atau eceran yang asyik.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Reguler */}
            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative card-elevated h-full flex flex-col p-8 transition-colors group-hover:bg-surface-container-high">
                  <div className="flex justify-between items-start mb-8 border-b border-outline-variant/10 pb-6">
                    <div>
                      <h4 className="text-3xl font-bold text-on-surface mb-1">Reguler</h4>
                      <p className="text-on-surface-variant uppercase text-xs tracking-widest font-bold">Standard Terbaik</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-black text-primary">35K</span>
                      <span className="text-on-surface-variant text-sm">/jam</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['Meja full size standard & VIP', 'Waktu bermain tidak terikat', 'Cocok untuk datang sewaktu-waktu'].map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-on-surface-variant">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className="btn-secondary w-full text-center">Login & Booking</Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Hemat */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="relative group h-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-tertiary/30 to-primary/30 rounded-2xl blur opacity-100 transition duration-500"></div>
                <div className="relative bg-surface-container-highest h-full flex flex-col p-8 rounded-2xl border border-tertiary/30">
                  <div className="absolute top-0 right-0 bg-tertiary shadow-[0_0_15px_rgba(74,225,118,0.5)] text-on-tertiary text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-bl-xl rounded-tr-xl">Best Value</div>
                  
                  <div className="flex justify-between items-start mb-8 border-b border-outline-variant/10 pb-6">
                    <div>
                      <h4 className="text-3xl font-bold text-on-surface mb-1">Hemat</h4>
                      <p className="text-tertiary uppercase text-xs tracking-widest font-bold">Pilihan Pro</p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-black text-tertiary">50K</span>
                      <span className="text-on-surface-variant text-sm">/2 jam</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {['2 Jam bermain sepuasnya', 'Hanya Senin - Jumat (08:00 - 17:00)', 'Hemat budget main lebih lama!'].map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-tertiary shrink-0" />
                        <span className="text-on-surface">{t}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/login" className="btn-primary glow-primary w-full text-center">Login & Booking</Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== TENTANG / TESTIMONIAL ===== */}
      <section className="py-24 max-w-screen-xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight text-on-surface mb-4">Kata Mereka</h2>
          <p className="text-on-surface-variant">Ribuan pemain telah mempercayakan Vibe Billiard untuk waktu luang mereka.</p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2} className="relative w-full max-w-3xl mx-auto min-h-[250px] flex items-center justify-center">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className={`absolute top-0 w-full transition-all duration-700 ease-in-out ${
                i === activeTestimonial 
                  ? 'opacity-100 translate-x-0 scale-100 z-10' 
                  : 'opacity-0 scale-95 z-0'
              } ${i < activeTestimonial ? '-translate-x-12' : 'translate-x-12'}`}
            >
              <div className="card-elevated p-8 md:p-12 text-center relative border border-outline-variant/10">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-primary/10 text-9xl font-serif">"</div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex gap-1 mb-6">
                    {Array.from({length: 5}).map((_, j) => (
                      <Star key={j} className={`w-5 h-5 ${j < t.rating ? 'fill-tertiary text-tertiary' : 'text-outline-variant/20'}`} />
                    ))}
                  </div>
                  <p className="text-xl md:text-2xl text-on-surface font-medium leading-relaxed italic mb-6">
                    "{t.text}"
                  </p>
                  <p className="font-bold text-on-surface-variant">— {t.name}</p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute -bottom-8 flex justify-center gap-2">
             {testimonials.map((_, i) => (
               <button 
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? 'w-8 bg-primary' : 'bg-outline-variant/30'}`}
               />
             ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ===== LOKASI SECTION ===== */}
      <section id="lokasi" className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <ScrollReveal direction="down" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-on-surface mb-4">Lokasi Kami</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Sangat mudah dijangkau dengan akses parkir luas.</p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
            {/* Embedded Google Maps */}
            <ScrollReveal direction="right" className="card-elevated overflow-hidden relative min-h-[400px]">
              <div className="absolute inset-0 bg-surface-container flex items-center justify-center animate-pulse">
                <span className="text-on-surface-variant text-sm">Memuat Peta...</span>
              </div>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126938.83401569766!2d106.72620703816694!3d-6.151743605338162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f8e853d2e38d%3A0x301576d14feb9e0!2sJakarta!5e0!3m2!1sen!2sid!4v1703058863641!5m2!1sen!2sid" 
                className="w-full h-full relative z-10 grayscale hover:grayscale-0 transition-all duration-700 opacity-80 mix-blend-luminosity" 
                title="Google Maps"
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </ScrollReveal>

            {/* Info Kontak */}
            <ScrollReveal direction="left" delay={0.2} className="space-y-8 self-center">
              {[
                { icon: <MapPin className="h-6 w-6" />, label: 'Alamat', value: 'Jl. Jend. Sudirman No. 123, Gedung Vibe Lt. 2, Jakarta Selatan' },
                { icon: <Clock className="h-6 w-6" />, label: 'Operasional', value: 'Buka 24 Jam - 7 Hari Seminggu' },
                { icon: <Phone className="h-6 w-6" />, label: 'CS & Booking Offline', value: '+62 812-3456-7890' },
                { icon: <Mail className="h-6 w-6" />, label: 'Email', value: 'hello@vibebilliard.com' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">{item.label}</p>
                    <p className="text-on-surface text-lg font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 overflow-hidden border-t border-outline-variant/10 bg-surface-container-high">
        <div className="absolute inset-0 z-0">
          <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[100px]"></div>
        </div>
        <ScrollReveal className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">Siap Untuk Main?</h2>
          <p className="text-xl text-on-surface-variant mb-10">Amankan jam bermainmu. Jangan biarkan teman nongkrongmu menunggu terlalu lama.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/register" className="btn-primary !px-10 !py-4 text-lg">Buat Akun Sekarang</Link>
             <Link to="/login" className="btn-secondary !px-10 !py-4 text-lg">Sudah Punya Akun?</Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-background pt-16 pb-10 border-t border-surface-container">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-xl">🎱</div>
                 <div className="text-3xl font-black tracking-tighter text-on-surface uppercase">Vibe Billiard</div>
              </div>
              <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed mb-6">
                Destinasi utama para gamers dan enthusiast. Kenyamanan premium dan inovasi reservasi online pertama di Indonesia.
              </p>
              <div className="flex gap-4">
                 <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary/20 flex items-center justify-center transition-colors">📷</a>
                 <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary/20 flex items-center justify-center transition-colors">🎵</a>
                 <a href="#" className="w-10 h-10 rounded-full bg-surface-container hover:bg-primary/20 flex items-center justify-center transition-colors">💬</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Navigasi Utama</h4>
              <ul className="space-y-4">
                {[{ label: 'Beranda', href: '#beranda' }, { label: 'Keunggulan Kami', href: '#tentang' }, { label: 'Lokasi', href: '#lokasi' }].map(l => (
                  <li key={l.label}><a className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-6 uppercase tracking-widest text-xs">Akses Anggota</h4>
              <ul className="space-y-4">
                <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" to="/login">Login Area</Link></li>
                <li><Link className="text-on-surface-variant hover:text-primary transition-colors text-sm font-medium" to="/register">Daftar Akun Baru</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-surface-container flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-on-surface-variant text-sm font-medium">© {new Date().getFullYear()} Vibe Billiard. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-2">
                <Shield className="h-4 w-4" /> Secure Data
              </span>
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest flex items-center gap-2">
                <Headphones className="h-4 w-4" /> CS Ready
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
