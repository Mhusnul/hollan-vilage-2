# Holland Village - Real Estate Landing Page

Sebuah landing page modern untuk proyek real estate dengan desain responsif menggunakan React, Tailwind CSS, dan Vite.

## 📁 Struktur Folder

```
src/
├── components/
│   ├── common/                 # Komponen reusable
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── SectionTitle.jsx
│   │   └── index.js
│   └── sections/               # Komponen section halaman
│       ├── Header.jsx
│       ├── Hero.jsx
│       ├── About.jsx
│       ├── HouseTypes.jsx
│       ├── Advantages.jsx
│       ├── Facilities.jsx
│       ├── Gallery.jsx
│       ├── Pricing.jsx
│       ├── ContactForm.jsx
│       ├── Footer.jsx
│       └── index.js
├── data/
│   └── config.js               # Semua data konten aplikasi
├── pages/
│   └── Home.jsx                # Halaman utama
├── App.jsx                     # Root component
└── index.css                   # Global styles
```

## 🎨 Komponen Reusable

### Button

Komponen tombol dengan berbagai variant dan ukuran.

```jsx
<Button variant="primary" size="md">
  Click Me
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `className`: string untuk override style

### Card

Komponen kartu untuk menampilkan properti atau fasilitas.

```jsx
<Card
  image="..."
  title="Tipe A"
  price="Rp 395.000.000"
  specs={[...]}
  onDetailsClick={() => {}}
/>
```

**Props:**

- `image`: URL gambar
- `title`: Judul kartu
- `description`: Deskripsi
- `price`: Harga (opsional)
- `specs`: Array spesifikasi
- `onDetailsClick`: Callback saat tombol diklik

### SectionTitle

Komponen judul section yang konsisten.

```jsx
<SectionTitle title="Judul" subtitle="Subjudul" centered={true} />
```

## 📄 Struktur Data (config.js)

File `src/data/config.js` berisi semua data konten landing page:

### 1. Company Information

```javascript
export const company = {
  name: "Sky Estate",
  logo: "🏢",
  tagline: "Your Dream Home Awaits",
  description: "...",
  yearEstablished: 2015,
  vision: "...",
  mission: [...]
}
```

### 2. Project Information

```javascript
export const project = {
  name: "Holland Village",
  location: "...",
  fullAddress: "...",
  areaSize: "45 Hektar",
  totalUnits: 850,
  status: "On Progress",
  description: "...",
  landmarks: [...]
}
```

### 3. House Types

```javascript
export const houseTypes = [
  {
    id: 1,
    name: "Tipe A",
    landArea: "60 m²",
    buildingArea: "45 m²",
    bedroom: 2,
    bathroom: 1,
    floor: 1,
    priceStartFrom: "Rp 395.000.000",
    specification: [...],
    image: "...",
    floorPlan: "..."
  },
  // ...
]
```

### 4. Facilities

```javascript
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam",
    description: "...",
    icon: "🔒",
    image: "...",
  },
  // ...
];
```

### 5. Advantages

```javascript
export const advantages = [
  {
    id: 1,
    title: "Dekat Dengan Tol",
    description: "...",
    distance: "1.5 km",
    icon: "🚗",
  },
  // ...
];
```

### 6. Gallery

```javascript
export const gallery = [
  {
    id: 1,
    title: "Kawasan Perumahan",
    category: "area", // area, house, facility
    image: "...",
  },
  // ...
];
```

### 7. Pricing & Promo

```javascript
export const pricing = {
  startingPrice: "Rp 395.000.000",
  paymentScheme: [...],
  promo: [...],
  minimalDP: "10%"
}
```

### 8. Marketing Contact

```javascript
export const marketing = {
  name: "Budi Santoso",
  phone: "+62 812-3456-7890",
  email: "info@skyestate.com",
  officeAddress: "...",
  operationalHours: "...",
  agents: [...]
}
```

## 🛠️ Cara Menggunakan

### 1. Menjalankan Development Server

```bash
npm run dev
```

### 2. Build untuk Production

```bash
npm run build
```

### 3. Meng-customize Data

Edit file `src/data/config.js` untuk mengubah:

- Informasi perusahaan
- Informasi proyek
- Harga dan promo
- Fasilitas
- Kontak marketing
- Galeri foto
- Data lainnya

### 4. Menambahkan Komponen Baru

1. Buat file komponen di `src/components/common/` atau `src/components/sections/`
2. Export di file `index.js` yang sesuai
3. Import di halaman atau komponen lain

## 📱 Responsive Design

Semua komponen telah dibangun dengan Tailwind CSS dan responsif untuk:

- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🎯 Fitur Utama

✅ Header dengan navigasi mobile-friendly
✅ Hero section yang impressive
✅ Informasi perusahaan & proyek
✅ Showcase tipe rumah dengan modal detail
✅ Listing fasilitas lengkap
✅ Keunggulan lokasi
✅ Galeri foto dengan filter & lightbox
✅ Tabel perbandingan harga
✅ Form inquiry dengan validasi
✅ Peta lokasi terintegrasi
✅ Footer lengkap dengan kontak
✅ Scroll-to-top button

## 🔧 Teknologi yang Digunakan

- **React 19.2.4** - UI Library
- **Vite 7.3.1** - Build tool
- **Tailwind CSS 4.2.1** - Styling
- **@tailwindcss/vite** - Tailwind integration

## 📝 Catatan Penting

1. **Gambar**: Saat ini menggunakan URL dari unsplash.com. Ganti dengan gambar lokal untuk performa lebih baik.

2. **Form Submission**: Form inquiry saat ini hanya menampilkan success message. Integrasikan dengan backend/email service seperti:
   - EmailJS
   - Formspree
   - Custom API

3. **SEO**: Tambahkan React Helmet untuk meta tags

4. **Analytics**: Pertimbangkan menambahkan Google Analytics

5. **Multilingual**: Untuk mendukung multiple bahasa, gunakan library seperti i18next

## 🚀 Deployment

Untuk mendeploy ke production:

```bash
npm run build
```

Hasilkan folder `dist/` yang dapat di-upload ke:

- Vercel
- Netlify
- GitHub Pages
- Server tradisional

## 📧 Support

Untuk bantuan atau pertanyaan, silakan hubungi tim development.

---

**Dibuat dengan ❤️ untuk Holland Village Real Estate**
