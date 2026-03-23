-- ============================================
-- SEED DATA - HOLLAND VILLAGE
-- Import data dari config.js ke database
-- Jalankan setelah DATABASE_MIGRATION.sql
-- ============================================

-- ============================================
-- 1. PROPERTIES - House Types
-- ============================================
INSERT INTO properties (name, land_area, building_area, bedroom, floor, price_start_from, dp_amount, kpr_amount, room_details, specification, image_url, floor_plan_url, created_at, updated_at) VALUES

-- Type 60/116
(
  'Type 60/116',
  60,
  116,
  3,
  2,
  759000000,
  75900000,
  673100000,
  '3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu',
  '["Desain modern 1 lantai","Dapur semi terbuka dengan fungsi optimal","Garasi 1 mobil dengan carport","Halaman depan dan belakang","Pondasi: Tapak - Cakar Ayam","Struktur: Beton Bertulang","Dinding: Bata Ringan, Plester & Cat","Atap: Genteng Keramik/Karmuri Flat","Rangka Atap: Baja Ringan","Plafon: Gypsum, GRC/Hollow","Lantai: Granit 60x60","Listrik: 1300 Watt"]'::jsonb,
  'https://via.placeholder.com/400x300?text=Type+60%2F116',
  'https://via.placeholder.com/400x300?text=Denah+60%2F116',
  NOW(),
  NOW()
),

-- Type 60/96
(
  'Type 60/96',
  60,
  96,
  3,
  2,
  659000000,
  65900000,
  588100000,
  '3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur',
  '["Desain modern minimalis 1 lantai","Dapur semi terbuka yang fungsional","Garasi 1 mobil dengan carport grass block","Halaman yang cukup untuk kebutuhan keluarga","Pondasi: Tapak - Cakar Ayam","Struktur: Beton Bertulang","Dinding: Bata Ringan, Plester & Cat","Kusen: Alumunium & Kayu","Atap: Genteng Keramik/Karmuri Flat","Rangka Atap: Baja Ringan","Lantai: Granit 60x60","Listrik: 1300 Watt"]'::jsonb,
  'https://via.placeholder.com/400x300?text=Type+60%2F96',
  'https://via.placeholder.com/400x300?text=Denah+60%2F96',
  NOW(),
  NOW()
),

-- Type 45/72
(
  'Type 45/72',
  45,
  72,
  2,
  2,
  489000000,
  48900000,
  436600000,
  '2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur',
  '["Desain modern kompak 1 lantai","Dapur semi terbuka dengan layout efisien","Garasi 1 mobil dengan carport grass block","Halaman yang optimal untuk ruang terbuka","Pondasi: Tapak - Cakar Ayam","Struktur: Beton Bertulang","Dinding: Bata Ringan, Plester & Cat","Kusen: Alumunium","Atap: Genteng Keramik/Karmuri Flat","Plafon: Gypsum, GRC/Hollow","Lantai: Granit 60x60","Closet: Duduk","Air Bersih: Sumur Bor","Listrik: 1300 Watt"]'::jsonb,
  'https://via.placeholder.com/400x300?text=Type+45%2F72',
  'https://via.placeholder.com/400x300?text=Denah+45%2F72',
  NOW(),
  NOW()
),

-- Type 36/72
(
  'Type 36/72',
  36,
  72,
  2,
  2,
  419000000,
  41900000,
  374600000,
  '2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur',
  '["Desain modern compact tipe terkecil","Dapur compact dengan fungsi lengkap","Garasi 1 mobil dengan carport grass block","Ruang yang sangat efisien untuk penghuni","Pondasi: Tapak - Cakar Ayam","Struktur: Beton Bertulang","Dinding: Bata Ringan, Plester & Cat","Kusen: Alumunium & Kayu","Atap: Genteng Keramik/Karmuri Flat","Rangka Atap: Baja Ringan","Lantai Umum: Granit 60x60","Lantai Kamar Mandi: Keramik","Dapur: Zinc Stainles Steel","Closet: Duduk","Air Bersih: Sumur Bor","Listrik: 1300 Watt"]'::jsonb,
  'https://via.placeholder.com/400x300?text=Type+36%2F72',
  'https://via.placeholder.com/400x300?text=Denah+36%2F72',
  NOW(),
  NOW()
);

-- ============================================
-- 2. FACILITIES
-- ============================================
INSERT INTO facilities (name, description, icon, image_url, display_order, created_at, updated_at) VALUES

('Security 24 Jam', 'Tim keamanan profesional tersedia 24/7 untuk ketenangan Anda', 'lock', 'https://via.placeholder.com/300x200?text=Security', 1, NOW(), NOW()),

('One Gate System', 'Sistem gerbang terpadu dengan akses terkontrol dan modern', 'door', 'https://via.placeholder.com/300x200?text=One+Gate', 2, NOW(), NOW()),

('Masjid', 'Tempat ibadah yang megah dan nyaman untuk semua penghuni', 'building', 'https://via.placeholder.com/300x200?text=Masjid', 3, NOW(), NOW()),

('Taman Bermain Anak', 'Area bermain yang aman dan dilengkapi peralatan modern', 'zap', 'https://via.placeholder.com/300x200?text=Taman+Bermain', 4, NOW(), NOW()),

('Jogging Track', 'Jalur jogging sepanjang 2 km dengan pemandangan asri', 'run', 'https://via.placeholder.com/300x200?text=Jogging+Track', 5, NOW(), NOW()),

('Area Komersial', 'Pusat perbelanjaan dan layanan bisnis dalam kompleks', 'shopping', 'https://via.placeholder.com/300x200?text=Area+Komersial', 6, NOW(), NOW());

-- ============================================
-- 3. GALLERY
-- ============================================
INSERT INTO gallery (title, image_url, category, description, display_order, created_at, updated_at) VALUES

-- House Types
('Type 60/116', 'https://via.placeholder.com/500x400?text=Type+60%2F116', 'house', 'Tipe rumah 60/116', 1, NOW(), NOW()),
('Type 60/96', 'https://via.placeholder.com/500x400?text=Type+60%2F96', 'house', 'Tipe rumah 60/96', 2, NOW(), NOW()),
('Type 45/72', 'https://via.placeholder.com/500x400?text=Type+45%2F72', 'house', 'Tipe rumah 45/72', 3, NOW(), NOW()),
('Type 36/72', 'https://via.placeholder.com/500x400?text=Type+36%2F72', 'house', 'Tipe rumah 36/72', 4, NOW(), NOW()),

-- Floor Plans
('Denah Type 60/116', 'https://via.placeholder.com/500x400?text=Denah+60%2F116', 'floorplan', 'Denah tipe 60/116', 5, NOW(), NOW()),
('Denah Type 60/96', 'https://via.placeholder.com/500x400?text=Denah+60%2F96', 'floorplan', 'Denah tipe 60/96', 6, NOW(), NOW()),
('Denah Type 45/72', 'https://via.placeholder.com/500x400?text=Denah+45%2F72', 'floorplan', 'Denah tipe 45/72', 7, NOW(), NOW()),
('Denah Type 36/72', 'https://via.placeholder.com/500x400?text=Denah+36%2F72', 'floorplan', 'Denah tipe 36/72', 8, NOW(), NOW()),

-- Facilities
('One Gate System', 'https://via.placeholder.com/500x400?text=One+Gate', 'facility', 'Sistem keamanan gerbang', 9, NOW(), NOW()),
('Security 24 Jam', 'https://via.placeholder.com/500x400?text=Security', 'facility', 'Keamanan 24 jam', 10, NOW(), NOW()),
('Masjid', 'https://via.placeholder.com/500x400?text=Masjid', 'facility', 'Fasilitas ibadah', 11, NOW(), NOW());

-- ============================================
-- 4. BOOKING FEES
-- ============================================
INSERT INTO booking_fees (property_type, booking_fee, all_in_price, created_at, updated_at) VALUES

('Type 60/116', 2500000, 10000000, NOW(), NOW()),
('Type 60/96', 2500000, 5000000, NOW(), NOW()),
('Type 45/72', 1000000, 3500000, NOW(), NOW()),
('Type 36/72', 1000000, 2500000, NOW(), NOW());

-- ============================================
-- 5. PROMOTIONS
-- ============================================
INSERT INTO promotions (title, description, promo_type, value, active, display_order, created_at, updated_at) VALUES

('FREE BIAYA BPHTB', 'Gratis biaya Bea Perolehan Hak atas Tanah dan Bangunan', 'fee_waiver', 'FREE', true, 1, NOW(), NOW()),

('FREE BIAYA AJBB', 'Gratis biaya Asuransi Jamihanan Bivak Bangunan', 'fee_waiver', 'FREE', true, 2, NOW(), NOW()),

('FREE BIAYA KPR', 'Gratis biaya asuransi dan administrasi KPR', 'fee_waiver', 'FREE', true, 3, NOW(), NOW()),

('DP Ringan', 'Cicilan DP mulai dari Rp 41.900.000', 'special_offer', 'Mulai dari Rp 41.900.000', true, 4, NOW(), NOW()),

('Suku Bunga Fixed', 'Suku bunga 5.99% fixed 1 tahun', 'special_offer', '5.99% Fixed 1 Tahun', true, 5, NOW(), NOW());

-- ============================================
-- 6. PAYMENT PLANS
-- ============================================
INSERT INTO payment_plans (title, description, down_payment_percent, interest_rate, installation_period, benefits, booking_fee, all_in_price, property_type, created_at, updated_at) VALUES

('Cash', 'Pembayaran tunai dengan bonus khusus', 0, 0, 0, '["Diskon khusus cash","Perpanjang booking max 1 bulan"]'::jsonb, 0, 0, NULL, NOW(), NOW()),

('KPR', 'Kredit Pemilikan Rumah dengan bunga kompetitif', 10, 5.99, 20, '["Approval hingga senilai harga property","Interest rate 5.99% fixed 1 tahun","Proses cepat dan mudah","Free asuransi KPR dan biaya administrasi"]'::jsonb, 2500000, 5000000, 'Type 60/96', NOW(), NOW()),

('Transfer', 'Pembayaran transfer langsung ke rekening developer', 0, 0, 0, '["Verifikasi otomatis","Proses cepat setelah verifikasi"]'::jsonb, 2500000, 5000000, NULL, NOW(), NOW());

-- ============================================
-- 7. CONTENT SECTIONS
-- ============================================
INSERT INTO content_sections (section_key, title, content, image_url, order, description, created_at, updated_at) VALUES

('company_info', 'PT. PUSPA AGRA PROPERTI', 'PT. PUSPA AGRA PROPERTI adalah developer perumahan terpercaya yang menghadirkan hunian berkualitas dengan harga terjangkau dan lokasi strategis di Kota Sukabumi.', NULL, 1, 'Informasi perusahaan', NOW(), NOW()),

('company_vision', 'Visi', 'Menjadi developer properti terdepan di Sukabumi yang menghadirkan hunian berkualitas dengan harga terjangkau.', NULL, 2, 'Visi perusahaan', NOW(), NOW()),

('company_mission', 'Misi', '', NULL, 3, 'Misi perusahaan', NOW(), NOW()),

('project_info', 'Holland Village Sukabumi', 'Holland Village Sukabumi adalah perumahan modern yang dirancang untuk memenuhi kebutuhan keluarga modern dengan fasilitas lengkap dan lokasi strategis. Setiap detail desain telah dipikirkan dengan matang untuk menciptakan lingkungan hunian yang nyaman dan berkelanjutan.', NULL, 4, 'Informasi proyek', NOW(), NOW()),

('building_specs', 'Spesifikasi Bangunan', 'Semua bangunan di Holland Village menggunakan material berkualitas dengan standar modern', NULL, 5, 'Detail spesifikasi bangunan', NOW(), NOW());

-- ============================================
-- 8. SALES CONTACTS (Agents)
-- ============================================
INSERT INTO sales_contacts (name, phone, whatsapp_link, email, photo_url, position, active, created_at, updated_at) VALUES

('Agent 1', '+62-897-6297-053', 'https://wa.me/628976297053', 'agent1@holland.com', 'https://via.placeholder.com/200x200?text=Agent+1', 'Sales Agent', true, NOW(), NOW()),

('Agent 2', '+62-812-3456-789', 'https://wa.me/628123456789', 'agent2@holland.com', 'https://via.placeholder.com/200x200?text=Agent+2', 'Sales Agent', true, NOW(), NOW());

-- ============================================
-- 9. SETTINGS
-- ============================================
-- Settings sudah di-insert di migration, jika perlu tambah:
INSERT INTO settings (key, value, created_at, updated_at) VALUES
('google_maps_link', 'https://maps.google.com/?q=Holland+Village+Sukabumi', NOW(), NOW()),
('facebook_url', 'https://facebook.com/hollandvillageskb', NOW(), NOW()),
('instagram_url', 'https://instagram.com/hollandvillage.skb', NOW(), NOW());

-- ============================================
-- SELESAI!
-- ============================================
-- Data sudah diimport ke database!
-- Langkah berikutnya:
-- 1. Create custom hooks untuk fetch data
-- 2. Update landing page components
-- 3. Remove imports dari config.js
