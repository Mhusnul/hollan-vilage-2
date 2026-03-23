# Database Migration & Setup Guide

## 📋 Ringkasan Perubahan

Database akan diupdate dari **static data (config.js) → dynamic data (Supabase)**

### Tabel yang ditambah/diupdate:

- ✅ `payment_plans` → tambah booking_fee, all_in_price
- ✅ `booking_fees` (BARU) → fee per tipe properti
- ✅ `promotions` (BARU) → untuk promo/penawaran
- ✅ `testimonials` (BARU) → review pelanggan
- ✅ `building_specs` (BARU) → spesifikasi bangunan
- ✅ `content_sections` → tambah section_key, description
- ✅ `sales_contacts` → tambah photo_url, position, active
- ✅ `settings` → default values untuk company info

---

## 🚀 Cara Setup (3 Langkah Mudah)

### **Langkah 1: Jalankan Migration Script**

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pergi ke **SQL Editor**
3. **Klik "New Query"**
4. Copy file: [DATABASE_MIGRATION.sql](DATABASE_MIGRATION.sql)
5. Paste ke SQL Editor
6. **Click "Run" atau tekan Ctrl+Enter**
7. Tunggu sampai selesai (tidak ada error)

✅ **Migration Done!**

---

### **Langkah 2: Jalankan Seed Data Script**

1. Di **SQL Editor**, klik **"New Query"** lagi
2. Copy file: [SEED_DATA.sql](SEED_DATA.sql)
3. Paste ke SQL Editor
4. **Click "Run"**
5. Tunggu sampai selesai

✅ **Data imported!**

---

### **Langkah 3: Verify di Supabase Console**

Cek apakah data sudah masuk:

1. **Buka Table Editor** di Supabase
2. Cek table:
   - `properties` → harus 4 house types
   - `facilities` → harus 6 fasilitas
   - `gallery` → harus 11 galeri images
   - `booking_fees` → harus 4 entries
   - `promotions` → harus 5 promo
   - `payment_plans` → updated dengan 3 plan

Jika semua ada → **Ready untuk next step!** ✅

---

## 📝 Catatan Penting

### Admin Dashboard Update

Untuk admin panel, perlu sedikit tweak di form:

**PropertyForm.jsx:**

- Specification field akan save as JSON array ✅ (sudah benar)

**FacilityForm.jsx:**

- Icon dropdown sudah ada ✅
- Display order sudah ada ✅

**GalleryForm.jsx:**

- Category dropdown (house, floorplan, facility) ✅
- Display order ✅

### Storage Images

Untuk sekarang menggunakan placeholder images dari Supabase:

```
https://via.placeholder.com/400x300?text=Type+60%2F116
```

**Nanti bisa update images via admin dashboard** dengan mengupload ke storage bucket.

---

## ✨ Next Steps (Setelah Setup Database)

1. **Create new hooks:**
   - `useContentSections()` - untuk content dinamis
   - `usePaymentPlans()` - untuk payment info
   - `useSalesContacts()` - untuk agents
   - `usePromotions()` - untuk promo

2. **Update landing page components:**
   - `HouseTypes.jsx` → fetch dari `useProperties`
   - `Facilities.jsx` → fetch dari `useFacilities`
   - `Gallery.jsx` → fetch dari `useGallery`
   - `Pricing.jsx` → fetch dari `usePaymentPlans`
   - `ContactForm.jsx` → fetch dari `useSalesContacts`
   - `About.jsx` → fetch dari `useContentSections`

3. **Remove config.js imports** dari components

4. **Test semua halaman:**
   - Landing page should work the same, tapi data dari DB ✅
   - Admin dashboard bisa manage semua data ✅

---

## 🔄 Rollback (Jika Ada Masalah)

Jika perlu rollback, jalankan:

```sql
-- Drop tables baru
DROP TABLE IF EXISTS booking_fees CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS building_specs CASCADE;

-- Revert payment_plans (jika perlu)
ALTER TABLE payment_plans DROP COLUMN IF EXISTS booking_fee;
ALTER TABLE payment_plans DROP COLUMN IF EXISTS all_in_price;
ALTER TABLE payment_plans DROP COLUMN IF EXISTS property_type;

-- Revert content_sections
ALTER TABLE content_sections DROP COLUMN IF EXISTS section_key;
ALTER TABLE content_sections DROP COLUMN IF EXISTS description;
ALTER TABLE content_sections DROP COLUMN IF EXISTS meta_data;
```

---

## ❓ Troubleshooting

### Error: "policy already exists"

✅ Normal - means policies sudah ada. Lanjutkan aja.

### Error: "uuid_generate_v4()"

✅ Pasang extension dulu:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### Error: "Column already exists"

✅ Remove `ALTER TABLE` yang duplicate di migration.

### Data tidak muncul di admin

✅ Restart dev server: `npm run dev`
✅ Refresh browser: F5

---

## 📞 Support

Jika ada error saat migration, share screenshot error ke sini dan saya bantu fix!

Siap? 🚀

Mari jalankan migration sekarang!
