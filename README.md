<h1 align="center">
  <img src="public/logo.png" alt="EbKost Logo" width="160" /><br/>
  EbKost — Platform Booking Kamar Kost Online
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img src="https://img.shields.io/badge/Prisma-5.22-2D3748?logo=prisma" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss" />
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql" />
  <img src="https://img.shields.io/badge/Midtrans-Payment-blue" />
</p>

<p align="center">
  Sistem informasi pemesanan kamar kost berbasis web dengan fitur pembayaran online terintegrasi Midtrans, manajemen reservasi, dan panel admin lengkap.
</p>

---

## 📋 Daftar Isi

- [Tentang Project](#-tentang-project)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Skema Database](#-skema-database)
- [Cara Menjalankan](#-cara-menjalankan-lokal)
- [Environment Variables](#-environment-variables)
- [Alur Sistem](#-alur-sistem)
- [Role & Hak Akses](#-role--hak-akses)
- [API & Server Actions](#-api--server-actions)
- [Deploy ke Vercel](#-deploy-ke-vercel)
- [Catatan Pengembang](#-catatan-pengembang)

---

## 📌 Tentang Project

**EbKost** adalah aplikasi web untuk mempermudah proses booking kamar kost secara online. Project ini dikembangkan sebagai sistem informasi yang menggabungkan manajemen properti kost dengan payment gateway sehingga seluruh proses dari pencarian kamar hingga pembayaran dapat dilakukan dalam satu platform.

Project dibangun menggunakan **Next.js 16 App Router** dengan arsitektur Server Components, Server Actions, dan Prisma ORM sebagai interface ke database PostgreSQL (Neon).

---

## ✨ Fitur Utama

### 👤 Sisi User (Penyewa)
- 🔍 **Browsing Kamar** — Lihat daftar kamar dengan filter & sort harga
- 📄 **Detail Kamar** — Info lengkap fasilitas, harga, kapasitas
- 📅 **Booking Online** — Formulir pemesanan terintegrasi langsung
- 💳 **Pembayaran Midtrans** — Snap popup payment (transfer, QRIS, e-wallet, dll)
- 🧾 **Invoice Digital** — Cetak/download PDF resi pembayaran
- 📋 **Riwayat Pesanan** — Pantau status reservasi secara real-time
- 🔐 **Login Google** — Autentikasi via Google OAuth (NextAuth v5)

### 🛠️ Sisi Admin
- 📊 **Dashboard** — Statistik reservasi, pendapatan, dan pengguna
- 🏠 **Manajemen Kamar** — CRUD kamar + upload foto
- 🔄 **Toggle Ketersediaan** — Tandai kamar sebagai **Tersedia** / **Sold Out**
- 📋 **Manajemen Reservasi** — Update status booking (Approve, Sukses, Batal, dll)
- 👥 **Manajemen Pengguna** — Kelola daftar akun terdaftar

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js 16.1.6 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | Tailwind CSS v4 + React Icons |
| **Auth** | NextAuth v5 (Beta) + Google OAuth |
| **ORM** | Prisma 5.22 |
| **Database** | PostgreSQL via Neon (serverless) |
| **Payment** | Midtrans Snap (Sandbox & Production) |
| **Font** | Plus Jakarta Sans (Google Fonts) |
| **Chart** | Recharts |
| **Deployment** | Vercel (recommended) |

---

## 📁 Struktur Project

```
ebkost/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Route group halaman publik (dengan Navbar)
│   │   ├── page.tsx              # Halaman utama (Hero + Kamar + About + Contact)
│   │   ├── about/                # Halaman Tentang Kami
│   │   ├── contact/              # Halaman Hubungi Kami
│   │   ├── rooms/[id]/           # Detail kamar + form booking
│   │   ├── checkout/[id]/        # Halaman checkout pembayaran
│   │   └── my-reservation/       # Riwayat pesanan user
│   │       └── [id]/invoice/     # Halaman invoice (untuk print)
│   ├── admin/                    # Route group admin (wajib login ADMIN)
│   │   ├── dashboard/            # Dashboard statistik
│   │   ├── room/                 # CRUD manajemen kamar
│   │   │   ├── create/           # Form tambah kamar
│   │   │   └── [id]/edit/        # Form edit kamar
│   │   ├── reservations/         # Daftar & kelola reservasi
│   │   └── users/                # Daftar pengguna
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth handler
│   │   └── midtrans/             # Webhook notifikasi Midtrans
│   ├── signin/                   # Halaman login
│   ├── layout.tsx                # Root layout (font, metadata, favicon)
│   └── globals.css               # Global styles
│
├── components/                   # Reusable components
│   ├── admin/                    # Komponen khusus admin
│   │   ├── room/                 # delete-button, toggle-availability-button
│   │   ├── dashboard/            # Widget statistik
│   │   └── sidebar.tsx           # Sidebar navigasi admin
│   ├── navbar/                   # Navbar publik (navlink.tsx)
│   ├── invoice/                  # invoice-modal.tsx, invoice-view.tsx
│   ├── reservation/              # reservation-list.tsx
│   ├── skeletons/                # Loading skeleton components
│   ├── card.tsx                  # Card kamar (halaman utama)
│   ├── hero.tsx                  # Hero section
│   ├── main.tsx                  # Grid kamar utama
│   ├── footer.tsx                # Footer
│   └── contact-form.tsx          # Form kontak
│
├── lib/                          # Utilities & server logic
│   ├── actions/                  # Server Actions
│   │   ├── room.action.ts        # CRUD kamar + toggle availability
│   │   ├── reservation.action.ts # Buat & update reservasi
│   │   ├── midtrans.action.ts    # Buat Snap Token Midtrans
│   │   ├── user.action.ts        # Manajemen user
│   │   └── contact.action.ts     # Kirim pesan kontak
│   ├── prisma.ts                 # Prisma client singleton
│   └── midtrans.ts               # Midtrans client config
│
├── prisma/
│   ├── schema.prisma             # Skema database lengkap
│   └── generated/client/         # Prisma generated client (jangan edit manual)
│
├── public/                       # Static assets
│   ├── uploads/                  # Foto kamar yang di-upload (⚠️ tidak persistent di Vercel)
│   ├── logo.png                  # Logo EbKost
│   └── vercel.svg                # Favicon
│
├── types/                        # TypeScript type definitions
├── auth.ts                       # Konfigurasi NextAuth (providers, callbacks)
├── middleware.ts                 # Proteksi route & redirect berdasarkan role
└── next.config.ts                # Konfigurasi Next.js (allowed image domains, dll)
```

---

## 🗄️ Skema Database

```prisma
enum Role          { USER | ADMIN }
enum BookingStatus { PENDING | WAITING_APPROVAL | SUCCESS | CANCELLED | FINISHED }

model User {
  id, name, email, image, role, createdAt, updatedAt
  → reservations: Reservation[]
}

model Room {
  id, name, description, image, capacity, price
  isAvailable Boolean  // true = bisa dipesan, false = sold out
  createdAt, updatedAt
  → roomAmenities: RoomAmenities[]
  → reservations:  Reservation[]
}

model Reservation {
  id, userId, roomId, totalPrice, status
  paymentProof, snapToken (Midtrans)
  notes, checkInDate, createdAt, updatedAt
}

model Amenities     { id, name }
model RoomAmenities { roomId + amenityId (unique pair) }
model Contact       { id, name, email, subject, message }
```

---

## 🚀 Cara Menjalankan Lokal

### Prasyarat
- **Node.js** v18 atau lebih baru
- **Git**
- Akun **Neon** (database PostgreSQL serverless gratis) — [neon.tech](https://neon.tech)
- Akun **Google Cloud** (untuk OAuth)
- Akun **Midtrans Sandbox** — [sandbox.midtrans.com](https://sandbox.midtrans.com)

### 1. Clone Repository
```bash
git clone https://github.com/username/ebkost.git
cd ebkost
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Buat file `.env` di root project (lihat bagian [Environment Variables](#-environment-variables)):
```bash
cp .env.example .env   # jika ada, atau buat manual
```

### 4. Setup Database
```bash
# Push schema ke database (tanpa migration history)
npx prisma db push

# Atau jika ingin dengan migration history
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

### 5. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 6. (Opsional) Buka Prisma Studio
```bash
npx prisma studio
# Buka http://localhost:5555 untuk GUI database
```

---

## 🔐 Environment Variables

Buat file `.env` di root project dengan isi berikut:

```env
# ── Database (Neon PostgreSQL) ─────────────────────────────────────────────
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# ── NextAuth ───────────────────────────────────────────────────────────────
AUTH_SECRET=random_string_panjang_minimal_32_karakter
AUTH_URL=http://localhost:3000          # Ganti ke URL production saat deploy
AUTH_TRUST_HOST=true

# ── Google OAuth ───────────────────────────────────────────────────────────
AUTH_GOOGLE_ID=xxx.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=GOCSPX-xxx

# ── Midtrans ───────────────────────────────────────────────────────────────
MIDTRANS_MERCHANT_ID=Mxxxxxxxx
MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxx
MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxx
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxx   # Diakses di client-side
MIDTRANS_IS_PRODUCTION=false    # Ganti ke true untuk production
```

### Cara mendapatkan tiap key:

| Key | Cara Mendapatkan |
|-----|------------------|
| `DATABASE_URL` | Buat project di [neon.tech](https://neon.tech) → Connection String |
| `AUTH_SECRET` | Jalankan `openssl rand -base64 32` di terminal |
| `AUTH_GOOGLE_ID/SECRET` | [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → Create OAuth Client |
| `MIDTRANS_*` | [Dashboard Midtrans](https://dashboard.sandbox.midtrans.com) → Settings → Access Keys |

---

## 🔄 Alur Sistem

```
User → Pilih Kamar → Booking → [Midtrans Snap Payment]
                                     ↓
                            Webhook Notifikasi
                                     ↓
                    Status Reservasi Update Otomatis
                                     ↓
                         User → Lihat Invoice → Cetak PDF
```

### Status Reservasi (BookingStatus)

| Status | Keterangan | Siapa yang set |
|--------|-----------|----------------|
| `PENDING` | Baru dibuat, menunggu pembayaran | Sistem (otomatis) |
| `WAITING_APPROVAL` | Pembayaran diterima, menunggu konfirmasi admin | Midtrans Webhook |
| `SUCCESS` | Reservasi dikonfirmasi admin | Admin |
| `CANCELLED` | Dibatalkan | Admin / User |
| `FINISHED` | Masa sewa selesai | Admin |

---

## 👥 Role & Hak Akses

| Halaman / Fitur | Tamu | User | Admin |
|----------------|:----:|:----:|:-----:|
| Beranda & Kamar | ✅ | ✅ | ✅ |
| Detail Kamar | ✅ | ✅ | ✅ |
| Booking Kamar | ❌ | ✅ | ❌ |
| Pembayaran Midtrans | ❌ | ✅ | ❌ |
| Riwayat Pesanan | ❌ | ✅ | ❌ |
| Invoice Digital | ❌ | ✅ | ❌ |
| Dashboard Admin | ❌ | ❌ | ✅ |
| Manajemen Kamar | ❌ | ❌ | ✅ |
| Toggle Sold Out | ❌ | ❌ | ✅ |
| Manajemen Reservasi | ❌ | ❌ | ✅ |
| Manajemen User | ❌ | ❌ | ✅ |

> **Cara set role ADMIN:** Ubah field `role` user di database menjadi `ADMIN` via Prisma Studio (`npx prisma studio`).

---

## ⚙️ API & Server Actions

### Server Actions (`lib/actions/`)

| File | Fungsi | Keterangan |
|------|--------|-----------|
| `room.action.ts` | `createRoom`, `updateRoom`, `deleteRoom`, `toggleRoomAvailability` | CRUD kamar + toggle sold out |
| `reservation.action.ts` | `createReservation`, `updateReservationStatus` | Buat & update status booking |
| `midtrans.action.ts` | `createSnapToken` | Generate token pembayaran Midtrans |
| `user.action.ts` | `deleteUser`, `updateUserRole` | Manajemen akun pengguna |
| `contact.action.ts` | `submitContact` | Simpan pesan dari form kontak |

### API Routes (`app/api/`)

| Endpoint | Method | Keterangan |
|----------|--------|-----------|
| `/api/auth/[...nextauth]` | GET/POST | Handler NextAuth (login, callback, session) |
| `/api/midtrans/notification` | POST | Webhook dari Midtrans untuk update status pembayaran otomatis |

---

## 🌐 Deploy ke Vercel

### 1. Push ke GitHub
```bash
git add .
git commit -m "ready to deploy"
git push origin main
```

### 2. Import di Vercel
Buka [vercel.com](https://vercel.com) → **Add New Project** → Import repo GitHub.

### 3. Set Environment Variables
Di halaman Vercel, masukkan semua variabel dari `.env` — **UBAH** `AUTH_URL` ke URL Vercel:
```
AUTH_URL=https://nama-project.vercel.app
```

### 4. Update Google OAuth Callback
Di [Google Cloud Console](https://console.cloud.google.com), tambahkan:
```
https://nama-project.vercel.app/api/auth/callback/google
```

### ⚠️ Catatan Penting untuk Production

> **Upload Gambar** — Fitur upload foto kamar menyimpan file ke `/public/uploads` (local filesystem). Ini **tidak berfungsi** di Vercel karena filesystem bersifat ephemeral. Solusi: Migrasi ke **Cloudinary** atau **AWS S3**.
>
> **Midtrans** — Ganti `MIDTRANS_IS_PRODUCTION=true` dan gunakan key production dari dashboard Midtrans saat benar-benar ingin menerima pembayaran nyata.

---

## 📝 Catatan Pengembang

### Hal yang Perlu Dikembangkan Lebih Lanjut

- [ ] **Migrasi upload gambar ke Cloudinary** (agar bisa deploy ke Vercel)
- [ ] **Fitur Rating & Review** kamar oleh penyewa
- [ ] **Notifikasi Email** otomatis saat status reservasi berubah
- [ ] **Fitur checkin/checkout date range** untuk sewa per periode
- [ ] **Laporan keuangan export Excel/PDF** untuk admin
- [ ] **Fitur chat** antara user dan admin

### Konvensi Kode

- Gunakan **Server Components** untuk fetch data (hindari `useEffect` untuk data fetching)
- Gunakan **Server Actions** untuk semua mutasi data (form submit, toggle, delete)
- Semua logika database ada di `lib/actions/` — jangan panggil Prisma langsung dari komponen
- Penamaan file komponen: `kebab-case.tsx`
- Gunakan path alias `@/` untuk import (sudah dikonfigurasi di `tsconfig.json`)

### Troubleshooting Umum

| Masalah | Solusi |
|---------|--------|
| `EPERM: cannot rename Prisma DLL` | Stop dev server → `npx prisma generate` → restart |
| `Unable to acquire lock at .next/dev/lock` | Kill semua proses Node: `taskkill /F /IM node.exe` (Windows) |
| Toggle sold out error | Pastikan Prisma Client sudah di-generate ulang setelah `db push` |
| Login Google tidak redirect | Pastikan `AUTH_URL` sesuai dengan URL yang diakses |

---

## 👨‍💻 Tentang Developer

Project ini dikembangkan sebagai proyek magang oleh **MWAN (Mwa Najib)**.

- GitHub: [github.com/MwanNajib](https://github.com/MwanNajib)
- Lokasi: Kota Tangerang, Banten

---

<p align="center">
  Dibuat dengan ❤️ menggunakan Next.js — © 2026 EbKost. All Rights Reserved.
</p>
