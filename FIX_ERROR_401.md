# 🔧 FIX ERROR 401 - Row Level Security (RLS)

## ❌ Masalah

Ketika mengakses admin dashboard, muncul error:

```
Failed to load resource: the server responded with a status of 401
Error fetching properties/facilities/gallery: Object
```

**Penyebab:** Row Level Security (RLS) policy tidak mengizinkan anonymous user membaca dari database.

---

## ✅ Solusi - Setup RLS di Supabase

### **Step 1: Buka Supabase Console**

1. Buka [https://app.supabase.com](https://app.supabase.com)
2. Login dengan akun Anda
3. Pilih project "Holland Village"

### **Step 2: Buka SQL Editor**

1. Di sidebar kiri, klik **SQL Editor**
2. Klik **New Query** (tombol baru/plus)

### **Step 3: Copy & Jalankan Script**

Copy script berikut ke SQL Editor:

```sql
-- SETUP ROW LEVEL SECURITY (RLS) UNTUK HOLLAND VILLAGE

-- ============================================
-- 1. ENABLE RLS untuk semua table
-- ============================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. CREATE POLICIES - Public Read Access
-- ============================================

-- Properties - Publik bisa baca
CREATE POLICY "Publik bisa baca properties"
ON properties FOR SELECT
USING (true);

-- Facilities - Publik bisa baca
CREATE POLICY "Publik bisa baca facilities"
ON facilities FOR SELECT
USING (true);

-- Gallery - Publik bisa baca
CREATE POLICY "Publik bisa baca gallery"
ON gallery FOR SELECT
USING (true);

-- Payment Plans - Publik bisa baca
CREATE POLICY "Publik bisa baca payment plans"
ON payment_plans FOR SELECT
USING (true);

-- Content Sections - Publik bisa baca
CREATE POLICY "Publik bisa baca content sections"
ON content_sections FOR SELECT
USING (true);

-- Settings - Publik bisa baca
CREATE POLICY "Publik bisa baca settings"
ON settings FOR SELECT
USING (true);
```

### **Step 4: Jalankan Query**

1. Klik tombol **Run** (atau Ctrl+Enter)
2. Tunggu sampai query selesai
3. Jika berhasil, akan muncul notifikasi "Success"

---

## 📊 Verifikasi - Cek di Authentication Policies

Untuk memastikan RLS sudah di-setup dengan benar:

1. Di sidebar, klik **Authentication**
2. Klik **Policies**
3. Cari table "properties", "facilities", "gallery"
4. Pastikan ada policy dengan nama "Publik bisa baca..." untuk setiap table

---

## 🔍 Tes di Browser

1. Buka browser dev tools (F12)
2. Buka tab **Console**
3. Refresh page admin
4. Pastikan error 401 sudah hilang
5. Data seharusnya sudah tampil di table

---

## ⚠️ Catatan Security

**Konfigurasi saat ini:** Publik bisa **membaca** semua data, tapi tidak bisa **write/edit/delete**.

Untuk production yang lebih aman, tambahkan authentication:

```sql
-- Hanya authenticated admin yang bisa edit/delete
CREATE POLICY "Admin bisa ubah properties"
ON properties FOR UPDATE
USING (auth.role() = 'authenticated' AND auth.uid() = 'ADMIN_USER_ID');

CREATE POLICY "Admin bisa hapus properties"
ON properties FOR DELETE
USING (auth.role() = 'authenticated' AND auth.uid() = 'ADMIN_USER_ID');
```

---

## 🆘 Jika Masih Error

**Opsi A: Disable RLS (Tidak Recommended - Hanya Development)**

```sql
ALTER TABLE properties DISABLE ROW LEVEL SECURITY;
ALTER TABLE facilities DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
```

**Opsi B: Check Bucket Policies**

Untuk image uploads, pastikan bucket juga public:

1. Di sidebar, klik **Storage**
2. Klik bucket (house-images, facility-images, gallery)
3. Klik **Edit policies**
4. Ensure "public access" adalah **Enabled**

**Opsi C: Clear Browser Cache**

```bash
# Ctrl+Shift+Delete (Windows/Linux)
# Cmd+Shift+Delete (Mac)
```

---

## 📝 Step-by-Step Video Alternative

Jika confusion dengan SQL:

1. Buka Supabase Console
2. Klik table "properties"
3. Klik **RLS** toggle (on/off icon di atas table)
4. Klik **Create policy for SELECT**
5. Pilih template "Give access to everyone"
6. Klik Save
7. Repeat untuk table lain (facilities, gallery, dll)

---

**Status:** ✅ Fixed
**Tanggal:** March 23, 2026
