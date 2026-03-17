// Import images
import logoImg from "../assets/logo.jpeg";
import typeAImg from "../assets/typeA.jpg";
import typeAFloorImg from "../assets/denahtype_a.jpg";
import typeBImg from "../assets/typeb.jpg";
import typeBFloorImg from "../assets/denahtype_b.jpg";
import typeCImg from "../assets/typec.jpg";
import typeCFloorImg from "../assets/denahtype_c.jpg";
import fasilitasSecurityImg from "../assets/fasilitas_security.jpg";
import fasilitas0neGateImg from "../assets/fasilitas_onegate.jpg";
import fasilitas_masjidImg from "../assets/fasilitas_masjid.jpg";
import fasilitas_tamanImg from "../assets/fasilitas_taman.jpg";
import fasilitas_joggingtrackImg from "../assets/fasilitas_joggingtrack.jpg";
import fasilitas_kolamImg from "../assets/fasilitas_kolam.jpg";
import background1Img from "../assets/backgroud1.jpg";
import background2Img from "../assets/background2.jpg";
import galeri1Img from "../assets/galeri1.jpg";
import galeri2Img from "../assets/galeri2.jpg";
import galeri3Img from "../assets/galeri3.jpg";
import galeri4Img from "../assets/galeri4.jpg";
import typeA1Img from "../assets/typeA1.jpg";
import typeB1Img from "../assets/typeB1.jpg";

// Company Information
export const company = {
  name: "Hollan Village",
  logo: logoImg,
  tagline: "Rumah Impian Anda Menunggu",
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
    image: typeAImg,
    floorPlan: typeAFloorImg,
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
    image: typeBImg,
    floorPlan: typeBFloorImg,
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
    image: typeCImg,
    floorPlan: typeCFloorImg,
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
    image: galeri1Img,
  },
  {
    id: 2,
    title: "Model Rumah Tipe A",
    category: "house",
    image: galeri2Img,
  },
  {
    id: 3,
    title: "Kolam Renang",
    category: "facility",
    image: galeri3Img,
  },
  {
    id: 4,
    title: "Taman Bermain",
    category: "facility",
    image: galeri4Img,
  },
  {
    id: 5,
    title: "Model Rumah Tipe B",
    category: "house",
    image: typeA1Img,
  },
  {
    id: 6,
    title: "Club House",
    category: "facility",
    image: typeB1Img,
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
