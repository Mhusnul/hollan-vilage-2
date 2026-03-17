# 🏠 Holland Village - Real Estate Landing Page

Dokumentasi lengkap dan panduan penggunaan landing page real estate modern.

## ✨ Fitur yang Telah Dibuat

### 1. **Header/Navigation** ✅

- Logo dan brand name
- Menu navigasi responsif
- Mobile hamburger menu
- CTA button "Hubungi Kami"

### 2. **Hero Section** ✅

- Tagline & deskripsi project yang menarik
- Quick stats (8K+ residents, 5K+ units, etc)
- Call-to-action buttons
- Featured property image
- Project status badge

### 3. **About Section** ✅

- Informasi perusahaan (nama, deskripsi, tahun berdiri)
- Visi & Misi perusahaan
- Informasi detail project
  - Lokasi lengkap
  - Luas area & total unit
  - Deskripsi project
- Landmark terdekat dengan jarak

### 4. **House Types Section** ✅

- Grid showcase 3 tipe rumah
- Card design yang menarik dengan foto
- Spesifikasi singkat (tanah, bangunan, kamar)
- Harga mulai dari
- Modal detail with:
  - Foto rumah
  - Denah
  - Spesifikasi lengkap
  - Informasi detail (tanah, bangunan, kamar tidur, mandi)

### 5. **Amenities/Facilities Section** ✅

- 8 fasilitas utama dengan grid layout
- Icon & gambar untuk setiap fasilitas
- Deskripsi singkat
- Highlights section (Security, Green Environment, Active Community)

### 6. **Advantages/Selling Points Section** ✅

- 6 keunggulan lokasi strategis
- Icon untuk setiap keunggulan
- Jarak ke fasilitas penting
- Badge untuk distance

### 7. **Gallery Section** ✅

- Grid photo gallery dengan 6+ foto
- Kategori filter (Semua, Kawasan, Rumah, Fasilitas)
- Lightbox untuk melihat foto full size
- Hover effects yang smooth

### 8. **Pricing & Promo Section** ✅

- Harga mulai dari (highlight besar)
- Skema pembayaran (Cash, KPR, Inhouse)
- Current promotions list
- Comparison table (Tipe, Luas, Harga)
- Detailed pricing information

### 9. **Contact & Lead Form Section** ✅

- Form inquiry lengkap dengan:
  - Nama lengkap
  - Nomor HP/WhatsApp
  - Email
  - Tipe rumah yang diminati
  - Pesan/pertanyaan
- Contact information (Manager name, phone, email)
- Marketing agents dengan WhatsApp link
- Office details & operational hours
- Success confirmation message
- Embedded Google Maps

### 10. **Footer** ✅

- Company info & description
- Quick links (Projects, Services, Contact)
- Office address & contact
- Social media buttons
- Copyright & legal links
- Scroll-to-top button

## 📊 Data yang Dapat Dikustomisasi

Semua data disimpan di `src/data/config.js`. Edit file ini untuk mengubah:

### Company Data

```javascript
export const company = {
  name: "Sky Estate",           // Nama perusahaan
  logo: "🏢",                   // Emoji atau path gambar
  tagline: "Your Dream Home",   // Tagline/slogan
  description: "...",           // Deskripsi singkat
  yearEstablished: 2015,        // Tahun berdiri
  vision: "...",                // Visi
  mission: [...],               // Array misi
}
```

### Project Data

```javascript
export const project = {
  name: "Holland Village",      // Nama proyek
  location: "...",              // Lokasi singkat
  fullAddress: "...",           // Alamat lengkap
  areaSize: "45 Hektar",        // Luas area
  totalUnits: 850,              // Total unit
  status: "On Progress",        // Status proyek
  description: "...",           // Deskripsi lengkap
  googleMapsLink: "...",        // Google Maps URL
  landmarks: [...],             // Array landmark terdekat
}
```

### House Types

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
    image: "URL_gambar_rumah",
    floorPlan: "URL_denah"
  },
  // ...tambah lebih banyak tipe
]
```

### Facilities

```javascript
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam",
    description: "Tim keamanan profesional...",
    icon: "🔒", // Emoji icon
    image: "URL_gambar",
  },
  // ...tambah lebih banyak fasilitas
];
```

### Advantages

```javascript
export const advantages = [
  {
    id: 1,
    title: "Dekat Dengan Tol",
    description: "Hanya 1.5 km dari Tol Jagorawi...",
    distance: "1.5 km",
    icon: "🚗",
  },
  // ...
];
```

### Pricing & Promo

```javascript
export const pricing = {
  startingPrice: "Rp 395.000.000",
  paymentScheme: [
    { type: "Cash", discount: "5%" },
    { type: "KPR", discount: "0%" },
  ],
  promo: [...],
  minimalDP: "10%"
}
```

### Marketing Contact

```javascript
export const marketing = {
  name: "Agen Anda",
  phone: "+62 812-xxxx-xxxx",
  email: "email@example.com",
  officeAddress: "Alamat kantor",
  operationalHours: "09:00 - 18:00",
  agents: [
    {
      id: 1,
      name: "Agen A",
      phone: "+62 812-xxxx-xxxx",
      whatsapp: "https://wa.me/628121111111",
    },
  ],
};
```

## 🎨 Komponen Reusable

### Button Component

```jsx
<Button variant="primary" size="lg">
  Click Here
</Button>
```

Variants: `primary`, `secondary`, `outline`
Sizes: `sm`, `md`, `lg`

### Card Component

```jsx
<Card
  image="https://..."
  title="Tipe A"
  price="Rp 395.000.000"
  specs={["Spec 1", "Spec 2"]}
  onDetailsClick={() => handleClick()}
/>
```

### SectionTitle Component

```jsx
<SectionTitle
  title="Section Title"
  subtitle="Optional subtitle"
  centered={true}
/>
```

## 🚀 Quick Start

1. **Jalankan dev server:**

   ```bash
   npm run dev
   ```

2. **Buka browser:** http://localhost:5174

3. **Edit data:** Buka `src/data/config.js` dan ubah informasi sesuai kebutuhan

4. **Build production:**
   ```bash
   npm run build
   ```

## 🎯 Langkah Selanjutnya untuk Customization

### 1. Ganti Gambar (Recommended)

- Edit `src/data/config.js`
- Ganti URL gambar dengan URL dari gambar lokal atau hosting
- Berikan gambar berkualitas tinggi untuk hasil terbaik

### 2. Ganti Warna Brand

- Edit file komponen untuk mengubah Tailwind color classes
- Gunakan Tailwind palette: blue, indigo, purple, green, red, dll
- Contoh: `bg-blue-600` → `bg-purple-600`

### 3. Integrasikan Backend

- Form inquiry saat ini hanya menampilkan success message
- Hubungkan ke backend atau email service:
  - EmailJS
  - Formspree
  - Custom API

### 4. Tambah SEO

```bash
npm install react-helmet-async
```

### 5. Tambah Internationalization (i18n)

```bash
npm install i18next react-i18next
```

### 6. Setup Analytics

- Google Analytics
- Hotjar
- Facebook Pixel

## 📱 Responsive Breakpoints

Semua komponen responsive untuk:

- 📱 Mobile: < 640px
- 📱 Tablet: 640px - 1024px
- 💻 Desktop: > 1024px

## 🔐 Best Practices

✅ Ganti data dummy dengan data asli di `src/data/config.js`
✅ Optimasi gambar sebelum upload
✅ Pastikan WhatsApp number menggunakan format: +62xxxxxxxxxxx
✅ Gunakan email yang terverifikasi
✅ Test form submission sebelum go-live
✅ Setup Google Maps dengan API key sendiri
✅ Deploy ke CDN untuk performa optimal

## 📞 Support Features

- ✅ 24/7 Security indication
- ✅ WhatsApp direct chat links
- ✅ Google Maps integration
- ✅ Email contact link
- ✅ Phone call link
- ✅ Inquiry form dengan validation

## 🎬 Performance

- ✅ Optimasi Tailwind CSS (hanya include used styles)
- ✅ Lazy loading untuk gambar
- ✅ Responsive images
- ✅ Fast initial load dengan Vite
- ✅ Smooth animations & transitions

---

**Status:** ✅ Ready to Customize & Deploy

Untuk bantuan lebih lanjut, hubungi tim development Anda.
