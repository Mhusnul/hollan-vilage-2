-- SETUP ROW LEVEL SECURITY (RLS) UNTUK HOLLAND VILLAGE
-- Jalankan script ini di Supabase SQL Editor

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
-- 2. CREATE POLICIES untuk SELECT (PUBLIC READ)
-- ============================================

-- Properties - siapa saja bisa baca
CREATE POLICY "Publik bisa baca properties" 
ON properties FOR SELECT 
USING (true);

-- Facilities - siapa saja bisa baca
CREATE POLICY "Publik bisa baca facilities" 
ON facilities FOR SELECT 
USING (true);

-- Gallery - siapa saja bisa baca
CREATE POLICY "Publik bisa baca gallery" 
ON gallery FOR SELECT 
USING (true);

-- Payment Plans - siapa saja bisa baca
CREATE POLICY "Publik bisa baca payment plans" 
ON payment_plans FOR SELECT 
USING (true);

-- Content Sections - siapa saja bisa baca
CREATE POLICY "Publik bisa baca content sections" 
ON content_sections FOR SELECT 
USING (true);

-- Settings - siapa saja bisa baca
CREATE POLICY "Publik bisa baca settings" 
ON settings FOR SELECT 
USING (true);

-- ============================================
-- 3. OPTIONAL: CREATE ADMIN POLICIES
-- ============================================
-- Uncomment jika ingin setup authentication admin
-- Ganti "auth.uid() = 'ADMIN_ID_HERE'" dengan user ID admin

-- CREATE POLICY "Admin bisa ubah properties" 
-- ON properties FOR UPDATE 
-- USING (auth.uid() = 'admin-user-id')
-- WITH CHECK (auth.uid() = 'admin-user-id');

-- CREATE POLICY "Admin bisa hapus properties" 
-- ON properties FOR DELETE 
-- USING (auth.uid() = 'admin-user-id');
