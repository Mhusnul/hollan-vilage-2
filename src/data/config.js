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
  companyNameShort: "Hollan Village Sukabumi",
  logo: logoImg,
  tagline: "Impian Anda Menjadi Kenyataan",
  description:
    "PT. PUSPA AGRA PROPERTI adalah developer perumahan terpercaya yang menghadirkan hunian berkualitas dengan harga terjangkau dan lokasi strategi di Kota Sukabumi.",
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
  areaSize: "21.000 M²",
  totalUnits: 135,
  status: "On Progress", // Pre-launch, On Progress, Ready Stock
  description:
    "Holland Village Sukabumi adalah perumahan modern yang dirancang untuk memenuhi kebutuhan keluarga modern dengan fasilitas lengkap dan lokasi strategis. Setiap detail desain telah dipikirkan dengan matang untuk menciptakan lingkungan hunian yang nyaman dan berkelanjutan.",
  googleMapsLink: "https://maps.google.com/?q=Holland+Village+Sukabumi",
  landmarks: [
    { name: "Indo Grosir", distance: "" },
    { name: "Rumah Sakit", distance: "10 menit" },
    { name: "Kampus IPB Sukabumi", distance: "3 menit" },
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
    bedroom: 3,
    floor: 2,
    priceStartFrom: "Rp 759.000.000",
    dpAmount: "Rp 75.900.000",
    kprAmount: "Rp 673.100.000",
    roomDetails: "3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu",
    specification: [
      "Desain modern 1 lantai",
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
    bedroom: 3,
    floor: 2,
    priceStartFrom: "Rp 659.000.000",
    dpAmount: "Rp 65.900.000",
    kprAmount: "Rp 588.100.000",
    roomDetails: "3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur",
    specification: [
      "Desain modern minimalis 1 lantai",
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
      "Desain modern kompak 1 lantai",
      "Dapur semi terbuka dengan layout efisien",
      "Garasi 1 mobil dengan carport grass block",
      "Halaman yang optimal untuk ruang terbuka",
      "Pondasi: Tapak - Cakar Ayam",
      "Struktur: Beton Bertulang",
      "Dinding: Bata Ringan, Plester & Cat",
      "Kusen: Alumunium",
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
    description: "Dekat Indo Grosir untuk kebutuhan belanja Anda",
    distance: "Kebutuhan",
    icon: "car",
  },
  {
    id: 2,
    title: "Dekat Rumah Sakit",
    description: "Fasilitas kesehatan terlengkap hanya 10 menit perjalanan",
    distance: "10 menit",
    icon: "hospital",
  },
  {
    id: 3,
    title: "Dekat Kampus IPB Sukabumi",
    description: "Lokasi ideal untuk mahasiswa dengan jarak 3 menit",
    distance: "3 menit",
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

// Denah Perumahan Specifications
export const denahPerumahan = {
  image: denahPerumahanImg,
  title: "Denah Holland Village Sukabumi",

  // Land Use Specifications
  landUseBreakdown: [
    {
      no: 1,
      name: "Luas Efektif Kaveling",
      area: "11,876.30",
      percentage: "54.88",
    },
    {
      no: 2,
      name: "Masjid dan Parkir",
      area: "255.71",
      percentage: "1.18",
    },
    {
      no: 3,
      name: "Ruang Terbuka Hijau",
      area: "3,810.41",
      percentage: "17.61",
    },
    {
      no: 4,
      name: "Pos Keamanan",
      area: "8.00",
      percentage: "0.04",
    },
    {
      no: 5,
      name: "TPS",
      area: "5.24",
      percentage: "0.02",
    },
    {
      no: 6,
      name: "Sirkulasi",
      area: "5,682.95",
      percentage: "26.26",
    },
  ],
  totalArea: "21,638.31",
  totalPercentage: "100.00",

  // Unit Details
  unitDetails: [
    {
      no: 1,
      block: "A",
      landArea: "60/96",
      unit: 20,
      luasUnit: "1.920,00",
      price: "-",
    },
    {
      no: 2,
      block: "B",
      landArea: "60/96",
      unit: 5,
      luasUnit: "480,00",
      price: "-",
    },
    {
      no: 3,
      block: "C",
      landArea: "60/96",
      unit: 3,
      luasUnit: "288,00",
      price: "-",
    },
    {
      no: 4,
      block: "C",
      landArea: "45/72",
      unit: 4,
      luasUnit: "288,00",
      price: "-",
    },
    {
      no: 5,
      block: "D",
      landArea: "60/116",
      unit: 13,
      luasUnit: "1.508,00",
      price: "-",
    },
    {
      no: 6,
      block: "E",
      landArea: "45/72",
      unit: 9,
      luasUnit: "648,00",
      price: "-",
    },
    {
      no: 7,
      block: "E",
      landArea: "60/96",
      unit: 3,
      luasUnit: "288,00",
      price: "-",
    },
    {
      no: 8,
      block: "F",
      landArea: "36/72",
      unit: 9,
      luasUnit: "648,00",
      price: "-",
    },
    {
      no: 9,
      block: "G",
      landArea: "36/72",
      unit: 16,
      luasUnit: "10152,00",
      price: "-",
    },
    {
      no: 10,
      block: "G",
      landArea: "60/96",
      unit: 3,
      luasUnit: "288,00",
      price: "-",
    },
    {
      no: 11,
      block: "H",
      landArea: "60/96",
      unit: 10,
      luasUnit: "960,00",
      price: "-",
    },
    {
      no: 12,
      block: "I",
      landArea: "60/96",
      unit: 9,
      luasUnit: "864,00",
      price: "-",
    },
    {
      no: 13,
      block: "J",
      landArea: "60/96",
      unit: 3,
      luasUnit: "288,00",
      price: "-",
    },
    {
      no: 14,
      block: "J",
      landArea: "36/72",
      unit: 16,
      luasUnit: "1152,00",
      price: "-",
    },
    {
      no: 15,
      block: "K",
      landArea: "36/72",
      unit: 6,
      luasUnit: "432,00",
      price: "-",
    },
    {
      no: 16,
      block: "L",
      landArea: "60/96",
      unit: 6,
      luasUnit: "672,00",
      price: "-",
    },
  ],
};

// Marketing Contact
export const marketing = {
  name: "Holland Village Sukabumi",
  phone: "+62 897-6297-053",
  email: "marketinghollandvillage@gmail.com",
  officeAddress:
    "Jl. Garuda, Sindangpalay, Kec. Cibeureum, Kota Sukabumi, Jawa Barat",
  operationalHours: "Setiap Hari",
  website: "www.hollandvillage.id",
  instagram: "@hollandvillagesukabumi",
  agents: [
    {
      id: 1,
      name: "Adiansyah Anwar",
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
