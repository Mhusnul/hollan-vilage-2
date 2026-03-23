# 🚀 QUICK START GUIDE - Dasbor Admin Indonesia

Panduan cepat untuk mulai menggunakan admin dashboard dalam bahasa Indonesia.

---

## ⚡ Step 1: Fix Error 401 (PENTING!)

### Error apa?

```
Failed to load resource: the server responded with a status of 401
Error fetching properties/facilities/gallery
```

### Solusi cepat (5 menit):

1. **Buka:** https://app.supabase.com
2. **Pilih project** → Holland Village
3. **Klik:** SQL Editor (di sidebar)
4. **Klik:** New Query (tombol baru)
5. **Copy** script ini:

```sql
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publik bisa baca properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Publik bisa baca facilities" ON facilities FOR SELECT USING (true);
CREATE POLICY "Publik bisa baca gallery" ON gallery FOR SELECT USING (true);
```

6. **Jalankan:** Run (atau Ctrl+Enter)
7. **Tunggu:** Sampai muncul "Success"
8. **Done!** ✅

---

## 🏃 Step 2: Jalankan Aplikasi

```bash
npm run dev
```

Buka: **http://localhost:5173/admin**

---

## 🎯 Step 3: Gunakan Fitur

### 📍 Menu Utama

- **Dasbor** - Overview statistik
- **Properti** - Kelola tipe rumah
- **Fasilitas** - Kelola fasilitas
- **Galeri** - Kelola foto

### 👉 Cara Tambah Properti

1. Klik menu **Properti**
2. Klik tombol **[+] Tambah Properti**
3. Isi form:
   - Nama Properti: "Tipe 60/96"
   - Luas Tanah: "60 m²"
   - Luas Bangunan: "96 m²"
   - Kamar Tidur: 3
   - Lantai: 2
   - Harga: 659000000
   - DP: 65900000
   - KPR: 588100000
4. Upload 2 gambar (utama + denah)
5. Tambah spesifikasi (opsional)
6. Klik **Simpan Properti**

### 👉 Cara Edit Properti

1. Lihat tabel properti
2. Klik tombol **✏️ Edit** (pensil)
3. Update data
4. Klik **Simpan Properti**

### 👉 Cara Hapus Properti

1. Klik tombol **🗑️ Hapus** (trash)
2. Klik **OK** di dialog konfirmasi
3. Done! ✅

### 👉 Cara Tambah Fasilitas

1. Klik menu **Fasilitas**
2. Klik **[+] Tambah Fasilitas**
3. Isi:
   - Nama: "Security 24 Jam"
   - Deskripsi: "Tim keamanan profesional..."
   - Ikon: "lock" (pilih dari dropdown)
   - Urutan: 1
4. Upload gambar
5. Klik **Simpan Fasilitas**

### 👉 Cara Tambah Foto Galeri

1. Klik menu **Galeri**
2. Klik **[+] Tambah Foto**
3. Isi:
   - Judul: "Ruang Tamu Tipe 60/96"
   - Deskripsi: (opsional)
   - Kategori: "Rumah" / "Denah" / "Fasilitas"
   - Urutan: 1
4. Upload foto
5. Klik **Simpan Item Galeri**

---

## 📊 Icons Tersedia

Untuk fasilitas, pilih dari icon ini:

- lock - Kunci/Keamanan
- door - Pintu/Gate
- home - Rumah
- trees - Pohon/Taman
- dumbbell - Gym
- droplets - Air/Kolam
- shield - Perlindungan
- zap - Listrik/Energi

---

## ❓ FAQ

**Q: Gambar tidak muncul?**
A: Pastikan Supabase buckets (house-images, facility-images, gallery) sudah public.

**Q: Form tidak bisa submit?**
A: Cek internet connection. Buka console (F12) untuk melihat error.

**Q: Data tidak muncul di tabel?**
A: Jalankan SETUP_RLS.sql dulu. Lihat di atas.

**Q: Mau lihat documentation lebih detail?**
A: Baca `ADMIN_DASHBOARD_GUIDE.md` di root project.

---

## 🎨 UI Cheat Sheet

| Tombol     | Fungsi               |
| ---------- | -------------------- |
| [+] Tambah | Buat baru            |
| ✏️ Edit    | Edit item            |
| 🗑️ Hapus   | Hapus item           |
| ▼ Chevron  | Lihat detail lengkap |
| ← Kembali  | Kembali ke tabel     |

---

## 📱 Akses di Mobile

Admin dashboard sudah responsive:

1. Buka di smartphone: http://localhost:5173/admin
2. Menu will collapse (hamburger menu)
3. Tap ☰ untuk buka/tutup menu

---

## ✅ Checklist Pertama Kali

- [ ] Fix error 401 (jalankan SETUP_RLS.sql)
- [ ] Reload page - pastikan data tampil
- [ ] Coba tambah 1 properti
- [ ] Upload gambar
- [ ] Edit properti
- [ ] Hapus properti test
- [ ] Coba fitur lain

---

## 🆘 Emergency Fix

**Jika semua error:**

```bash
# Clear cache
Ctrl+Shift+Delete

# Refresh
F5

# Reload dari server
Ctrl+F5
```

---

## 📞 Support

Masalah?

1. Baca: `FIX_ERROR_401.md`
2. Baca: `ADMIN_DASHBOARD_GUIDE.md`
3. Cek browser console: F12 → Console

---

**Ready? Let's go! 🚀**
