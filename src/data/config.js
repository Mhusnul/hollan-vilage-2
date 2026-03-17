// Company Information
export const company = {
  name: "Sky Estate",
  logo: "🏢",
  tagline: "Your Dream Home Awaits",
  description:
    "Sky Estate telah menjadi developer terpercaya dalam menciptakan komunitas perumahan berkualitas tinggi dengan standar internasional.",
  yearEstablished: 2015,
  vision:
    "Menjadi developer properti terdepan yang menghadirkan hunian berkualitas dengan harga terjangkau.",
  mission: [
    "Menyediakan properti berkualitas dengan standar internasional",
    "Memberikan nilai terbaik kepada pelanggan",
    "Membangun komunitas yang sehat dan harmonis",
    "Komitmen pada keberlanjutan lingkungan",
  ],
};

// Housing Project Information
export const project = {
  name: "Holland Village",
  location: "Jl. Raya Sudirman, Depok, Jawa Barat",
  fullAddress: "Jl. Raya Sudirman No. 123, Depok, Jawa Barat 16424, Indonesia",
  areaSize: "45 Hektar",
  totalUnits: 850,
  status: "On Progress", // Pre-launch, On Progress, Ready Stock
  description:
    "Holland Village adalah perumahan modern yang dirancang untuk memenuhi kebutuhan keluarga modern dengan fasilitas lengkap dan lokasi strategis. Setiap detail desain telah dipikirkan dengan matang untuk menciptakan lingkungan hunian yang nyaman dan berkelanjutan.",
  googleMapsLink: "https://maps.google.com/?q=Holland+Village+Depok",
  landmarks: [
    { name: "Stasiun Depok", distance: "2 km" },
    { name: "Tol Jagorawi", distance: "1.5 km" },
    { name: "Mall Depok", distance: "3 km" },
    { name: "RSAD Gatot Subroto", distance: "4 km" },
    { name: "SMA Negeri 1 Depok", distance: "1 km" },
  ],
};

// House Types
export const houseTypes = [
  {
    id: 1,
    name: "Tipe A",
    landArea: "60 m²",
    buildingArea: "45 m²",
    bedroom: 2,
    bathroom: 1,
    floor: 1,
    priceStartFrom: "Rp 395.000.000",
    specification: [
      "Desain modern minimalis",
      "Dapur semi terbuka",
      "Garasi 1 mobil",
      "Halaman depan dan belakang",
      "Sistem keamanan terintegrasi",
    ],
    image:
      "https://images.unsplash.com/photo-1570129477492-45f003313e78?w=500&h=400&fit=crop",
    floorPlan:
      "https://images.unsplash.com/photo-1577720361528-3e1b4ae4b64a?w=500&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Tipe B",
    landArea: "75 m²",
    buildingArea: "60 m²",
    bedroom: 3,
    bathroom: 2,
    floor: 2,
    priceStartFrom: "Rp 595.000.000",
    specification: [
      "Desain modern dengan interior premium",
      "Dapur terbuka dengan island",
      "Garasi 2 mobil",
      "Halaman yang luas",
      "Smart home technology",
    ],
    image:
      "https://images.unsplash.com/photo-1580587771550-e323be2ae537?w=500&h=400&fit=crop",
    floorPlan:
      "https://images.unsplash.com/photo-1604328698692-f76ea0fb28b7?w=500&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Tipe C",
    landArea: "100 m²",
    buildingArea: "85 m²",
    bedroom: 3,
    bathroom: 3,
    floor: 2,
    priceStartFrom: "Rp 895.000.000",
    specification: [
      "Desain mewah dengan finishing premium",
      "Dapur terbuka full equipped",
      "Garasi 2 mobil dengan carport",
      "Halaman eksklusif dengan kolam renang mini",
      "Home theater room",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400&fit=crop",
    floorPlan:
      "https://images.unsplash.com/photo-1554995207-c18210cc9bdd?w=500&h=400&fit=crop",
  },
];

// Facilities
export const facilities = [
  {
    id: 1,
    name: "Security 24 Jam",
    description: "Tim keamanan profesional tersedia 24/7 untuk ketenangan Anda",
    icon: "lock",
    image:
      "https://images.unsplash.com/photo-1589939705066-5ec98ab564d0?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "One Gate System",
    description: "Sistem gerbang terpadu dengan akses terkontrol dan modern",
    icon: "door",
    image:
      "https://images.unsplash.com/photo-1547557706-abb221c2e6f5?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Masjid",
    description: "Tempat ibadah yang megah dan nyaman untuk semua penghuni",
    icon: "building",
    image:
      "https://images.unsplash.com/photo-1585320806553-5395076ebf08?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Taman Bermain Anak",
    description: "Area bermain yang aman dan dilengkapi peralatan modern",
    icon: "zap",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Jogging Track",
    description: "Jalur jogging sepanjang 2 km dengan pemandangan asri",
    icon: "run",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Kolam Renang",
    description: "Kolam renang Olympic-size dengan fasilitas lengkap",
    icon: "swim",
    image:
      "https://images.unsplash.com/photo-1576610616656-570cc63218b0?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Club House",
    description:
      "Pusat komunitas dengan berbagai fasilitas sosial dan olahraga",
    icon: "building",
    image:
      "https://images.unsplash.com/photo-1552391206-a5af3dd0f65f?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Area Komersial",
    description: "Pusat perbelanjaan dan layanan bisnis dalam kompleks",
    icon: "shopping",
    image:
      "https://images.unsplash.com/photo-1555636222-cae831c7a317?w=300&h=300&fit=crop",
  },
];

// Advantages & Selling Points
export const advantages = [
  {
    id: 1,
    title: "Dekat Dengan Tol Jagorawi",
    description: "Hanya 1.5 km dari Tol Jagorawi, akses mudah ke Jakarta",
    distance: "1.5 km",
    icon: "car",
  },
  {
    id: 2,
    title: "Proximity ke Sekolah",
    description: "Dekat dengan SMA & SMP negeri serta sekolah internasional",
    distance: "1 km",
    icon: "school",
  },
  {
    id: 3,
    title: "Dekat Rumah Sakit",
    description: "RSAD Gatot Subroto dan rumah sakit swasta terkemuka",
    distance: "4 km",
    icon: "hospital",
  },
  {
    id: 4,
    title: "Dekat Mall & Pusat Perbelanjaan",
    description: "Mall Depok dan berbagai pusat perbelanjaan modern",
    distance: "3 km",
    icon: "mall",
  },
  {
    id: 5,
    title: "Akses Stasiun KRL",
    description: "Stasiun Depok untuk transportasi massal yang nyaman",
    distance: "2 km",
    icon: "train",
  },
  {
    id: 6,
    title: "Lingkungan Asri & Tenang",
    description: "Area hijau yang luas dengan tata ruang yang terencana baik",
    distance: "Dalam kompleks",
    icon: "tree",
  },
];

// Gallery Images
export const gallery = [
  {
    id: 1,
    title: "Kawasan Perumahan",
    category: "area",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Model Rumah Tipe A",
    category: "house",
    image:
      "https://images.unsplash.com/photo-1570129477492-45f003313e78?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Kolam Renang",
    category: "facility",
    image:
      "https://images.unsplash.com/photo-1576610616656-570cc63218b0?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Taman Bermain",
    category: "facility",
    image:
      "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Model Rumah Tipe B",
    category: "house",
    image:
      "https://images.unsplash.com/photo-1580587771550-e323be2ae537?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Club House",
    category: "facility",
    image:
      "https://images.unsplash.com/photo-1552391206-a5af3dd0f65f?w=600&h=400&fit=crop",
  },
];

// Pricing & Promo
export const pricing = {
  startingPrice: "Rp 395.000.000",
  paymentScheme: [
    { type: "Cash", discount: "5%" },
    { type: "KPR", discount: "0%" },
    { type: "Inhouse Financing", discount: "2%" },
  ],
  promo: [
    "Diskon 5% untuk pembayaran tunai",
    "Gratis biaya administrasi untuk 100 pembeli pertama",
    "Free furniture untuk tipe B dan C",
    "DP ringan mulai dari 10%",
  ],
  minimalDP: "10%",
};

// Marketing Contact
export const marketing = {
  name: "Budi Santoso",
  phone: "+62 812-3456-7890",
  email: "info@skyestate.com",
  officeAddress: "Jl. Gatot Subroto No. 45, Jakarta 12930",
  operationalHours: "Senin - Jumat: 09:00 - 18:00 | Sabtu: 09:00 - 16:00",
  agents: [
    {
      id: 1,
      name: "Agen A",
      phone: "+62 812-1111-1111",
      whatsapp: "https://wa.me/6281211111111",
    },
    {
      id: 2,
      name: "Agen B",
      phone: "+62 812-2222-2222",
      whatsapp: "https://wa.me/6281222222222",
    },
  ],
};
