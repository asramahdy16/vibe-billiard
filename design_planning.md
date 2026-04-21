# 🎱 Vibe Billiard — Frontend Design Planning

> Dokumen rancangan redesign UI/UX untuk meningkatkan daya tarik visual, interaktivitas, dan pengalaman pengguna secara keseluruhan.

---

## 📊 Analisis Kondisi Saat Ini

### Tech Stack
| Komponen | Teknologi |
|----------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3.4 |
| State Management | Zustand 5 |
| Routing | React Router DOM 7 |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Notifikasi | React Hot Toast |
| Date Picker | React Datepicker |

### Struktur Halaman
| Halaman | Path | Kategori |
|---------|------|----------|
| Landing Page | `/` | Publik |
| Login | `/login` | Publik |
| Register | `/register` | Publik |
| User Dashboard | `/dashboard` | Customer |
| Booking Wizard | `/booking` | Customer |
| Checkout | `/booking/checkout` | Customer |
| Booking Success | `/booking/success` | Customer |
| Riwayat Booking | `/my-bookings` | Customer |
| Profil | `/profile` | Customer |
| Admin Dashboard | `/admin` | Admin |
| Manajemen Meja | `/admin/tables` | Admin |
| Manajemen Paket | `/admin/packages` | Admin |
| Kelola Booking | `/admin/bookings` | Admin |
| Transaksi | `/admin/transactions` | Admin |

### Komponen Reusable yang Ada
- `Navbar.jsx` — Navigasi landing page (glassmorphism, mobile hamburger)
- `Sidebar.jsx` — Sidebar admin (collapsible, gradient active)
- `UserLayout.jsx` — Layout customer (desktop sidebar + mobile bottom nav)
- `TableCard.jsx` — Kartu meja untuk booking wizard
- `TimeSlotPicker.jsx` — Grid jam + durasi bermain
- `PackageSelector.jsx` — Pemilihan paket (Reguler vs Hemat)

### Design System yang Ada  
- **Color Palette**: Material Design 3 dark theme (`#0b1326` background, `#adc6ff` primary, `#4ae176` tertiary)
- **Glassmorphism**: `.glass-panel`, `.glass-nav`
- **Glow Effects**: `.glow-primary`, `.glow-tertiary`, `.glow-shadow`
- **Gradient Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-tertiary`
- **Card Variants**: `.card-surface`, `.card-elevated`
- **Animasi**: `float` (6s), `glow-pulse` (3s)

---

## 🔍 Temuan Masalah & Kelemahan UI

### 1. Landing Page
| # | Masalah | Dampak |
|---|---------|--------|
| 1.1 | Hero section menggunakan emoji `🎱` sebagai visual utama — kurang profesional | Kesan pertama tidak premium |
| 1.2 | Tidak ada Navbar scroll-aware (transparan saat di atas, solid saat scroll) | Navbar terasa kaku |
| 1.3 | Tidak ada animasi masuk (fade-in / slide-up) pada elemen saat scroll | Halaman terasa statis |
| 1.4 | Section "Lokasi" menggunakan placeholder statis, bukan embedded Google Maps | Kurang interaktif |
| 1.5 | Tidak ada section Testimoni / Social Proof | Kurang meyakinkan |
| 1.6 | Tidak ada CTA (Call-to-Action) section sebelum footer | Peluang konversi hilang |
| 1.7 | Footer kurang lengkap (tidak ada social media links) | Kurang profesional |

### 2. Halaman Auth (Login & Register)
| # | Masalah | Dampak |
|---|---------|--------|
| 2.1 | Form card tidak punya animasi masuk | Transisi terasa mendadak |
| 2.2 | Tidak ada password strength indicator di Register | UX kurang informatif |
| 2.3 | Tidak ada animasi loading pada tombol submit | User tidak tahu proses berjalan |
| 2.4 | Validasi hanya dengan toast — tidak ada inline error per field | UX validasi kurang baik |

### 3. User Dashboard
| # | Masalah | Dampak |
|---|---------|--------|
| 3.1 | Greeting statis tanpa variasi waktu (pagi/siang/malam) | Kurang personal |
| 3.2 | Statistik card tidak ada chart/progress visual | Data kurang intuitif |
| 3.3 | Active booking card bisa lebih visual (countdown timer, progress bar) | Kurang engaging |
| 3.4 | Quick actions layout monoton | Kurang menarik |

### 4. Booking Wizard
| # | Masalah | Dampak |
|---|---------|--------|
| 4.1 | TableCard menggunakan emoji `🎱` untuk semua meja — tidak unik | Sulit membedakan meja |
| 4.2 | Tidak ada transisi animasi antar step | Perpindahan step terasa kasar |
| 4.3 | TimeSlotPicker tidak menandai slot yang sudah terisi | User tidak tahu ketersediaan |
| 4.4 | DatePicker default styling tidak match dark theme | Inkonsistensi visual |
| 4.5 | Tidak ada floating order summary saat scroll | User lupa pilihan sebelumnya |

### 5. Checkout & Success
| # | Masalah | Dampak |
|---|---------|--------|
| 5.1 | Barcode pada success page menggunakan random width — bukan barcode nyata | Terasa fake |
| 5.2 | Tidak ada opsi share/download tiket | Fitur yang diharapkan user |
| 5.3 | Konfirmasi checkout tanpa modal dialog | Risiko klik tidak sengaja |

### 6. Admin Panel
| # | Masalah | Dampak |
|---|---------|--------|
| 6.1 | Admin sidebar tidak responsive (fixed 64px offset) — rusak saat collapsed | Bug layout |
| 6.2 | Tidak ada admin mobile layout/navigation | Admin tidak bisa akses via HP |
| 6.3 | Tabel data tidak ada pagination | Performa buruk jika data banyak |
| 6.4 | Tidak ada chart/grafik di admin dashboard | Data insight kurang |
| 6.5 | Modal animasi `animate-in` tidak terdefinisi di CSS | Animasi tidak berjalan |
| 6.6 | Konfirmasi action (delete) masih menggunakan `window.confirm` | Tidak sesuai tema UI |

### 7. Global / Cross-cutting
| # | Masalah | Dampak |
|---|---------|--------|
| 7.1 | Tidak ada loading skeleton (hanya spinner) | Terasa lambat |
| 7.2 | Tidak ada halaman 404 custom | Pengalaman error buruk |
| 7.3 | Tidak ada page transition animation | Navigasi terasa kaku |
| 7.4 | `App.css` berisi sisa template Vite yang tidak dipakai | Dead code |
| 7.5 | Tidak ada favicon custom (masih SVG default) | Kurang branded |
| 7.6 | Tidak ada scroll-to-top saat navigasi halaman baru | UX navigasi kurang |
| 7.7 | Empty state hanya teks — tidak ada ilustrasi | Kurang menarik |

---

## 🎨 Rancangan Perbaikan (Design Plan)

### Fase 1: Foundation & Global Enhancement

#### 1A. Komponen Utilitas Baru

##### `ScrollReveal` Component
Komponen wrapper untuk animasi elemen saat masuk viewport menggunakan `IntersectionObserver`.
```
Props:
- delay: number (ms)
- direction: 'up' | 'down' | 'left' | 'right'
- duration: number (ms)
```

##### `Skeleton` Component
Loading skeleton untuk menggantikan spinner.
```
Variants:
- SkeletonCard: kartu loading dengan shimmer
- SkeletonTable: baris tabel loading
- SkeletonText: baris teks loading
- SkeletonAvatar: avatar bulat loading
```

##### `ConfirmDialog` Component
Pengganti `window.confirm()` dengan modal dialog bertemakan dark glassmorphism.
```
Props:
- isOpen: boolean
- title: string
- message: string
- variant: 'danger' | 'warning' | 'info'
- onConfirm: function
- onCancel: function
```

##### `EmptyState` Component
Ilustrasi + teks untuk kondisi data kosong.
```
Props:
- icon: ReactNode (dari Lucide)
- title: string
- description: string
- actionLabel: string
- actionTo: string (link)
```

##### `Badge` Component
Komponen badge status yang reusable (menggantikan duplikasi inline di banyak halaman).
```
Props:
- status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
- size: 'sm' | 'md'
```

##### `Tooltip` Component
Tooltip ringan untuk icon buttons dan elemen kecil.

#### 1B. Animasi & Transisi Baru di `index.css`

```css
/* ===== ANIMASI BARU ===== */

/* Slide-up reveal */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Slide-in modal */
@keyframes slide-in-bottom {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* Shimmer skeleton */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Scale bounce */
@keyframes scale-bounce {
  0%   { transform: scale(0); }
  60%  { transform: scale(1.1); }
  100% { transform: scale(1); }
}

/* Count-up number effect */
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Stagger children animation */
.stagger-children > * {
  animation: slide-up 0.5s ease-out both;
}
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 80ms; }
.stagger-children > *:nth-child(3) { animation-delay: 160ms; }
/* ... dst */
```

#### 1C. Global Fixes
- Hapus seluruh isi `App.css` (dead code template Vite)
- Tambahkan scroll-to-top otomatis pada navigasi
- Tambahkan custom 404 page
- Fix DatePicker styling agar match dark theme
- Generate favicon/logo custom

---

### Fase 2: Landing Page Redesign

#### Layout Baru Landing Page

```
┌──────────────────────────────────────────────────────┐
│ NAVBAR (glass, scroll-aware: transparan → solid)     │
│  Logo    Beranda  Tentang  Fasilitas  Lokasi  [CTA]  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  HERO SECTION                                        │
│  ┌────────────────────┐  ┌──────────────────────┐    │
│  │ Badge: Buka 24 Jam │  │                      │    │
│  │                    │  │   Hero Image/Visual   │    │
│  │ Main Billiard      │  │   (Generated image    │    │
│  │ Tanpa Ribet.       │  │    billiard premium)  │    │
│  │                    │  │                      │    │
│  │ [Booking →]        │  │   + Floating stats    │    │
│  │ [Pelajari Lebih]   │  │   "500+ Booking"      │    │
│  └────────────────────┘  │   "4.9★ Rating"       │    │
│                          └──────────────────────┘    │
│                                                      │
│  Scroll indicator arrow ↓                            │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  STATS COUNTER BAR (marquee / ticker)                │
│  ┌─────────┬─────────┬─────────┬──────────┐         │
│  │ 500+    │ 10      │ 4.9★    │ 08-23    │         │
│  │ Booking │ Meja    │ Rating  │ Jam Buka │         │
│  └─────────┴─────────┴─────────┴──────────┘         │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  TENTANG SECTION (scroll-reveal)                     │
│  - 3 value proposition cards (existing, enhanced)    │
│  - Tambahkan hover 3D tilt effect                    │
│  - Tambahkan ilustrasi/icon animated                 │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  FASILITAS SECTION (BARU)                            │
│  - Carousel/slider gambar venue                      │
│  - Grid foto fasilitas (meja, kursi, lighting, bar)  │
│  - Hover zoom effect pada gambar                     │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  PAKET HARGA SECTION (enhanced)                      │
│  ┌──────────────┐    ┌──────────────────────┐       │
│  │   REGULER    │    │ ★ HEMAT / BEST VALUE │       │
│  │   Rp 35K/jam │    │   Rp 50K/2 jam       │       │
│  │              │    │                      │       │
│  │  ✓ Feature   │    │  ✓ Feature           │       │
│  │  ✓ Feature   │    │  ✓ Feature           │       │
│  │              │    │  ✓ Feature           │       │
│  │  [Pilih →]   │    │  [Pilih Hemat →]     │       │
│  └──────────────┘    └──────────────────────┘       │
│  Tambah: toggle monthly/hourly, badge savings %      │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  TESTIMONI / SOCIAL PROOF SECTION (BARU)             │
│  ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │ "Meja  │ │ "Tempt │ │ "Sist  │                   │
│  │  nya   │ │  nya   │ │  em    │                   │
│  │  bagus"│ │  enak" │ │  book  │                   │
│  │ ★★★★★ │ │ ★★★★☆ │ │  ing   │                   │
│  │ - Andi │ │ - Sari │ │  mudah"│                   │
│  └────────┘ └────────┘ │ ★★★★★ │                   │
│                        │ - Rina │                   │
│                        └────────┘                   │
│  Auto-sliding carousel dengan fade transition        │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  LOKASI SECTION (enhanced)                           │
│  - Embedded Google Maps iframe (bukan placeholder)   │
│  - Kontak info cards (existing, enhanced animation)  │
│  - WhatsApp direct link button                       │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  CTA SECTION (BARU) — Sebelum Footer                 │
│  ┌──────────────────────────────────────────────┐    │
│  │  "Siap Main? Booking Mejamu Sekarang!"       │    │
│  │  [Masuk & Booking Sekarang →]                │    │
│  │  Background: gradient + floating particles   │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  FOOTER (enhanced)                                   │
│  - Social media icons (Instagram, TikTok, WA)        │
│  - Quick links column                                │
│  - Newsletter signup (optional)                      │
│  - Back to top button                                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

#### Detail Perbaikan Hero
- Ganti emoji `🎱` dengan **generated image** arena billiard premium
- Tambahkan **floating stat cards** (500+ Booking, 10 Meja, 4.9★ Rating)
- Animasi **staggered fade-in** pada heading → subtitle → buttons
- **Scroll indicator** (animated chevron down)
- **Particle/bokeh effect** subtle di background

#### Navbar Enhancement
```
Behavior:
- Di posisi top (scrollY = 0): background transparan
- Saat scroll > 80px: glass-nav dengan shadow
- Active section indicator (dot/underline)
- Smooth transition 300ms
```

---

### Fase 3: Auth Pages Enhancement

#### Login Page
```
┌─────────────────────────────────────────┐
│          Background Animated            │
│      (subtle gradient orb movement)     │
│                                         │
│    ┌─────────────────────────┐          │
│    │ ── gradient top bar ──  │          │
│    │                         │  ← Slide-in
│    │    🔐  (animated icon)  │    animation
│    │    Masuk                │          │
│    │    Welcome back         │          │
│    │                         │          │
│    │  EMAIL                  │          │
│    │  ┌───────────────────┐  │          │
│    │  │ email@contoh.com  │  │          │
│    │  └───────────────────┘  │          │
│    │                         │          │
│    │  PASSWORD               │          │
│    │  ┌────────────────[👁]┐  │          │
│    │  │ ••••••••          │  │          │
│    │  └───────────────────┘  │          │
│    │                         │          │
│    │  ☐ Ingat saya   Lupa?  │ ← BARU   │
│    │                         │          │
│    │  ┌───────────────────┐  │          │
│    │  │    MASUK    ██▓░░ │  │ ← Loading│
│    │  └───────────────────┘  │   bar    │
│    │                         │          │
│    │  Belum punya akun?      │          │
│    │  Daftar sekarang        │          │
│    └─────────────────────────┘          │
│                                         │
└─────────────────────────────────────────┘
```

**Perbaikan:**
- Animasi card slide-in dari bawah saat pertama load
- Input focus animation (border glow + label float)
- Loading button animation (shimmer progress bar)
- Inline field validation (border merah + helper text)
- Background orb animation yang bergerak perlahan 

#### Register Page
**Perbaikan tambahan:**
- Password strength meter (bar 4 level + label)
- Step indicator opsional untuk form panjang (info → security)  
- Input success state (centang hijau saat valid)

---

### Fase 4: Customer Dashboard Enhancement

#### Layout Dashboard Baru

```
┌──────────────────────────────────────────────────┐
│ SIDEBAR                                          │
├──────────────────────────────────────────────────┤
│                                                  │
│  🌙 Selamat Malam, Ahmad! 👋                    │ ← Time-aware
│  Siap bermain hari ini?                          │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │  BOOKING AKTIF (enhanced)                │    │
│  │  ┌─────────────────────────────────┐     │    │
│  │  │ ⏱️ Bermain dalam 02:30:45       │     │ ← COUNTDOWN
│  │  │ ██████████████░░░░ 65% waktu    │     │ ← PROGRESS
│  │  │                                 │     │    │
│  │  │ Meja VIP 01  ·  Reguler        │     │    │
│  │  │ 📅 21 Apr 2026  · 14:00-16:00  │     │    │
│  │  │ Rp 70.000                       │     │    │
│  │  │                                 │     │    │
│  │  │ [📋 Detail] [📞 Hubungi]        │     │    │
│  │  └─────────────────────────────────┘     │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌─────────┬─────────┬─────────┐                │
│  │🎯 Total │⏱ Total  │💰 Total │                │
│  │ Booking │ Jam     │ Bayar   │                │
│  │   12    │ 24 Jam  │ 840K    │                │
│  │  ▲ 2↑   │         │         │ ← Trend arrow  │
│  └─────────┴─────────┴─────────┘                │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ AKTIVITAS TERAKHIR                       │    │
│  │                                          │    │
│  │ 🎱 Meja 03 · 20 Apr · Rp 35K  [Selesai] │    │
│  │ 🎱 Meja VIP · 18 Apr · Rp 70K [Batal]   │    │
│  │ 🎱 Meja 01 · 15 Apr · Rp 50K  [Selesai] │    │
│  │                                          │    │
│  │             [Lihat Semua →]              │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │ QUICK ACTIONS (redesigned as icon grid)  │    │
│  │                                          │    │
│  │  ┌────┐  ┌────┐  ┌────┐  ┌────┐        │    │
│  │  │📅  │  │📋  │  │👤  │  │📞  │        │    │
│  │  │Book│  │Riwa│  │Prof│  │Help│        │    │
│  │  │ing │  │yat │  │il  │  │    │        │    │
│  │  └────┘  └────┘  └────┘  └────┘        │    │
│  └──────────────────────────────────────────┘    │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Perbaikan Detail:**
1. **Time-aware greeting**: 
   - 05:00-11:59 → "Selamat Pagi ☀️"
   - 12:00-14:59 → "Selamat Siang 🌤"
   - 15:00-17:59 → "Selamat Sore 🌅"
   - 18:00-04:59 → "Selamat Malam 🌙"

2. **Active Booking Card Enhanced**:
   - Countdown timer real-time (menghitung mundur ke waktu mulai)
   - Progress bar (jika sedang bermain, progress durasi)
   - Pulse animation pada status badge
   - Quick actions (detail, hubungi CS)

3. **Stats Cards Enhanced**:
   - Animated number counter (count-up saat muncul)
   - Mini sparkline chart opsional
   - Trend indicator (naik/turun dari bulan lalu)

4. **Riwayat Terakhir Enhanced**:
   - Status badge warna-warni
   - Hover effect slide-right subtle
   - Relative time ("2 hari lalu")

---

### Fase 5: Booking Wizard Enhancement

#### Step 1: Pilih Meja (Enhanced)

```
┌──────────────────────────────────────────────────┐
│ STEPPER BAR (enhanced with pulse on active)      │
│  [1•]────────[2 ]────────[3 ]                    │
│  Meja        Waktu       Paket                   │
├──────────────────────────────────────────────────┤
│                                                  │
│  Filter: [Semua ▾] [Tersedia ✓] [VIP]           │ ← BARU
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │          │  │ SELECTED │  │ ░░░░░░░░ │      │
│  │  🎱      │  │ ✓ 🎱    │  │  🎱      │      │
│  │  Meja 01 │  │  Meja 02 │  │  Meja 03 │      │
│  │          │  │          │  │ [DIPAKAI]│      │
│  │ 🟢 Ready │  │ 🔵 Dipil │  │ 🔴 Busy  │      │
│  │ Standard │  │ Standard │  │ Standard │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  👑      │  │  👑      │  │          │      │
│  │  VIP 01  │  │  VIP 02  │  │  Meja 04 │      │
│  │          │  │ ░░░░░░░░ │  │          │      │
│  │ 🟢 Ready │  │ 🟡 Book  │  │ 🟢 Ready │      │
│  │ Premium  │  │ Premium  │  │ Standard │      │
│  └──────────┘  └──────────┘  └──────────┘      │
│                                                  │
│ Info bar: "Meja VIP dilengkapi AC & sofa khusus" │ ← BARU
│                                                  │
│            [← Kembali]        [Lanjut →]         │
└──────────────────────────────────────────────────┘
```

**Perbaikan:**
- Tambah **filter tabs** (Semua / Tersedia / VIP)
- Ganti emoji dengan **numbered icon** yang unik per meja  
- VIP meja badge dengan crown icon `👑`
- **Info tooltip** tentang fasilitas meja
- **Smooth card selection animation** (scale + ring glow)
- Meja tidak tersedia: overlay blur dengan status text

#### Step 2: Pilih Waktu (Enhanced)

**Perbaikan:**
- DatePicker custom styling match dark theme
- Time slots menunjukkan **status tersedia/terisi** per slot
- Slot terisi: warna merah, label "Terisi"  
- Slot tersedia: warna default, hover glow
- Duration slider sebagai alternatif tombol grid
- **Summary preview**: "Kamu akan bermain 14:00 - 16:00 (2 jam)"

#### Step 3: Pilih Paket (Enhanced)

**Perbaikan:**
- **Animated savings badge**: "Hemat Rp 20.000!" dengan bounce animation
- Comparison table view opsional
- **Recommendation badge**: "Direkomendasikan untuk kamu" berdasarkan durasi

#### Step Transition
- Tambahkan **slide animation** antar step (left/right)
- Floating **order summary bar** di bawah (mobile) atau samping (desktop)

---

### Fase 6: Checkout & Success Enhancement

#### Checkout Page
```
┌──────────────────────────────────────────────────┐
│  ← Kembali ke Booking                           │
│                                                  │
│  Checkout                                        │
│                                                  │
│  ┌──────────────────┐  ┌──────────────────────┐ │
│  │ RINGKASAN PESANAN│  │ METODE PEMBAYARAN    │ │
│  │ ── gradient ──   │  │                      │ │
│  │                  │  │ ◉ Cash di Kasir      │ │
│  │ Meja: Meja 02   │  │ ○ Transfer Bank      │ │
│  │ Tgl: 21 Apr 2026│  │   → Tampilkan info   │ │
│  │ Jam: 14:00-16:00│  │     rekening + copy  │ │
│  │ Paket: Reguler  │  │ ○ E-Wallet           │ │
│  │                  │  │   → QR code preview  │ │
│  │ ───────────────  │  │                      │ │
│  │ Total: Rp 70.000│  │                      │ │
│  │                  │  │ KODE PROMO (BARU)    │ │
│  │ Countdown: 14:58│  │ ┌──────────┐[Apply]  │ │
│  │ (batas konfirm) │  │ │          │         │ │
│  └──────────────────┘  │ └──────────┘         │ │
│                        │                      │ │
│                        │ ┌──────────────────┐ │ │
│                        │ │ KONFIRMASI BOOKING│ │ │
│                        │ │ (with modal)      │ │ │
│                        │ └──────────────────┘ │ │
│                        └──────────────────────┘ │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Perbaikan:**
- **Confirmation modal** sebelum submit (bukan langsung)
- Payment method detail info (nomor rekening, QR code placeholder)
- **Countdown timer** batas konfirmasi (opsional, 15 menit)
- Field kode promo (placeholder untuk fitur masa depan)
- Animasi loading yang lebih informatif (step progress: Membuat booking → Memproses pembayaran → Selesai)

#### Booking Success Page
**Perbaikan:**
- **Confetti animation** saat halaman pertama load
- Tiket digital lebih premium (gradient border, shadow)
- **Download tiket** sebagai gambar (html2canvas)
- **Share button** (WhatsApp, copy link)
- QR Code nyata sebagai pengganti barcode random (gunakan booking ID)

---

### Fase 7: Admin Panel Enhancement

#### Admin Sidebar
**Perbaikan:**
- Responsive sidebar: collapse ke icon-only di tablet, hidden drawer di mobile
- Fix `ml-64` issue saat sidebar collapsed
- Active item: subtle left border indicator + background glow
- User avatar/info di bawah sidebar

#### Admin Dashboard
```
┌──────────────────────────────────────────────────┐
│ SIDEBAR │                                        │
│         │  Dashboard                              │
│  [D]    │  Overview bisnis hari ini.              │
│  [M]    │                                        │
│  [P]    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │
│  [B]    │  │💰    │ │📅    │ │🎱    │ │⏳    │ │
│  [T]    │  │ Rev  │ │ Book │ │ Meja │ │ Pend │ │
│  │      │  │ 350K │ │  5   │ │  3   │ │  2   │ │
│  │      │  │ +12% │ │ +2↑  │ │      │ │      │ │
│  │      │  └──────┘ └──────┘ └──────┘ └──────┘ │
│  │      │                                        │
│  │      │  ┌───────────────────────────────────┐ │
│  │      │  │ REVENUE CHART (BARU)              │ │
│  │      │  │ Bar/Line chart 7 hari terakhir    │ │
│  │      │  │ ▁ ▃ ▅ ▇ █ ▆ ▃                    │ │
│  │      │  └───────────────────────────────────┘ │
│  │      │                                        │
│  │      │  ┌───────────────────────────────────┐ │
│  │      │  │ BOOKING TERBARU (table, existing) │ │
│  │      │  │ + hover actions                   │ │
│  │      │  │ + animated row entrance           │ │
│  │      │  └───────────────────────────────────┘ │
│  │      │                                        │
│  [OUT]  │                                        │
│         │                                        │
└──────────────────────────────────────────────────┘
```

**Perbaikan:**
- **Revenue chart** (bar chart 7 hari terakhir — bisa pakai CSS-only bars atau library ringan)
- Stats card dengan **trend indicator** (+12%, ▲ 2)
- Animated number counter
- **Quick action buttons** pada tabel booking (konfirmasi, detail)
- **Real-time badge** notifikasi pada sidebar item (jumlah pending)

#### Admin Data Tables (ManageBookings, Transactions)
**Perbaikan:**
- **Pagination** component (< 1 2 3 ... 10 >)
- **Sortable columns** (klik header untuk sort)
- **Bulk actions** checkbox (select all → change status)
- Row hover actions visible
- Empty search state dengan ilustrasi
- **Export to CSV** button (opsional)

#### Admin Manage Tables
**Perbaikan:**
- **Real-time status indicator** (pulse dot)
- Card layout dengan **drag & drop reorder** (opsional) 
- Visual meja layout/floorplan view (opsional, nice-to-have)

---

### Fase 8: Responsive & Mobile Enhancement

#### Mobile Bottom Navigation (Customer — sudah ada, enhancement)
```
┌──────────────────────────────┐
│  [🏠]  [📅]  [⏳]  [👤]     │
│  Home  Book  Riwa  Profil    │
│                              │
│  Active: filled icon + label │
│  + small dot indicator       │
│  + haptic-like press effect  │
└──────────────────────────────┘
```

#### Admin Mobile Navigation (BARU)
- Hamburger menu drawer dari kiri
- Bottom sheet untuk quick actions
- Responsive tables → card view di mobile

#### Responsive Breakpoints
```
Mobile:  < 640px  → Bottom nav, single column, kompak
Tablet:  640-1024px → Collapsed sidebar, 2 kolom
Desktop: > 1024px → Full sidebar, multi kolom
```

---

## 📁 Komponen Baru yang Dibutuhkan

| Komponen | File Path | Deskripsi |
|----------|-----------|-----------|
| `ScrollReveal` | `src/components/ui/ScrollReveal.jsx` | Animasi masuk saat scroll |
| `Skeleton` | `src/components/ui/Skeleton.jsx` | Loading skeleton shimmer |
| `ConfirmDialog` | `src/components/ui/ConfirmDialog.jsx` | Dialog konfirmasi custom |
| `EmptyState` | `src/components/ui/EmptyState.jsx` | Ilustrasi data kosong |
| `Badge` | `src/components/ui/Badge.jsx` | Status badge reusable |
| `Tooltip` | `src/components/ui/Tooltip.jsx` | Tooltip ringan |
| `Pagination` | `src/components/ui/Pagination.jsx` | Navigasi halaman tabel |
| `CountdownTimer` | `src/components/ui/CountdownTimer.jsx` | Hitung mundur real-time |
| `AnimatedCounter` | `src/components/ui/AnimatedCounter.jsx` | Number count-up animasi |
| `ConfettiEffect` | `src/components/ui/ConfettiEffect.jsx` | Efek konfeti sukses |
| `StatsChart` | `src/components/admin/StatsChart.jsx` | Chart bar CSS-only |
| `NotFoundPage` | `src/features/error/NotFoundPage.jsx` | Halaman 404 custom |
| `ScrollToTop` | `src/components/layout/ScrollToTop.jsx` | Reset scroll posisi |

---

## 🗂 File yang Perlu Dimodifikasi

| File | Perubahan |
|------|-----------|
| `index.css` | Tambah animasi baru, skeleton styles, DatePicker dark override |
| `App.css` | **HAPUS** seluruh isi (dead code) |
| `App.jsx` | Tambah ScrollToTop component |
| `AppRoutes.jsx` | Tambah route 404, lazy loading |
| `Navbar.jsx` | Scroll-aware behavior, active section indicator |
| `Sidebar.jsx` | Fix responsive behavior, badge notifikasi |
| `UserLayout.jsx` | Enhanced mobile bottom nav, fix content offset |
| `LandingPage.jsx` | Full redesign: section baru, scroll reveal, generated images |
| `LoginPage.jsx` | Animasi masuk, inline validation, loading animation |
| `RegisterPage.jsx` | Password strength, animasi, validation |
| `UserDashboard.jsx` | Time-aware greeting, countdown, animated stats |
| `BookingPage.jsx` | Filter meja, step transition, floating summary |
| `TableCard.jsx` | Numbered icons, VIP badge, blur overlay |
| `TimeSlotPicker.jsx` | Dark DatePicker, slot availability status |
| `PackageSelector.jsx` | Savings badge, recommendation |
| `CheckoutPage.jsx` | Confirm modal, payment detail, promo code |
| `BookingSuccessPage.jsx` | Confetti, download tiket, share |
| `MyBookingsPage.jsx` | Pagination, relative time, empty state |
| `ProfilePage.jsx` | Avatar upload area (UI only), card animation |
| `DashboardPage.jsx` (admin) | Chart, trend indicators, animated counters |
| `ManageBookingsPage.jsx` | Pagination, sortable, bulk actions |
| `ManageTablesPage.jsx` | Real-time status dot, enhanced cards |
| `ManagePackagesPage.jsx` | Minor polish |
| `TransactionsPage.jsx` | Pagination, enhanced empty state |

---

## 🎯 Prioritas Implementasi

### 🔴 Prioritas Tinggi (Dampak Besar, Effort Rendah-Sedang)
1. **Global**: ScrollReveal, Skeleton, ScrollToTop, hapus App.css dead code
2. **Landing Page**: Hero image, scroll-aware navbar, animasi scroll reveal
3. **Auth Pages**: Animasi masuk, inline validation, loading button
4. **Booking Wizard**: Step transition animation, DatePicker dark fix
5. **Admin**: Fix sidebar responsive issue

### 🟡 Prioritas Sedang (Dampak Sedang, Effort Sedang)
6. **Landing**: Section Testimoni, CTA section, enhanced footer
7. **Dashboard**: Time-aware greeting, animated counters
8. **Booking**: Filter meja, slot availability indicator
9. **Admin Dashboard**: Stats chart, trend indicators
10. **Global**: ConfirmDialog mengganti `window.confirm`, EmptyState component, 404 page

### 🟢 Prioritas Rendah (Nice-to-have, Effort Tinggi)
11. **Success Page**: Confetti, download tiket, share
12. **Admin Tables**: Pagination, sort, bulk action
13. **Dashboard**: Countdown timer active booking
14. **Checkout**: Payment detail (rekening, QR), promo code field
15. **Landing**: Fasilitas gallery slider

---

## 📐 Design Tokens Update

### Spacing Scale
```
4px  — micro gaps  
8px  — component internal  
12px — compact padding  
16px — standard gap  
24px — section internal  
32px — card padding  
48px — section gap mobile  
64px — section gap tablet
80px — section gap desktop
```

### Shadow Tokens
```css
--shadow-sm:  0 2px 8px rgba(0, 0, 0, 0.15);
--shadow-md:  0 8px 24px rgba(0, 0, 0, 0.2);
--shadow-lg:  0 16px 48px rgba(0, 0, 0, 0.25);
--shadow-glow-primary: 0 0 30px rgba(173, 198, 255, 0.2);
--shadow-glow-tertiary: 0 0 30px rgba(74, 225, 118, 0.15);
```

### Border Radius Tokens
```
sm:   8px  — buttons, badges
md:   12px — inputs, small cards
lg:   16px — cards, modals
xl:   20px — large cards
2xl:  24px — hero sections
full: 9999px — pills, avatars
```

### Transition Tokens
```
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

---

## ✅ Acceptance Criteria

Setiap perubahan dianggap selesai jika:
1. ✅ Responsif di 3 breakpoint (mobile/tablet/desktop)
2. ✅ Animasi berjalan smooth (60fps, no layout shift)
3. ✅ Dark theme konsisten (tidak ada warna light yang bocor)
4. ✅ Semua interactive elements memiliki hover/active/focus state
5. ✅ Loading state ditampilkan dengan skeleton, bukan hanya spinner  
6. ✅ Empty state memiliki ilustrasi dan CTA
7. ✅ Tidak ada dead code atau unused CSS
8. ✅ Build production berhasil tanpa error
