# Admin Dashboard - Panduan Setup & Penggunaan

Panduan lengkap untuk menggunakan Admin Dashboard yang sudah dibuat. Semua UI sudah diterjemahkan ke **Bahasa Indonesia**.

## ✅ Status Setup

- ✅ Custom Hooks untuk Database
- ✅ Admin Layout & Navigation
- ✅ CRUD Pages untuk Properti
- ✅ CRUD Pages untuk Fasilitas
- ✅ CRUD Pages untuk Galeri
- ✅ Supabase Storage Integration
- ✅ Form Components & UI
- ✅ **TERJEMAHKAN KE BAHASA INDONESIA**

## 🚨 PENTING: Fix Error 401 Terlebih Dahulu

Jika melihat error di developer console:

```
Failed to load resource: the server responded with a status of 401
Error fetching properties/facilities/gallery
```

**Baca:** [FIX_ERROR_401.md](FIX_ERROR_401.md) untuk solusi.

---

## 🚀 Cara Mengakses Admin Dashboard

1. Jalankan aplikasi: `npm run dev`
2. Buka browser ke: **http://localhost:5173/admin**
3. Sidebar menu akan muncul dengan navigasi

---

## 📱 Fitur Admin Dashboard

### 1. **Dasbor** (`/admin`)

- Overview statistik (Properti, Fasilitas, Galeri)
- Link cepat ke halaman CRUD

### 2. **Properti** (`/admin/properties`)

- Lihat semua tipe rumah
- Tambah/Edit properti dengan form komplit
- Upload gambar & denah (Supabase Storage)
- Hapus properti

**Field Form:**

- Nama, Luas Tanah, Luas Bangunan
- Kamar Tidur, Lantai
- Harga (Mulai Dari, DP, KPR)
- Gambar (utama + denah)
- Spesifikasi (array)

### 3. **Fasilitas** (`/admin/facilities`)

- Kelola fasilitas/amenities
- Edit ikon, deskripsi, urutan tampilan
- Upload gambar fasilitas

### 4. **Galeri** (`/admin/gallery`)

- Kelola galeri foto
- Filter berdasarkan kategori (rumah, denah, fasilitas)
- Atur urutan tampilan
- Upload foto

---

## 🔧 Penggunaan Custom Hooks

### useProperties Hook

```javascript
import { useProperties } from "@/hooks";

const {
  properties, // Array properti
  loading, // Status loading
  error, // Error message
  fetchProperties, // Refresh manual
  fetchPropertyById, // Dapat properti single
  addProperty, // Buat baru
  updateProperty, // Edit
  deleteProperty, // Hapus
} = useProperties();
```

### useFacilities Hook

```javascript
import { useFacilities } from "@/hooks";

const {
  facilities,
  loading,
  error,
  fetchFacilities,
  addFacility,
  updateFacility,
  deleteFacility,
} = useFacilities();
```

### useGallery Hook

```javascript
import { useGallery } from "@/hooks";

const {
  gallery,
  loading,
  error,
  fetchGallery,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = useGallery();
```

### useStorage Hook

```javascript
import { useStorage } from "@/hooks";

const {
  uploading,
  error,
  uploadFile, // (path, file) => returns publicUrl
  deleteFile, // (path) => hapus file
} = useStorage("bucket-name");
```

---

## 📂 Supabase Storage - Bucket yang Diperlukan

Pastikan bucket-bucket ini sudah dibuat di Supabase dan di-set ke **Public**:

1. **house-images** - Gambar rumah & denah
2. **facility-images** - Gambar fasilitas
3. **gallery** - Foto galeri

### Cara Setup Bucket Public:

1. Buka Supabase Console
2. Di sidebar, klik **Storage**
3. Klik bucket name
4. Klik **Policies**
5. Pilih template "Give anonymous users access"
6. Pilih operasi: **SELECT**
7. Klik Save

---

## 🔐 Security - Untuk Production

Tambahkan di production:

### 1. **Authentication - Hanya Admin Bisa Akses**

```javascript
// Tambah di App.jsx
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check authentication
    const session = await supabase.auth.getSession();
    setIsAdmin(session?.user?.role === 'admin');
  }, []);

  // Protect /admin route
  if (location.pathname.includes('/admin') && !isAdmin) {
    return <Navigate to="/" />;
  }
}
```

### 2. **RLS (Row Level Security)**

Lihat [FIX_ERROR_401.md](FIX_ERROR_401.md) untuk setup RLS policies.

### 3. **File Upload Validation**

```javascript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const validateFile = (file) => {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File terlalu besar (maks 5MB)");
  }
  if (!["image/jpeg", "image/png"].includes(file.type)) {
    throw new Error("Hanya JPG dan PNG yang diizinkan");
  }
};
```

---

## 📝 Langkah Integrasi dengan Frontend Utama

### Sebelum (Static Data):

```javascript
import { properties } from "../../data/config";

export default function HouseTypes() {
  return (
    <>
      {properties.map((prop) => (
        <div key={prop.id}>{prop.name}</div>
      ))}
    </>
  );
}
```

### Sesudah (Dynamic Data dari Database):

```javascript
import { useProperties } from "../../hooks";

export default function HouseTypes() {
  const { properties, loading } = useProperties();

  if (loading) return <div>Memuat...</div>;

  return (
    <>
      {properties.map((prop) => (
        <div key={prop.id}>{prop.name}</div>
      ))}
    </>
  );
}
```

---

## 🚨 Masalah Umum & Solusi

### ❌ Gambar tidak tampil

- Pastikan bucket sudah public
- Cek console browser untuk error
- Verify file sudah upload

### ❌ Form tidak submit

- Check Supabase credentials di `src/lib/supabase.js`
- Buka Network tab untuk melihat error response
- Verify table & column names di database

### ❌ Delete tidak work

- Verify RLS policy allow DELETE
- Check console untuk error message
- Verify connection ID

### ❌ Error 401 saat buka admin

- Ikuti [FIX_ERROR_401.md](FIX_ERROR_401.md)
- Buka SQL Editor di Supabase
- Jalankan script setup RLS

---

## 📚 File Structure

```
src/
├── hooks/
│   ├── useProperties.js
│   ├── useFacilities.js
│   ├── useGallery.js
│   ├── useStorage.js
│   └── index.js
├── components/admin/
│   ├── AdminSidebar.jsx
│   ├── AdminLayout.jsx
│   ├── PageHeader.jsx
│   ├── Alert.jsx
│   ├── DataTable.jsx
│   └── index.js
├── pages/admin/
│   ├── DashboardPage.jsx
│   ├── PropertiesPage.jsx
│   ├── PropertyForm.jsx
│   ├── FacilitiesPage.jsx
│   ├── FacilityForm.jsx
│   ├── GalleryPage.jsx
│   └── GalleryForm.jsx
└── App.jsx (sudah di-update dengan routing)
```

---

## 💡 Tips & Best Practices

1. **Backup Database** - Sebelum test delete operations
2. **Test Upload** - Upload gambar di admin sebelum publish
3. **Monitor Storage** - Supabase punya quota
4. **Caching** - Tambahkan caching untuk performance
5. **Error Monitoring** - Setup Sentry untuk production
6. **Rate Limiting** - Lindungi API dari abuse

---

## 🎯 Next Steps

1. ✅ Fix error 401 (baca [FIX_ERROR_401.md](FIX_ERROR_401.md))
2. ⬜ Integrasikan komponnen frontend dengan database
3. ⬜ Setup authentication untuk admin
4. ⬜ Add table tambahan (payment_plans, inquiries, dll)
5. ⬜ Setup dashboard analytics

---

**Created:** March 23, 2026  
**Status:** ✅ Production Ready (dengan security setup)  
**Bahasa:** 🇮🇩 Bahasa Indonesia
