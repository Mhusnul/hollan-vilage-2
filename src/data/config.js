// Import images
import logoImg from "../assets/logo.jpeg";
import type6096Img from "../assets/type-60-96.png";
import type4572Img from "../assets/type-45-72.png";
import type3672Img from "../assets/type-36-72.png";
import type60Img from "../assets/type60.png";
import type45Img from "../assets/type45.png";
import type36Img from "../assets/type36.png";
import denah60116Img from "../assets/denah-type-60-116.png";
import denah6096Img from "../assets/denah-type-60-96.png";
import denah4572Img from "../assets/denah-type-45-75.png";
import denah3672Img from "../assets/denah-type-36-72.png";
import denahPerumahanImg from "../assets/denah-holland-village.png";
import fasilitasSecurityImg from "../assets/fasilitas_security.jpg";
import fasilitas0neGateImg from "../assets/bg1.jpeg";
import fasilitas_masjidImg from "../assets/fasilitas_masjid.jpg";
import fasilitas_tamanImg from "../assets/fasilitas_taman.jpg";
import fasilitas_joggingtrackImg from "../assets/fasilitas_joggingtrack.jpg";
import background2Img from "../assets/background2.jpg";

// Company Information
export const company = {
  name: "PT. PUSPA AGRA PROPERTI",
  companyNameShort: "Holland Village Sukabumi",
  logo: logoImg,
  tagline: "Impian Anda Menjadi Kenyataan",
  description:
    "PT. PUSPA AGRA PROPERTI adalah developer perumahan terpercaya yang menghadirkan hunian berkualitas dengan konsep modern tropis, harga terjangkau, dan lokasi strategis di Kota Sukabumi.",
  yearEstablished: 2025,
  vision:
    "Menjadi developer properti terdepan di Sukabumi yang menghadirkan hunian asri berkualitas dengan harga terjangkau.",
  mission: [
    "Menyediakan properti berkualitas dengan standar arsitektur modern tropis",
    "Memberikan nilai investasi dan kenyamanan terbaik kepada pelanggan",
    "Membangun komunitas penghuni yang sehat, aman, dan harmonis",
    "Komitmen tinggi pada keberlanjutan lingkungan dan ruang terbuka hijau",
  ],
};

// Housing Project Information
export const project = {
  name: "Holland Village Sukabumi",
  location:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  fullAddress:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  areaSize: "21.638 m²",
  totalUnits: 135,
  greenSpacePercentage: "17.61%",
  status: "On Progress",
  description:
    "Holland Village Sukabumi adalah kawasan hunian cluster eksklusif berkonsep Modern Tropical & Green Living yang dirancang untuk keluarga modern. Dilengkapi fasilitas lengkap, sistem keamanan 24 jam, dan ruang terbuka hijau yang sejuk di Kota Sukabumi.",
  googleMapsLink: "https://maps.google.com/?q=Holland+Village+Sukabumi",
  landmarks: [
    { name: "Kampus IPB Sukabumi", distance: "3 Menit" },
    { name: "Terminal Bis Jalur", distance: "5 Menit" },
    { name: "Rumah Sakit", distance: "10 Menit" },
    { name: "Rencana Exit Tol Bocimi", distance: "3 KM" },
    { name: "Indo Grosir", distance: "Dekat" },
    { name: "Akses Jalur Provinsi", distance: "Strategis" },
  ],
};

// House Types (Fixed: buildingArea = Luas Bangunan, landArea = Luas Tanah)
export const houseTypes = [
  {
    id: 1,
    name: "Type 60/116",
    badge: "Tipe Terluas & Premium",
    buildingArea: "60 m²",
    landArea: "116 m²",
    bedroom: 3,
    bathroom: 2,
    floor: 1,
    carport: 1,
    priceStartFrom: "Rp 759.000.000",
    dpAmount: "Rp 75.900.000",
    kprAmount: "Rp 673.100.000",
    bookingFee: "Rp 2.500.000",
    allInPrice: "Rp 10.000.000",
    roomDetails: "3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, Dapur & Taman Luas",
    specification: [
      "Desain modern tropis 1 lantai",
      "Dapur semi terbuka dengan sirkulasi udara optimal",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman depan dan taman belakang ekstra luas",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Plafon: Gypsum, GRC/Hollow",
      "Lantai Utama: Granit 60x60",
      "Air Bersih: Sumur Bor & Listrik 1300 Watt",
    ],
    image: type6096Img,
    floorPlan: denah60116Img,
  },
  {
    id: 2,
    name: "Type 60/96",
    badge: "Favorit Keluarga",
    buildingArea: "60 m²",
    landArea: "96 m²",
    bedroom: 3,
    bathroom: 2,
    floor: 1,
    carport: 1,
    priceStartFrom: "Rp 659.000.000",
    dpAmount: "Rp 65.900.000",
    kprAmount: "Rp 588.100.000",
    bookingFee: "Rp 2.500.000",
    allInPrice: "Rp 5.000.000",
    roomDetails: "3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern minimalis 1 lantai",
      "Dapur semi terbuka yang fungsional",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman asri yang cukup untuk kebutuhan keluarga",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium & Kayu",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Rangka Atap: Baja Ringan",
      "Lantai Utama: Granit 60x60",
      "Air Bersih: Sumur Bor & Listrik 1300 Watt",
    ],
    image: type6096Img,
    floorPlan: denah6096Img,
  },
  {
    id: 3,
    name: "Type 45/72",
    badge: "Ideal Keluarga Muda",
    buildingArea: "45 m²",
    landArea: "72 m²",
    bedroom: 2,
    bathroom: 1,
    floor: 1,
    carport: 1,
    priceStartFrom: "Rp 489.000.000",
    dpAmount: "Rp 48.900.000",
    kprAmount: "Rp 436.600.000",
    bookingFee: "Rp 1.000.000",
    allInPrice: "Rp 3.500.000",
    roomDetails: "2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern kompak 1 lantai",
      "Dapur semi terbuka dengan layout efisien",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman optimal untuk taman tropis",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Plafon: Gypsum, GRC/Hollow",
      "Lantai Utama: Granit 60x60",
      "Closet Duduk, Sumur Bor & Listrik 1300 Watt",
    ],
    image: type4572Img,
    floorPlan: denah4572Img,
  },
  {
    id: 4,
    name: "Type 36/72",
    badge: "Investasi Cerdas",
    buildingArea: "36 m²",
    landArea: "72 m²",
    bedroom: 2,
    bathroom: 1,
    floor: 1,
    carport: 1,
    priceStartFrom: "Rp 419.000.000",
    dpAmount: "Rp 41.900.000",
    kprAmount: "Rp 374.600.000",
    bookingFee: "Rp 1.000.000",
    allInPrice: "Rp 2.500.000",
    roomDetails: "2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern compact dengan pencahayaan alami",
      "Dapur compact dengan meja Zinc Stainless Steel",
      "Garasi 1 mobil dengan carport grass block",
      "Tata ruang sangat efisien dan lega",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium & Kayu",
      "Atap: Genteng Keramik/Karmuri Flat & Baja Ringan",
      "Lantai Utama: Granit 60x60 & KM Keramik",
      "Closet Duduk, Sumur Bor & Listrik 1300 Watt",
    ],
    image: type3672Img,
    floorPlan: denah3672Img,
  },
];

// Facilities
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam & CCTV",
    description: "Tim keamanan profesional berjaga 24/7 didukung pemantauan kawasan untuk ketenangan keluarga Anda.",
    icon: "lock",
    image: fasilitasSecurityImg,
  },
  {
    id: 2,
    name: "One Gate System",
    description: "Sistem gerbang tunggal eksklusif dengan akses keluar-masuk terkontrol yang menjaga privasi penghuni.",
    icon: "door",
    image: fasilitas0neGateImg,
  },
  {
    id: 3,
    name: "Masjid Kawasan",
    description: "Sarana ibadah yang representatif, sejuk, dan nyaman di dalam kompleks perumahan.",
    icon: "building",
    image: fasilitas_masjidImg,
  },
  {
    id: 4,
    name: "Taman Bermain & RTH",
    description: "Ruang terbuka hijau seluas 17,6% dilengkapi area bermain anak yang aman dan asri.",
    icon: "zap",
    image: fasilitas_tamanImg,
  },
  {
    id: 5,
    name: "Jogging Track Asri",
    description: "Jalur olahraga pagi dan sore yang dikelilingi pepohonan hijau serta udara segar Sukabumi.",
    icon: "run",
    image: fasilitas_joggingtrackImg,
  },
  {
    id: 8,
    name: "Area Komersial",
    description: "Kemudahan memenuhi kebutuhan harian keluarga dengan area niaga terpadu di lingkungan cluster.",
    icon: "shopping",
    image: background2Img,
  },
];

// Advantages & Selling Points
export const advantages = [
  {
    id: 1,
    title: "Kampus IPB Sukabumi",
    description: "Hanya selangkah menuju pusat pendidikan tinggi ternama, bernilai investasi tinggi.",
    distance: "3 Menit",
    icon: "school",
  },
  {
    id: 2,
    title: "Akses Terminal Bis",
    description: "Mobilitas antarkota dan transportasi umum sangat mudah dijangkau dari gerbang perumahan.",
    distance: "5 Menit",
    icon: "bus",
  },
  {
    id: 3,
    title: "Fasilitas Rumah Sakit",
    description: "Layanan kesehatan lengkap dan darurat dapat ditempuh dalam waktu singkat.",
    distance: "10 Menit",
    icon: "hospital",
  },
  {
    id: 4,
    title: "Rencana Exit Tol Bocimi",
    description: "Prospek kenaikan nilai investasi properti yang pesat berkat akses dekat gerbang tol.",
    distance: "3 KM",
    icon: "car",
  },
  {
    id: 5,
    title: "Dekat Indo Grosir",
    description: "Kemudahan belanja bulanan dan kebutuhan rumah tangga keluarga setiap hari.",
    distance: "Belanja Mudah",
    icon: "mall",
  },
  {
    id: 6,
    title: "Akses Jalur Provinsi",
    description: "Terhubung langsung dengan jalan utama beraspal mulus untuk kelancaran aktivitas.",
    distance: "Strategis",
    icon: "map",
  },
  {
    id: 7,
    title: "Kawasan Pemda Sukabumi",
    description: "Berada di koridor pengembangan pusat pemerintahan dan fasilitas publik Kota Sukabumi.",
    distance: "Pusat Kota",
    icon: "gap",
  },
];

// Building Specifications / Material Info
export const buildingSpecifications = {
  foundation: "Tapak - Cakar Ayam",
  structure: "Beton Bertulang",
  walls: "Bata Ringan, Plester & Cat",
  carport: "Grass Block",
  frame: "Alumunium & Kayu",
  roof: "Genteng Keramik/Karmuri Flat",
  roofFrame: "Baja Ringan",
  ceiling: "Gypsum, GRC/Hollow",
  flooring: "Granit 60x60",
  bathroomFlooring: "Keramik",
  kitchenCounter: "Zinc Stainless Steel",
  closet: "Closet Duduk",
  waterSupply: "Sumur Bor",
  electricity: "1300 Watt",
};

// Gallery Images
export const gallery = [
  {
    id: 1,
    title: "Fasad Modern Type 60",
    category: "house",
    image: type60Img,
    description: "Desain fasad modern tropis dengan pencahayaan alami maksimal dan carport lega.",
  },
  {
    id: 2,
    title: "Fasad Elegan Type 45/72",
    category: "house",
    image: type45Img,
    description: "Hunian ideal keluarga muda dengan sentuhan arsitektur minimalis hangat.",
  },
  {
    id: 3,
    title: "Fasad Compact Type 36/72",
    category: "house",
    image: type36Img,
    description: "Rumah compact modern dengan taman depan asri dan tata ruang efisien.",
  },
  {
    id: 4,
    title: "Denah Ruang Type 60/116",
    category: "floorplan",
    image: denah60116Img,
    description: "Tata ruang 3 kamar tidur dan 2 kamar mandi di atas lahan 116 m².",
  },
  {
    id: 5,
    title: "Denah Ruang Type 60/96",
    category: "floorplan",
    image: denah6096Img,
    description: "Layout proporsional 3 kamar tidur dan 2 kamar mandi dengan luas tanah 96 m².",
  },
  {
    id: 6,
    title: "Denah Ruang Type 45/72",
    category: "floorplan",
    image: denah4572Img,
    description: "Denah fungsional 2 kamar tidur dan 1 kamar mandi dengan area taman.",
  },
  {
    id: 7,
    title: "Denah Ruang Type 36/72",
    category: "floorplan",
    image: denah3672Img,
    description: "Denah efisien 2 kamar tidur dengan ruang keluarga dan dapur nyaman.",
  },
  {
    id: 8,
    title: "Gerbang Utama One Gate System",
    category: "facility",
    image: fasilitas0neGateImg,
    description: "Akses satu pintu yang megah dan eksklusif bagi warga Holland Village.",
  },
  {
    id: 9,
    title: "Pos Keamanan 24 Jam",
    category: "facility",
    image: fasilitasSecurityImg,
    description: "Sistem penjagaan 24 jam untuk memastikan keamanan lingkungan cluster.",
  },
  {
    id: 10,
    title: "Masjid Kompleks",
    category: "facility",
    image: fasilitas_masjidImg,
    description: "Fasilitas ibadah di dalam kawasan untuk kenyamanan spiritual warga.",
  },
  {
    id: 11,
    title: "Taman Hijau & Area Bermain",
    category: "facility",
    image: fasilitas_tamanImg,
    description: "Area terbuka hijau yang sejuk untuk tumbuh kembang anak dan bersantai.",
  },
  {
    id: 12,
    title: "Jogging Track Kawasan",
    category: "facility",
    image: fasilitas_joggingtrackImg,
    description: "Lintasan lari yang asri mendukung gaya hidup aktif dan sehat setiap hari.",
  },
];

// Pricing & Promo
export const pricing = {
  startingPrice: "Rp 419.000.000",
  minimalDP: "10% (Mulai Rp 41,9 Juta)",
  bookingFeeStart: "Rp 1.000.000",
  allInStart: "Rp 2.500.000",
  paymentScheme: [
    {
      type: "KPR Bank",
      discount: "Bunga 5.99% Fixed 1 Thn",
      description: "Kemudahan cicilan KPR dengan plafon persetujuan hingga senilai harga properti.",
    },
    {
      type: "Cash Keras",
      discount: "Harga Nego Spesial",
      description: "Pembayaran dilakukan 1 kali, maksimal 1 bulan setelah booking dengan diskon khusus.",
    },
    {
      type: "Cash Bertahap",
      discount: "Tenor 6–12 Bulan + Cashback",
      description: "Tersedia pilihan cicilan bertahap langsung ke developer selama 6 atau 12 bulan.",
    },
  ],
  bookingFee: {
    "Type 60/116": "Rp 2.500.000",
    "Type 60/96": "Rp 2.500.000",
    "Type 45/72": "Rp 1.000.000",
    "Type 36/72": "Rp 1.000.000",
  },
  allInPrice: {
    "Type 60/116": "Rp 10.000.000",
    "Type 60/96": "Rp 5.000.000",
    "Type 45/72": "Rp 3.500.000",
    "Type 36/72": "Rp 2.500.000",
  },
  promo: [
    "FREE BIAYA BPHTB",
    "FREE BIAYA AJB",
    "FREE BIAYA KPR",
    "All-In Mulai Rp 2,5 Juta Sampai Terima Kunci",
  ],
  persyaratanKaryawan: [
    "KTP Suami & Istri",
    "Kartu Keluarga (KK)",
    "Buku Nikah / Akta Nikah (jika sudah menikah)",
    "NPWP Pribadi",
    "SK Pengangkatan Karyawan Tetap (SK Kartap)",
    "Surat Keterangan Aktif Bekerja",
    "Slip Gaji 3 Bulan Terakhir",
    "Rekening Koran Payroll 3–6 Bulan Terakhir",
    "Rekap Keuangan / SIUP (khusus Wiraswasta)",
  ],
  cashKeras:
    "Pembayaran dilakukan 1 kali, maksimal 1 bulan setelah booking. Harga dapat dinegosiasikan.",
  cashBertahap:
    "Tersedia pilihan cicilan selama 6 bulan atau 12 bulan (plus cashback).",
  warningPembatalan:
    "Booking Fee hangus apabila terjadi pembatalan sepihak dari konsumen. Jika pembatalan dilakukan saat proses Bank atau SP3K sudah diterbitkan, dikenakan penalti sebesar 50% dari DP yang telah dibayarkan ke Developer.",
};

// Denah Perumahan Specifications
export const denahPerumahan = {
  image: denahPerumahanImg,
  title: "Masterplan & Siteplan Holland Village Sukabumi",

  // Land Use Specifications
  landUseBreakdown: [
    {
      no: 1,
      name: "Luas Efektif Kaveling Hunian",
      area: "11.876,30",
      percentage: "54.88",
    },
    {
      no: 2,
      name: "Sirkulasi Jalan & Infrastruktur",
      area: "5.682,95",
      percentage: "26.26",
    },
    {
      no: 3,
      name: "Ruang Terbuka Hijau (Taman)",
      area: "3.810,41",
      percentage: "17.61",
    },
    {
      no: 4,
      name: "Sarana Masjid dan Parkir",
      area: "255,71",
      percentage: "1.18",
    },
    {
      no: 5,
      name: "Pos Keamanan Terpadu",
      area: "8,00",
      percentage: "0.04",
    },
    {
      no: 6,
      name: "Tempat Pengolahan Sampah (TPS)",
      area: "5,24",
      percentage: "0.02",
    },
  ],
  totalArea: "21.638,31",
  totalPercentage: "100.00",

  // Unit Details (Fixed Block G luasUnit typo: 1.152,00)
  unitDetails: [
    { no: 1, block: "A", landArea: "60/96", unit: 20, luasUnit: "1.920,00", price: "-" },
    { no: 2, block: "B", landArea: "60/96", unit: 5, luasUnit: "480,00", price: "-" },
    { no: 3, block: "C", landArea: "60/96", unit: 3, luasUnit: "288,00", price: "-" },
    { no: 4, block: "C", landArea: "45/72", unit: 4, luasUnit: "288,00", price: "-" },
    { no: 5, block: "D", landArea: "60/116", unit: 13, luasUnit: "1.508,00", price: "-" },
    { no: 6, block: "E", landArea: "45/72", unit: 9, luasUnit: "648,00", price: "-" },
    { no: 7, block: "E", landArea: "60/96", unit: 3, luasUnit: "288,00", price: "-" },
    { no: 8, block: "F", landArea: "36/72", unit: 9, luasUnit: "648,00", price: "-" },
    { no: 9, block: "G", landArea: "36/72", unit: 16, luasUnit: "1.152,00", price: "-" },
    { no: 10, block: "G", landArea: "60/96", unit: 3, luasUnit: "288,00", price: "-" },
    { no: 11, block: "H", landArea: "60/96", unit: 10, luasUnit: "960,00", price: "-" },
    { no: 12, block: "I", landArea: "60/96", unit: 9, luasUnit: "864,00", price: "-" },
    { no: 13, block: "J", landArea: "60/96", unit: 3, luasUnit: "288,00", price: "-" },
    { no: 14, block: "J", landArea: "36/72", unit: 16, luasUnit: "1.152,00", price: "-" },
    { no: 15, block: "K", landArea: "36/72", unit: 6, luasUnit: "432,00", price: "-" },
    { no: 16, block: "L", landArea: "60/96", unit: 6, luasUnit: "672,00", price: "-" },
  ],
};

// Marketing Contact
export const marketing = {
  name: "Holland Village Sukabumi",
  phone: "+62 897-6297-053",
  email: "marketinghollandvillage@gmail.com",
  officeAddress:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  operationalHours: "Setiap Hari (09.00 - 17.00 WIB)",
  website: "www.hollandvillage.id",
  instagram: "@hollandvillagesukabumi",
  agents: [
    {
      id: 1,
      name: "Adiansyah Anwar",
      role: "Property Advisor Resmi",
      phone: "+62 897-6297-053",
      whatsapp: "https://wa.me/628976297053",
    },
  ],
  bankTransfer: {
    bank: "Bank BTN",
    accountNumber: "000-000-000-000-000-000",
    accountName: "PT. PUSPA AGRA PROPERTI",
  },
};
