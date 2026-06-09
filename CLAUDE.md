# CLAUDE.md — Website Profil Desa Gongseng

> File ini dibaca otomatis oleh Claude Code. Baca seluruhnya sebelum mengerjakan task apapun.

---

## 🏡 Gambaran Proyek

Website profil desa digital untuk **Desa Gongseng, Kec. Megaluh, Kab. Jombang, Jawa Timur**.  
Dibangun sebagai program KKN mahasiswa IPB University.

**Dua akses utama:**
- `/` → Halaman publik untuk warga dan pengunjung (read-only)
- `/admin` → Portal CMS untuk perangkat desa (login required, powered by Payload CMS)

**Filosofi utama:** Satu codebase, satu deployment, maintenance minimal.

---

## 🧱 Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 15 |
| Language | TypeScript | 5.x |
| CMS | Payload CMS (native Next.js) | 3.x |
| Styling | Tailwind CSS | 4.x |
| UI Components | Shadcn/ui | latest |
| Database | PostgreSQL via Neon Tech | - |
| ORM | Drizzle ORM (Payload built-in) | - |
| Storage | Uploadthing | latest |
| Deployment | Vercel | - |
| Package Manager | pnpm | latest |

---

## 📁 Struktur Direktori

```
desa-gongseng/
├── CLAUDE.md                    ← Kamu sedang baca ini
├── GEMINI.md                    ← Instruksi untuk Gemini CLI (isi sama)
├── .env.local                   ← Environment variables (JANGAN commit)
├── .env.example                 ← Template env vars (boleh commit)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── payload.config.ts            ← Konfigurasi utama Payload CMS
│
├── src/
│   ├── app/                     ← Next.js App Router
│   │   ├── (frontend)/          ← Route group: halaman publik
│   │   │   ├── page.tsx                  → Beranda (/)
│   │   │   ├── umkm-wisata/
│   │   │   │   └── page.tsx              → UMKM & Wisata
│   │   │   ├── galeri/
│   │   │   │   └── page.tsx              → Galeri Desa
│   │   │   ├── perangkat-desa/
│   │   │   │   └── page.tsx              → Perangkat Desa
│   │   │   ├── layanan-informasi/
│   │   │   │   └── page.tsx              → Layanan & Informasi
│   │   │   ├── profil-desa/
│   │   │   │   └── page.tsx              → Profil Desa
│   │   │   └── layout.tsx                → Layout publik (navbar + footer)
│   │   │
│   │   ├── (payload)/           ← Route group: Payload CMS admin
│   │   │   └── admin/
│   │   │       └── [[...segments]]/
│   │   │           └── page.tsx          → Admin portal (/admin)
│   │   │
│   │   └── api/
│   │       └── [...slug]/
│   │           └── route.ts              → Payload REST API handler
│   │
│   ├── collections/             ← Payload CMS Collections (data bisa banyak)
│   │   ├── Users.ts             → Admin users
│   │   ├── UMKM.ts              → Produk & usaha UMKM
│   │   ├── Wisata.ts            → Destinasi wisata
│   │   ├── Galeri.ts            → Foto galeri desa
│   │   ├── PerangkatDesa.ts     → Profil perangkat desa
│   │   ├── Kegiatan.ts          → Jadwal kegiatan (posyandu, dll.)
│   │   ├── Pengumuman.ts        → Berita & pengumuman
│   │   └── Media.ts             → Upload handler (gambar, dokumen)
│   │
│   ├── globals/                 ← Payload CMS Globals (data singleton)
│   │   ├── ProfilDesa.ts        → Sejarah, visi, misi, geografi
│   │   ├── HeroBeranda.ts       → Foto hero, tagline, deskripsi
│   │   ├── SambutanKades.ts     → Foto, nama, jabatan, teks sambutan
│   │   ├── DataDemografi.ts     → Jumlah penduduk, KK, dll.
│   │   ├── KontakSosmed.ts      → WA, email, alamat, Instagram
│   │   └── APBDes.ts            → Data anggaran desa (opsional)
│   │
│   ├── components/              ← React components
│   │   ├── ui/                  → Shadcn/ui components (JANGAN edit manual)
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/            → Section components per halaman
│   │   │   ├── HeroSection.tsx
│   │   │   ├── StatistikSection.tsx
│   │   │   ├── SambutanSection.tsx
│   │   │   └── ...
│   │   └── shared/              → Komponen reusable lintas halaman
│   │       ├── UMKMCard.tsx
│   │       ├── GaleriGrid.tsx
│   │       ├── KegiatanCard.tsx
│   │       └── WAButton.tsx
│   │
│   ├── lib/                     ← Utilities & helpers
│   │   ├── payload.ts           → Payload client helper (getPayload)
│   │   ├── utils.ts             → cn() dan helper umum
│   │   └── constants.ts         → Konstanta (kategori, warna, dll.)
│   │
│   └── types/                   ← TypeScript types
│       └── payload-types.ts     → Auto-generated oleh Payload (jangan edit)
│
└── public/
    ├── images/                  → Static images (logo, placeholder)
    └── icons/                   → Favicon dan app icons
```

---

## 🗃️ Data Model Ringkas

### Collections (bisa banyak item, admin bisa tambah/hapus)

**UMKM** — `nama, kategori, deskripsi, foto[], nomorWA, pesanWA, featured, aktif`  
**Wisata** — `nama, kategori, deskripsi, foto[], tiket, jamBuka, nomorWA, featured`  
**Galeri** — `foto, judul, kategori, tanggal, keterangan`  
**PerangkatDesa** — `nama, jabatan, foto, urutan, kontak, aktif`  
**Kegiatan** — `judul, kategori, tanggal, waktu, lokasi, deskripsi, dokumen`  
**Pengumuman** — `judul, konten, tanggalTerbit, tanggalBerakhir, lampiran, penting`  
**Media** — Upload handler untuk semua file (gambar & dokumen)

### Globals (singleton, hanya satu — admin edit langsung)

**HeroBeranda** — foto hero, tagline, deskripsi singkat  
**SambutanKades** — foto, nama, jabatan, teks sambutan  
**ProfilDesa** — sejarah, visi, misi, geografi, potensi  
**DataDemografi** — jumlah penduduk, KK, laki-laki, perempuan  
**KontakSosmed** — nomor WA, email, alamat, link Instagram  
**APBDes** — pendapatan desa, belanja desa (opsional)

---

## 🌐 Halaman Publik & Route

| Route | Halaman | Sumber Data |
|---|---|---|
| `/` | Beranda | Globals: Hero, Sambutan, Demografi + Collections: Pengumuman, UMKM (featured) |
| `/umkm-wisata` | UMKM & Wisata | Collections: UMKM, Wisata |
| `/galeri` | Galeri Desa | Collection: Galeri |
| `/perangkat-desa` | Perangkat Desa | Collection: PerangkatDesa |
| `/layanan-informasi` | Layanan & Informasi | Collections: Kegiatan, Pengumuman |
| `/profil-desa` | Profil Desa | Globals: ProfilDesa, DataDemografi, KontakSosmed |
| `/admin` | Admin Portal | Payload CMS built-in |

---

## 🔑 Environment Variables

```bash
# .env.local — wajib ada sebelum run dev

# Payload CMS
PAYLOAD_SECRET=          # random string panjang, generate: openssl rand -hex 32

# Database (Neon Tech PostgreSQL)
DATABASE_URI=            # format: postgresql://user:pass@host/dbname?sslmode=require

# Uploadthing (storage media)
UPLOADTHING_TOKEN=       # dari dashboard uploadthing.com

# Next.js
NEXT_PUBLIC_SERVER_URL=  # http://localhost:3000 (dev) atau https://domain.vercel.app (prod)
```

---

## ⚙️ Perintah Penting

```bash
# Install dependencies
pnpm install

# Development server (Next.js + Payload berjalan bersamaan)
pnpm dev

# Build production
pnpm build

# Generate Payload types (jalankan setiap kali ubah collections/globals)
pnpm payload generate:types

# Database migration (setiap kali ubah schema Payload)
pnpm payload migrate

# Lint
pnpm lint
```

---

## 📐 Konvensi Koding

### TypeScript
- Selalu gunakan TypeScript, tidak ada `any` kecuali benar-benar terpaksa
- Gunakan type dari `payload-types.ts` yang auto-generated untuk semua data Payload
- Prefer `interface` untuk object shapes, `type` untuk unions/intersections

### Komponen
- Semua komponen dalam format **PascalCase**: `UMKMCard.tsx`
- Server Components by default di App Router — tambahkan `'use client'` hanya jika benar-benar perlu (event handler, hooks)
- Props selalu di-type secara eksplisit

```tsx
// ✅ Benar
interface UMKMCardProps {
  nama: string
  kategori: string
  nomorWA: string
}

export function UMKMCard({ nama, kategori, nomorWA }: UMKMCardProps) { ... }

// ❌ Hindari
export function UMKMCard(props: any) { ... }
```

### Styling
- Gunakan **Tailwind CSS utility classes** — jangan tulis CSS custom kecuali sangat perlu
- Gunakan fungsi `cn()` dari `lib/utils.ts` untuk conditional classes
- Komponen UI pakai **Shadcn/ui** — install via `pnpm dlx shadcn@latest add [component]`
- Jangan edit file di `components/ui/` secara manual

```tsx
// ✅ Benar
import { cn } from '@/lib/utils'
<div className={cn('rounded-lg p-4', isActive && 'bg-primary')} />

// ❌ Hindari
<div style={{ borderRadius: '8px', padding: '16px' }} />
```

### Fetch Data dari Payload
- Selalu gunakan `getPayload` dari `lib/payload.ts` untuk query data
- Fetch data di **Server Components** (bukan client-side fetch)
- Gunakan `depth` yang minimal untuk performa

```tsx
// ✅ Benar — fetch di Server Component
import { getPayload } from '@/lib/payload'

export default async function UMKMPage() {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'umkm',
    where: { aktif: { equals: true } },
    depth: 1,
  })
  return <UMKMGrid items={docs} />
}
```

### WhatsApp Button
- Gunakan komponen `WAButton` dari `components/shared/WAButton.tsx`
- Format URL WA: `https://wa.me/62{nomor}?text={encodeURIComponent(pesan)}`
- Nomor WA disimpan tanpa `0` di depan (sudah format internasional)

```tsx
const pesanDefault = `Halo, saya tertarik dengan ${nama}. Boleh saya tahu informasi lebih lanjut?`
const url = `https://wa.me/62${nomorWA}?text=${encodeURIComponent(pesanWA || pesanDefault)}`
```

### Naming Convention
- **File**: `kebab-case.tsx` untuk pages, `PascalCase.tsx` untuk components
- **Variable/function**: `camelCase`
- **Constant**: `UPPER_SNAKE_CASE`
- **Payload collection slug**: `kebab-case` (`perangkat-desa`, bukan `perangkatDesa`)
- **CSS class**: Tailwind utilities only

---

## 🎨 Design Tokens

```ts
// Color palette — gunakan via Tailwind config
const colors = {
  primary: '#1B4332',    // Hijau tua — navbar, heading
  secondary: '#40916C',  // Hijau medium — subheading, icon
  accent: '#52B788',     // Hijau cerah — tombol, highlight
  light: '#D8F3DC',      // Hijau muda — background card
  lighter: '#F0FBF3',    // Hijau sangat muda — background section
}

// Typography
// Heading: Plus Jakarta Sans (bold)
// Body: Inter (regular/medium)
// Base size: 16px
```

---

## 🚫 Aturan Penting (JANGAN dilakukan)

- **JANGAN** edit `src/types/payload-types.ts` secara manual — file ini auto-generated
- **JANGAN** edit file di `src/components/ui/` — update via CLI Shadcn
- **JANGAN** commit file `.env.local` ke GitHub
- **JANGAN** gunakan `fetch()` client-side untuk data Payload — selalu server-side
- **JANGAN** tambah sistem booking/payment — UMKM hanya pakai WA redirect
- **JANGAN** install library CSS lain selain Tailwind
- **JANGAN** buat route API custom untuk data yang sudah bisa diambil via Payload local API

---

## ✅ Checklist Sebelum Push ke GitHub

- [ ] `pnpm build` berhasil tanpa error
- [ ] `pnpm lint` bersih
- [ ] Tidak ada `console.log` yang tertinggal di production code
- [ ] Semua gambar menggunakan `next/image` (bukan `<img>` biasa)
- [ ] Halaman baru sudah responsive (cek di mobile viewport)
- [ ] Environment variable baru sudah ditambahkan ke `.env.example`
- [ ] Jika ubah schema Payload, jalankan `pnpm payload generate:types`

---

## 🗺️ Roadmap

### Fase 1 — AKTIF SEKARANG
- [x] Project Brief & arsitektur
- [ ] Setup project (Next.js + Payload + Neon + Vercel)
- [ ] Definisi semua Collections & Globals
- [ ] Development 6 halaman publik
- [ ] Testing & optimasi
- [ ] Training admin & launch

### Fase 2 — DITANGGUHKAN
- [ ] GIS Pemetaan Sawah (Leaflet.js + PostGIS)
- [ ] Digitasi data sawah dari citra satelit/BPN

---

## 📞 Konteks Proyek

- **Developer:** Ahmad — Mahasiswa Fisika Komputasi IPB University (fokus Data Science & AI)
- **Lokasi KKN:** Desa Gongseng, Kec. Megaluh, Kab. Jombang, Jawa Timur
- **Target pengguna admin:** Perangkat desa (non-technical, harus sangat mudah digunakan)
- **Target pengguna publik:** Warga desa & pengunjung umum (mayoritas akses via smartphone)
