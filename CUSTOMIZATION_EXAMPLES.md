# 💡 Quick Customization Examples

Panduan cepat untuk melakukan customization umum pada landing page.

## 1. Mengubah Data Perusahaan

**File:** `src/data/config.js`

```javascript
// Ganti ini:
export const company = {
  name: "Sky Estate",
  logo: "🏢",
  tagline: "Your Dream Home Awaits",
  description: "...",
  yearEstablished: 2015,
  vision: "...",
  mission: [...]
}

// Dengan data Anda:
export const company = {
  name: "PT. Rumah Impian Indonesia",  // Ganti nama
  logo: "/images/logo.png",  // Atau emoji 🏘️
  tagline: "Wujudkan Rumah Impian Anda",  // Ganti tagline
  description: "PT. Rumah Impian Indonesia adalah developer terpercaya...",
  yearEstablished: 2018,  // Tahun perusahaan Anda
  vision: "Menjadi developer pilihan utama...",
  mission: [
    "Menyediakan hunian berkualitas",
    "Memberikan layanan terbaik",
    // ... dst
  ]
}
```

## 2. Mengubah Informasi Project

**File:** `src/data/config.js`

```javascript
export const project = {
  name: "Perumahan Taman Hijau", // Nama project Anda
  location: "Jl. Sudirman, Depok", // Lokasi singkat
  fullAddress: "Jl. Sudirman No. 123, Depok 16424", // Alamat lengkap
  areaSize: "125 Hektar", // Luas area
  totalUnits: 1200, // Total unit
  status: "Ready Stock", // Status: Pre-launch, On Progress, Ready Stock
  description: "Perumahan berkualitas dengan...",
  googleMapsLink: "https://maps.google.com/?q=...",
  landmarks: [
    { name: "Stasiun Terdekat", distance: "2 km" },
    { name: "Tol Akses", distance: "1 km" },
    // ... dst
  ],
};
```

## 3. Menambah/Mengubah Tipe Rumah

**File:** `src/data/config.js`

```javascript
// Tambah tipe rumah baru:
export const houseTypes = [
  {
    id: 1,
    name: "Tipe 36",
    landArea: "36 m²",
    buildingArea: "30 m²",
    bedroom: 1,
    bathroom: 1,
    floor: 1,
    priceStartFrom: "Rp 250.000.000",
    specification: [
      "Desain modern minimalis compact",
      "Lokasi strategis",
      "Akses mudah",
    ],
    image: "https://images.unsplash.com/...",
    floorPlan: "https://images.unsplash.com/...",
  },
  // Tambah lebih banyak...
];
```

## 4. Mengubah Warna Theme (Optional)

Jika ingin mengubah warna dari blue/indigo ke warna lain:

### Ganti di File: `src/components/sections/*.jsx`

```javascript
// Dari:
className = "bg-blue-600 text-white";

// Ke:
className = "bg-purple-600 text-white";

// Atau:
className = "bg-green-600 text-white";
className = "bg-pink-600 text-white";
className = "bg-amber-600 text-white";
```

### Color Palette Tailwind:

- Blue: `blue-50` hingga `blue-950`
- Purple: `purple-50` hingga `purple-950`
- Green: `green-50` hingga `green-950`
- Red: `red-50` hingga `red-950`
- Pink: `pink-50` hingga `pink-950`

## 5. Mengubah Fasilitas

**File:** `src/data/config.js`

```javascript
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam",
    description: "Tim keamanan...",
    icon: "🔒", // Ganti emoji
    image: "https://images.unsplash.com/...", // Ganti gambar
  },
  {
    id: 2,
    name: "Kolam Renang Olympic", // Ganti nama
    description: "Kolam renang Olympic-size...", // Ganti deskripsi
    icon: "🏊", // Ganti emoji
    image: "https://images.unsplash.com/...", // Ganti gambar
  },
  // Tambah lebih banyak atau ubah yang ada
];
```

### Emoji Populer untuk Fasilitas:

- Security: 🔒 🛡️ 👮
- Kolam: 🏊 🏊‍♀️ 💦
- Taman: 🌳 🌲 🌴 🌸
- Masjid: 🕌
- Tenis: 🎾
- Gym: 💪 🏋️
- Parking: 🅿️ 🚗
- Playground: 🎡 🎠 🎪

## 6. Mengubah Keunggulan Lokasi

**File:** `src/data/config.js`

```javascript
export const advantages = [
  {
    id: 1,
    title: "Dekat Bandara", // Ganti keunggulan
    description: "Hanya 15 km dari Bandara...",
    distance: "15 km",
    icon: "✈️", // Ganti emoji
  },
  {
    id: 2,
    title: "Akses Tol Langsung",
    description: "Pintu tol tepat di samping...",
    distance: "0.5 km",
    icon: "🚗",
  },
  // Update sesuai lokasi Anda
];
```

## 7. Mengubah Skema Pembayaran

**File:** `src/data/config.js`

```javascript
export const pricing = {
  startingPrice: "Rp 299.000.000", // Ganti harga
  paymentScheme: [
    { type: "Cash", discount: "10%" }, // Ubah diskon
    { type: "KPR", discount: "0%" },
    { type: "Cicilan 12 Bulan", discount: "2%" }, // Tambah skema baru
  ],
  promo: [
    "Diskon 10% untuk pembayaran tunai",
    "Gratis biaya administrasi",
    "Bonus furniture senilai 10 juta", // Update promo
  ],
  minimalDP: "15%", // Ubah DP minimal
};
```

## 8. Mengubah Kontak Marketing

**File:** `src/data/config.js`

```javascript
export const marketing = {
  name: "Budi Santoso", // Ganti nama
  phone: "+62 812-3456-7890", // Ganti nomor
  email: "info@rumahimpian.com", // Ganti email
  officeAddress: "Jl. Gatot Subroto No. 45, Jakarta", // Ganti alamat
  operationalHours: "Senin - Jumat: 09:00 - 18:00 | Sabtu: 09:00 - 16:00",
  agents: [
    {
      id: 1,
      name: "Agen 1",
      phone: "+62 812-1111-1111",
      whatsapp: "https://wa.me/6281211111111", // Format: https://wa.me/[nomor tanpa +]
    },
    {
      id: 2,
      name: "Agen 2",
      phone: "+62 812-2222-2222",
      whatsapp: "https://wa.me/6281222222222",
    },
  ],
};
```

### Convert WhatsApp Number:

```
Nomor: +62 812-3456-7890
WhatsApp URL: https://wa.me/6281234567890
(Hapus +, spasi, dan dash)
```

## 9. Menambah Foto ke Gallery

**File:** `src/data/config.js`

```javascript
export const gallery = [
  // ... foto yang sudah ada
  {
    id: 7, // ID baru
    title: "Jogging Track", // Nama foto
    category: "facility", // Kategori: area, house, facility
    image: "https://your-image-url.jpg", // URL foto Anda
  },
  // Tambah lebih banyak...
];
```

### Kategori Foto:

- `area` - Foto kawasan/lingkungan
- `house` - Foto rumah/unit
- `facility` - Foto fasilitas/amenities

## 10. Customize Tombol & Colors

### Di `src/components/common/Button.jsx`

```javascript
// Ubah warna primary button:
const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg",
  // Menjadi:
  primary: "bg-green-600 text-white hover:bg-green-700 shadow-lg",
};
```

## 11. Mengubah Google Maps

**File:** `src/components/sections/ContactForm.jsx`

```javascript
// Ganti link Jagorawi dengan lokasi Anda:
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d[COORDINATE]!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sYANG%20INI%20NAMAMU!2s[LOKASI]"
  // Get embed code dari: https://maps.google.com/
  // Search lokasi Anda → Share → Embed a map → Copy HTML
/>
```

## 12. Mengganti Gambar Hero

**File:** `src/components/sections/Hero.jsx`

```javascript
// Ganti URL gambar:
<img
  src="https://images.unsplash.com/photo-1570129477492-45f003313e78"
  // Menjadi:
  src="/images/my-beautiful-house.jpg" // Gambar lokal Anda
  alt="Hero Property"
/>
```

## 13. Setup Email Form Submission

### Opsi 1: Menggunakan EmailJS (Simple)

1. Daftar di https://emailjs.com/
2. Get Service ID & Template ID
3. Update `src/components/sections/ContactForm.jsx`:

```javascript
import emailjs from "@emailjs/browser";

// Di dalam handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "service_xxxxx", // Service ID dari EmailJS
      "template_xxxxx", // Template ID dari EmailJS
      formData,
      "public_xxxxx", // Public Key dari EmailJS
    );
    setIsSubmitted(true);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
```

### Opsi 2: Menggunakan Formspree

1. Daftar di https://formspree.io/
2. Ubah form action:

```javascript
<form
  onSubmit={handleSubmit}
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
>
  // Form fields...
</form>
```

## 14. Mengoptimalkan Gambar

Sebelum upload, pastikan:

```
✅ Format: JPG (fotografi), PNG (logo/icon)
✅ Ukuran: Max 1-2MB per gambar
✅ Dimensi:
   - Hero image: 1200x600px
   - Card image: 400x300px
   - Gallery: 600x400px
✅ Kompres: Gunakan TinyPNG atau ImageOptim
```

## 15. Mengubah Font/Typography

Di `src/index.css`:

```css
/* Tambahkan Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

/* Gunakan di component */
className="font-['Poppins'] font-bold"
```

---

## ⏱️ Waktu Estimasi Customization

- Mengubah data: 30-60 menit
- Ganti semua gambar: 1-2 jam
- Setup email form: 30 menit
- Setup Google Maps: 15 menit
- Deploy ke production: 15 menit
- **Total: 3-4 jam** ⚡

---

## 🆘 Troubleshooting

### Form tidak bisa submit?

- Cek browser console (F12 → Console)
- Pasikan nomor WhatsApp format benar: +62...
- Check email service setup

### Gambar tidak muncul?

- Pastikan URL gambar valid (test di browser)
- Check file size (jangan >5MB)
- Clear browser cache (Ctrl+Shift+Del)

### Styling tidak sesuai?

- Clear cache: `npm run dev` lalu refresh
- Cek className (jangan ada typo)
- Rebuild project: `npm run build`

---

**Selamat! Anda sekarang siap untuk customize landing page! 🚀**
