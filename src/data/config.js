// Import images
import logoImg from "../assets/logo.jpeg";
import type6096Img from "../assets/type-60-96.png";
import type4572Img from "../assets/type-45-72.png";
import type3672Img from "../assets/type-36-72.png";
import type60Img from "../assets/type60.png";
import type45Img from "../assets/type45.png";
import type36Img from "../assets/type36.png";
import denah6096Img from "../assets/denah-type-60-96.png";
import denah4572Img from "../assets/denah-type-45-75.png";
import denah3672Img from "../assets/denah-type-36-72.png";
import fasilitasSecurityImg from "../assets/fasilitas_security.jpg";
import fasilitas0neGateImg from "../assets/fasilitas_onegate.jpg";
import fasilitas_masjidImg from "../assets/fasilitas_masjid.jpg";
import fasilitas_tamanImg from "../assets/fasilitas_taman.jpg";
import fasilitas_joggingtrackImg from "../assets/fasilitas_joggingtrack.jpg";
import fasilitas_kolamImg from "../assets/fasilitas_kolam.jpg";
import background1Img from "../assets/backgroud1.jpg";
import background2Img from "../assets/background2.jpg";

// Company Information
export const company = {
  name: "PT. PUSPA AGRA PROPERTI",
  companyNameShort: "Hollan Village",
  logo: logoImg,
  tagline: "Impian Anda Menjadi Kenyataan",
  description:
    "Hollan Village adalah developer perumahan terpercaya yang menghadirkan hunian berkualitas dengan harga terjangkau dan lokasi strategi di Kota Sukabumi.",
  yearEstablished: 2025,
  vision:
    "Menjadi developer properti terdepan di Sukabumi yang menghadirkan hunian berkualitas dengan harga terjangkau.",
  mission: [
    "Menyediakan properti berkualitas dengan standar modern",
    "Memberikan nilai terbaik kepada pelanggan",
    "Membangun komunitas yang sehat dan harmonis",
    "Komitmen pada keberlanjutan lingkungan",
  ],
};

// Housing Project Information
export const project = {
  name: "Holland Village Sukabumi",
  location:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  fullAddress:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  areaSize: "Strategi Lokasi",
  totalUnits: 850,
  status: "On Progress", // Pre-launch, On Progress, Ready Stock
  description:
    "Holland Village Sukabumi adalah perumahan modern yang dirancang untuk memenuhi kebutuhan keluarga modern dengan fasilitas lengkap dan lokasi strategis. Setiap detail desain telah dipikirkan dengan matang untuk menciptakan lingkungan hunian yang nyaman dan berkelanjutan.",
  googleMapsLink: "https://maps.google.com/?q=Holland+Village+Sukabumi",
  landmarks: [
    { name: "Indo Grosir", distance: "10 menit" },
    { name: "Rumah Sakit", distance: "3 menit" },
    { name: "Kampus IPB Sukabumi", distance: "5 menit" },
    { name: "Terminal Bis", distance: "5 menit" },
    { name: "Rencana Exit Tol Bocimi", distance: "3 km" },
    { name: "Akses Jalur Provinsi", distance: "Dekat" },
  ],
};

// House Types
export const houseTypes = [
  {
    id: 1,
    name: "Type 60/116",
    landArea: "60 m²",
    buildingArea: "116 m²",
    bedroom: 2,
    floor: 2,
    priceStartFrom: "Rp 759.000.000",
    dpAmount: "Rp 75.900.000",
    kprAmount: "Rp 673.100.000",
    roomDetails: "2 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern 2 lantai",
      "Dapur semi terbuka dengan fungsi optimal",
      "Garasi 1 mobil dengan carport",
      "Carport: Grass Block",
      "Halaman depan dan belakang",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Plafon: Gypsum, GRC/Hollow",
      "Lantai: Granit 60x60",
      "Listrik: 1300 Watt",
    ],
    image: type6096Img,
    floorPlan: denah6096Img,
  },
  {
    id: 2,
    name: "Type 60/96",
    landArea: "60 m²",
    buildingArea: "96 m²",
    bedroom: 2,
    floor: 2,
    priceStartFrom: "Rp 659.000.000",
    dpAmount: "Rp 65.900.000",
    kprAmount: "Rp 588.100.000",
    roomDetails: "2 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern minimalis 2 lantai",
      "Dapur semi terbuka yang fungsional",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman yang cukup untuk kebutuhan keluarga",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium & Kayu",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Rangka Atap: Baja Ringan",
      "Lantai: Granit 60x60",
      "Listrik: 1300 Watt",
    ],
    image: type6096Img,
    floorPlan: denah6096Img,
  },
  {
    id: 3,
    name: "Type 45/72",
    landArea: "45 m²",
    buildingArea: "72 m²",
    bedroom: 2,
    floor: 2,
    priceStartFrom: "Rp 489.000.000",
    dpAmount: "Rp 48.900.000",
    kprAmount: "Rp 436.600.000",
    roomDetails: "2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern kompak 2 lantai",
      "Dapur semi terbuka dengan layout efisien",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman yang optimal untuk ruang terbuka",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium & Kayu",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Plafon: Gypsum, GRC/Hollow",
      "Lantai: Granit 60x60",
      "Closet: Duduk",
      "Air Bersih: Sumur Bor",
      "Listrik: 1300 Watt",
    ],
    image: type4572Img,
    floorPlan: denah4572Img,
  },
  {
    id: 4,
    name: "Type 36/72",
    landArea: "36 m²",
    buildingArea: "72 m²",
    bedroom: 2,
    floor: 2,
    priceStartFrom: "Rp 419.000.000",
    dpAmount: "Rp 41.900.000",
    kprAmount: "Rp 374.600.000",
    roomDetails: "2 Kamar Tidur, 1 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern compact tipe terkecil",
      "Dapur compact dengan fungsi lengkap",
      "Garasi 1 mobil dengan carport grass block",
      "Ruang yang sangat efisien untuk penghuni",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium & Kayu",
      "Atap: Genteng Keramik/Karmuri Flat",
      "Rangka Atap: Baja Ringan",
      "Lantai Umum: Granit 60x60",
      "Lantai Kamar Mandi: Keramik",
      "Dapur: Zinc Stainles Steel",
      "Closet: Duduk",
      "Air Bersih: Sumur Bor",
      "Listrik: 1300 Watt",
    ],
    image: type3672Img,
    floorPlan: denah3672Img,
  },
];

// Facilities
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam",
    description: "Tim keamanan profesional tersedia 24/7 untuk ketenangan Anda",
    icon: "lock",
    image: fasilitasSecurityImg,
  },
  {
    id: 2,
    name: "One Gate System",
    description: "Sistem gerbang terpadu dengan akses terkontrol dan modern",
    icon: "door",
    image: fasilitas0neGateImg,
  },
  {
    id: 3,
    name: "Masjid",
    description: "Tempat ibadah yang megah dan nyaman untuk semua penghuni",
    icon: "building",
    image: fasilitas_masjidImg,
  },
  {
    id: 4,
    name: "Taman Bermain Anak",
    description: "Area bermain yang aman dan dilengkapi peralatan modern",
    icon: "zap",
    image: fasilitas_tamanImg,
  },
  {
    id: 5,
    name: "Jogging Track",
    description: "Jalur jogging sepanjang 2 km dengan pemandangan asri",
    icon: "run",
    image: fasilitas_joggingtrackImg,
  },
  {
    id: 6,
    name: "Kolam Renang",
    description: "Kolam renang Olympic-size dengan fasilitas lengkap",
    icon: "swim",
    image: fasilitas_kolamImg,
  },
  {
    id: 7,
    name: "Club House",
    description:
      "Pusat komunitas dengan berbagai fasilitas sosial dan olahraga",
    icon: "building",
    image: background1Img,
  },
  {
    id: 8,
    name: "Area Komersial",
    description: "Pusat perbelanjaan dan layanan bisnis dalam kompleks",
    icon: "shopping",
    image: background2Img,
  },
];

// Advantages & Selling Points
export const advantages = [
  {
    id: 1,
    title: "Dekat Indo Grosir",
    description: "Hanya 10 menit dari Indo Grosir untuk kebutuhan belanja Anda",
    distance: "10 menit",
    icon: "car",
  },
  {
    id: 2,
    title: "Dekat Rumah Sakit",
    description: "Fasilitas kesehatan terlengkap hanya 3 menit perjalanan",
    distance: "3 menit",
    icon: "hospital",
  },
  {
    id: 3,
    title: "Dekat Kampus IPB Sukabumi",
    description: "Lokasi ideal untuk mahasiswa dengan jarak 5 menit",
    distance: "5 menit",
    icon: "school",
  },
  {
    id: 4,
    title: "Akses Terminal Bis",
    description: "Transportasi umum mudah diakses 5 menit dari lokasi",
    distance: "5 menit",
    icon: "bus",
  },
  {
    id: 5,
    title: "Rencana Exit Tol Bocimi",
    description: "Akses ke jaringan tol berkembang pesat",
    distance: "3 km",
    icon: "car",
  },
  {
    id: 6,
    title: "Akses Jalur Provinsi",
    description: "Jalan pemerintah terbaik dengan akses mudah ke area lain",
    distance: "Strategis",
    icon: "map",
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
  kitchenCounter: "Zinc Stainles Steel",
  closet: "Duduk",
  waterSupply: "Sumur Bor",
  electricity: "1300 Watt",
};

// Gallery Images
export const gallery = [
  {
    id: 1,
    title: "Type 60/96",
    category: "house",
    image: type60Img,
  },
  {
    id: 2,
    title: "Type 45/72",
    category: "house",
    image: type45Img,
  },
  {
    id: 3,
    title: "Type 36/72",
    category: "house",
    image: type36Img,
  },
  {
    id: 4,
    title: "Denah Type 60/96",
    category: "floorplan",
    image: denah6096Img,
  },
  {
    id: 5,
    title: "Denah Type 45/72",
    category: "floorplan",
    image: denah4572Img,
  },
  {
    id: 6,
    title: "Denah Type 36/72",
    category: "floorplan",
    image: denah3672Img,
  },
  {
    id: 7,
    title: "One Gate System",
    category: "facility",
    image: fasilitas0neGateImg,
  },
  {
    id: 8,
    title: "Security 24 Jam",
    category: "facility",
    image: fasilitasSecurityImg,
  },
  {
    id: 9,
    title: "Masjid",
    category: "facility",
    image: fasilitas_masjidImg,
  },
];

// Pricing & Promo
export const pricing = {
  startingPrice: "Rp 419.000.000",
  paymentScheme: [
    {
      type: "Cash",
      discount: "Perpanjang Booking",
      description: "Max 1 bulan setelah booking",
    },
    {
      type: "KPR",
      discount: "Suku bunga 5.99% Fixed 1 Tahun",
      description: "Approval hingga senilai harga property",
    },
    {
      type: "Transfer",
      description: "Bank BTN - 000-000-000-000-000-000 PT. PUSPA AGRA PROPERTI",
    },
  ],
  bookingFee: {
    "Type 60/96": "Rp 2.500.000",
    "Type 60/116": "Rp 2.500.000",
    "Type 36/72": "Rp 1.000.000",
    "Type 45/72": "Rp 1.000.000",
  },
  allInPrice: {
    "Type 60/116": "Rp 10.000.000",
    "Type 60/96": "Rp 5.000.000",
    "Type 45/72": "Rp 3.500.000",
    "Type 36/72": "Rp 2.500.000",
  },
  promo: [
    "FREE BIAYA BPHTB",
    "FREE BIAYA AJBB",
    "FREE BIAYA KPR",
    "DP ringan mulai dari Rp 41.900.000",
    "Booking Fee akan dianggap hangus jika pembatalan sepihak dari konsumen",
  ],
  persyaratanKaryawan: [
    "KTP",
    "Kartu Keluarga",
    "Buku Nikah",
    "NPWP",
    "Buku Nikah (jika diperlukan)",
    "SK Kartap",
    "SK Aktif Bekerja",
    "Rekap Keuangan 6 bulan",
    "Slip Gaji 3 bulan terakhir",
    "Rek Payroll 3 bulan terakhir",
    "SIUP (jika diperlukan)",
    "Rek Koran 6 bulan",
  ],
  cashKeras:
    "Pembayaran dilakukan 1 kali, maksimal 1 bulan setelah booking. Harga dapat dinegosiasiakan.",
  cashBertahap:
    "Tersedia pilihan cicilan selama 6 bulan atau 12 bulan (plus cashback)",
  warningPembatalan:
    "Jika ada pembatalan oleh konsumen saat proses Bank atau SPPK sudah diterbitkan, maka akan dikenakan penalti sebesar 50% dari DP yang sudah dibayarkan ke Developer",
};

// Marketing Contact
export const marketing = {
  name: "Holland Village Sukabumi",
  phone: "+62 858-0000-5300",
  email: "info@hollandvillage.id",
  officeAddress:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  operationalHours: "Setiap Hari",
  website: "www.hollandvillage.id",
  instagram: "@hollandvillagesukabumi",
  agents: [
    {
      id: 1,
      name: "Rudi Wahyu P",
      phone: "+62 858-0000-5300",
      whatsapp: "https://wa.me/6285800005300",
    },
    {
      id: 2,
      name: "Fitri Ramadhani",
      phone: "+62 812-2063-3161",
      whatsapp: "https://wa.me/6281220633161",
    },
  ],
  bankTransfer: {
    bank: "Bank BTN",
    accountNumber: "000-000-000-000-000-000",
    accountName: "PT. PUSPA AGRA PROPERTI",
  },
};
