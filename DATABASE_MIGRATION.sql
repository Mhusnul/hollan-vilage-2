-- ============================================
-- DATABASE MIGRATION - HOLLAND VILLAGE
-- Jalankan script ini di Supabase SQL Editor
-- Untuk update schema agar bisa replace config.js
-- ============================================

-- 🔴 PENTING! Bagian yang HARUS dijalankan:
-- 1. Section 5 - UPDATE CONTENT_SECTIONS TABLE
-- 2. Section 6 - UPDATE SALES_CONTACTS TABLE (UNTUK FIX ERROR 400)
-- 
-- ⭕ Bagian yang OPTIONAL/BOLEH LEWAT dulu:
-- 1. Section 1 - UPDATE PAYMENT_PLANS TABLE (opsional)
-- 2. Section 2 - CREATE BOOKING_FEES TABLE (opsional)
-- 3. Section 3 - CREATE PROMOTIONS TABLE (opsional)
-- 4. Section 4 - CREATE TESTIMONIALS TABLE (opsional)
-- 5. Section 7 - CREATE BUILDING_SPECS TABLE (opsional)
-- 6. Section 8 - UPDATE SETTINGS TABLE (opsional)

-- ============================================
-- 1. UPDATE PAYMENT_PLANS TABLE
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Tambah kolom untuk booking fee dan all-in price
-- ALTER TABLE payment_plans ADD COLUMN booking_fee NUMERIC DEFAULT 0;
-- ALTER TABLE payment_plans ADD COLUMN all_in_price NUMERIC DEFAULT 0;
-- ALTER TABLE payment_plans ADD COLUMN property_type TEXT; -- untuk reference (Type 60/116, dll)

-- ============================================
-- 2. CREATE BOOKING_FEES TABLE
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Tabel terpisah untuk fee per tipe properti
-- CREATE TABLE booking_fees (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   property_type TEXT NOT NULL UNIQUE, -- "Type 60/116", "Type 45/72", dll
--   booking_fee NUMERIC NOT NULL,
--   all_in_price NUMERIC,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );
-- 
-- -- Enable RLS
-- ALTER TABLE booking_fees ENABLE ROW LEVEL SECURITY;
-- 
-- -- Policies
-- CREATE POLICY "Publik bisa baca booking_fees" 
-- ON booking_fees FOR SELECT USING (true);
-- 
-- CREATE POLICY "Publik bisa buat booking_fees" 
-- ON booking_fees FOR INSERT WITH CHECK (true);

-- ============================================
-- 3. CREATE PROMOTIONS TABLE
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Tabel untuk promo/penawaran khusus
-- CREATE TABLE promotions (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   title TEXT NOT NULL,
--   description TEXT,
--   promo_type TEXT NOT NULL, -- "fee_waiver", "discount", "cashback", "special_offer"
--   value TEXT, -- Bisa "FREE", persentase, atau nominal
--   active BOOLEAN DEFAULT true,
--   valid_from TIMESTAMP,
--   valid_until TIMESTAMP,
--   display_order INT DEFAULT 0,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );
-- 
-- -- Enable RLS
-- ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
-- 
-- -- Policies
-- CREATE POLICY "Publik bisa baca promotions" 
-- ON promotions FOR SELECT USING (active = true);
-- 
-- CREATE POLICY "Publik bisa buat promotions" 
-- ON promotions FOR INSERT WITH CHECK (true);
-- 
-- CREATE POLICY "Publik bisa ubah promotions" 
-- ON promotions FOR UPDATE USING (true) WITH CHECK (true);

-- ============================================
-- 4. CREATE TESTIMONIALS TABLE
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Tabel untuk review/testimoni pelanggan
-- CREATE TABLE testimonials (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   customer_name TEXT NOT NULL,
--   customer_photo_url TEXT,
--   property_type TEXT, -- Tipe rumah yang dibeli
--   message TEXT NOT NULL,
--   rating INT CHECK (rating >= 1 AND rating <= 5),
--   verified BOOLEAN DEFAULT false,
--   display_order INT DEFAULT 0,
--   active BOOLEAN DEFAULT true,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );
-- 
-- -- Enable RLS
-- ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
-- 
-- -- Policies
-- CREATE POLICY "Publik bisa baca testimonials" 
-- ON testimonials FOR SELECT USING (active = true);
-- 
-- CREATE POLICY "Publik bisa buat testimonials" 
-- ON testimonials FOR INSERT WITH CHECK (true);

-- ============================================
-- 5. UPDATE CONTENT_SECTIONS TABLE STRUCTURE
-- 🔴 PENTING! HARUS DIJALANKAN!
-- ============================================
-- Pastikan fields ada untuk semua content
ALTER TABLE content_sections ADD COLUMN IF NOT EXISTS section_key TEXT UNIQUE; -- "company_info", "project_info", dll
ALTER TABLE content_sections ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE content_sections ADD COLUMN IF NOT EXISTS meta_data JSONB; -- untuk data kompleks

-- Existing policies untuk content_sections
CREATE POLICY "Publik bisa baca content_sections" 
ON content_sections FOR SELECT USING (true);

-- ============================================
-- 6. UPDATE SALES_CONTACTS TABLE
-- 🔴 PENTING! HARUS DIJALANKAN! (untuk fix error 400)
-- ============================================
-- Pastikan fields lengkap untuk agents
ALTER TABLE sales_contacts ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE sales_contacts ADD COLUMN IF NOT EXISTS position TEXT DEFAULT 'Sales Agent'; -- Jabatan
ALTER TABLE sales_contacts ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;

-- Policies
CREATE POLICY "Publik bisa baca sales_contacts" 
ON sales_contacts FOR SELECT USING (active = true);

-- ============================================
-- 7. CREATE BUILDING_SPECS TABLE (OPTIONAL)
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Tabel terpisah untuk spesifikasi bangunan
-- CREATE TABLE building_specs (
--   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--   spec_key TEXT NOT NULL, -- "foundation", "structure", "walls", dll
--   spec_value TEXT NOT NULL, -- Nilai spesifikasi
--   spec_category TEXT, -- Kategori (foundation, structure, finishing, etc)
--   display_order INT DEFAULT 0,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );
-- 
-- -- Enable RLS
-- ALTER TABLE building_specs ENABLE ROW LEVEL SECURITY;
-- 
-- -- Policies
-- CREATE POLICY "Publik bisa baca building_specs" 
-- ON building_specs FOR SELECT USING (true);

-- ============================================
-- 8. UPDATE SETTINGS TABLE - Add Default Values
-- ⭕ OPTIONAL - Bisa dilewat untuk sekarang
-- ============================================
-- Insert default settings untuk company info
-- INSERT INTO settings (key, value) VALUES
--   ('company_name', 'PT. PUSPA AGRA PROPERTI'),
--   ('company_short_name', 'Holland Village Sukabumi'),
--   ('project_name', 'Holland Village Sukabumi'),
--   ('project_location', 'Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat'),
--   ('project_area_size', '21.000 M²'),
--   ('project_total_units', '135'),
--   ('project_status', 'On Progress'),
--   ('company_phone', '+62-897-6297-053'),
--   ('company_email', 'marketinghollandvillage@gmail.com'),
--   ('company_whatsapp', 'https://wa.me/628976297053');

-- ============================================
-- DONE!
-- ============================================
-- Schema update selesai!
-- 
-- 🔴 PENTING: Jalankan HANYA bagian yang TIDAK dikomen:
-- - Section 5: UPDATE CONTENT_SECTIONS TABLE
-- - Section 6: UPDATE SALES_CONTACTS TABLE (FIX untuk error 400!)
-- 
-- ⭕ Abaikan/lewat yang sudah dikomen (section 1,2,3,4,7,8)
-- 
-- Langkah berikutnya:
-- 1. Copy hanya bagian yang TIDAK dikomen
-- 2. Paste ke Supabase SQL Editor
-- 3. Jalankan query
-- 4. Selesai!
