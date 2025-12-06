
const manualMarkers = [
    {
        id: 1,
        position: [-7.7800, 113.3600], // Probolinggo approx
        title: "Promosi Di Tempat Umum",
        demographics: "Perempuan, 45 Tahun",
        description: "Display susu SGM di ujung lorong menghadap pintu utama Husada Mart 2 Pajarakan, Kab. Probolinggo",
        image: "https://placehold.co/100x100",
        originalCoords: "113.3600, -7.7800",
        status: "verified",
        age: 45,
        gender: "female",
        province: "Jawa Timur",
        platform: "WhatsApp",
        reportType: "Promotion in a store/office...",
        category: "non-internet"
    },
    {
        id: 2,
        position: [-6.2088, 106.8456], // Jakarta
        title: "Iklan di Media Sosial",
        demographics: "Perempuan, 28 Tahun",
        description: "Iklan susu formula di Instagram Story",
        image: "https://placehold.co/100x100",
        originalCoords: "106.8456, -6.2088",
        status: "unverified",
        age: 28,
        gender: "female",
        province: "Dki Jakarta",
        platform: "Instagram",
        reportType: "Advertisements on Social Media",
        category: "internet"
    },
    {
        id: 3,
        position: [-6.9175, 107.6191], // Bandung
        title: "Pembagian Sampel Gratis",
        demographics: "Bidan, 35 Tahun",
        description: "Sales memberikan sampel susu formula gratis di klinik bersalin.",
        image: "https://placehold.co/100x100",
        originalCoords: "107.6191, -6.9175",
        status: "verified",
        age: 35,
        gender: "female",
        province: "Jawa Barat",
        platform: "Direct",
        reportType: "Giving free product samples",
        category: "non-internet"
    },
    {
        id: 4,
        position: [-7.2575, 112.7521], // Surabaya
        title: "Diskon Produk Susu Bayi",
        demographics: "Ibu Rumah Tangga, 30 Tahun",
        description: "Potongan harga besar-besaran untuk susu bayi 0-6 bulan di supermarket.",
        image: "https://placehold.co/100x100",
        originalCoords: "112.7521, -7.2575",
        status: "rejected",
        age: 30,
        gender: "female",
        province: "Jawa Timur",
        platform: "WhatsApp",
        reportType: "Promotion in a store/office...",
        category: "non-internet"
    },
    {
        id: 5,
        position: [-8.6705, 115.2126], // Denpasar
        title: "Poster di Ruang Tunggu RS",
        demographics: "Ayah, 32 Tahun",
        description: "Poster promosi susu formula tertempel di dinding ruang tunggu poli anak.",
        image: "https://placehold.co/100x100",
        originalCoords: "115.2126, -8.6705",
        status: "verified",
        age: 32,
        gender: "male",
        province: "Bali",
        platform: "Telegram",
        reportType: "Promotion at hospitals...",
        category: "non-internet"
    },
    {
        id: 6,
        position: [-5.1477, 119.4327], // Makassar
        title: "Sponsorship Seminar Bidan",
        demographics: "Mahasiswa Kebidanan, 21 Tahun",
        description: "Seminar kesehatan disponsori penuh oleh brand susu formula terkenal.",
        image: "https://placehold.co/100x100",
        originalCoords: "119.4327, -5.1477",
        status: "unverified",
        age: 21,
        gender: "female",
        province: "Sulawesi Selatan",
        platform: "Website",
        reportType: "Sponsorship for health workers...",
        category: "non-internet"
    },
    {
        id: 7,
        position: [3.5952, 98.6722], // Medan
        title: "Hadiah Pembelian Susu",
        demographics: "Nenek, 55 Tahun",
        description: "Beli 2 kaleng susu dapat mainan anak gratis.",
        image: "https://placehold.co/100x100",
        originalCoords: "98.6722, 3.5952",
        status: "verified",
        age: 55,
        gender: "female",
        province: "Sumatera Utara",
        platform: "WhatsApp",
        reportType: "Gifts for women/families",
        category: "non-internet"
    },
    {
        id: 8,
        position: [-0.0263, 109.3425], // Pontianak
        title: "Klaim Kesehatan Menyesatkan",
        demographics: "Perempuan, 29 Tahun",
        description: "Kemasan susu mengklaim dapat meningkatkan kecerdasan otak secara instan.",
        image: "https://placehold.co/100x100",
        originalCoords: "109.3425, -0.0263",
        status: "rejected",
        age: 29,
        gender: "female",
        province: "Kalimantan Barat",
        platform: "Facebook",
        reportType: "Label or package products...",
        category: "internet"
    },
    {
        id: 9,
        position: [-1.6101, 103.6131], // Jambi
        title: "Sales Masuk Ruang Rawat",
        demographics: "Ibu Baru Melahirkan, 24 Tahun",
        description: "Sales menawarkan susu formula langsung ke ibu yang baru melahirkan di kamar rawat inap.",
        image: "https://placehold.co/100x100",
        originalCoords: "103.6131, -1.6101",
        status: "verified",
        age: 24,
        gender: "female",
        province: "Jambi",
        platform: "Direct",
        reportType: "Called or visited directly by sales",
        category: "non-internet"
    },
    {
        id: 10,
        position: [-5.3971, 105.2668], // Bandar Lampung
        title: "Iklan TV di Jam Anak",
        demographics: "Ayah, 40 Tahun",
        description: "Iklan susu pertumbuhan tayang di sela-sela kartun anak.",
        image: "https://placehold.co/100x100",
        originalCoords: "105.2668, -5.3971",
        status: "unverified",
        age: 40,
        gender: "male",
        province: "Lampung",
        platform: "TV",
        reportType: "Advertisements on Social Media",
        category: "internet"
    },
    {
        id: 11,
        position: [-3.3194, 114.5908], // Banjarmasin
        title: "Lomba Foto Bayi Sehat",
        demographics: "Ibu, 27 Tahun",
        description: "Lomba foto bayi dengan syarat menyertakan struk pembelian susu formula.",
        image: "https://placehold.co/100x100",
        originalCoords: "114.5908, -3.3194",
        status: "verified",
        age: 27,
        gender: "female",
        province: "Kalimantan Selatan",
        platform: "Instagram",
        reportType: "Sponsorship or collaboration...",
        category: "internet"
    },
    {
        id: 12,
        position: [-0.9471, 100.4172], // Padang
        title: "Bingkisan Lebaran",
        demographics: "Kader Posyandu, 38 Tahun",
        description: "Perusahaan susu memberikan bingkisan lebaran kepada kader posyandu.",
        image: "https://placehold.co/100x100",
        originalCoords: "100.4172, -0.9471",
        status: "verified",
        age: 38,
        gender: "female",
        province: "Sumatera Barat",
        platform: "Direct",
        reportType: "Gifts for health workers",
        category: "non-internet"
    }
];

// Helper Data for Generation
const provinces = [
    "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
    "Dki Jakarta", "Jawa Barat", "Jawa Tengah", "Di Yogyakarta", "Jawa Timur", "Banten",
    "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
    "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
    "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
    "Maluku", "Maluku Utara",
    "Papua Barat", "Papua"
];

const reportTypesInternet = [
    "Advertisements on Social Media",
    "Label or package products...",
    "Sponsorship or collaboration...",
    "Website Promotion"
];

const reportTypesNonInternet = [
    "Promotion in a store/office...",
    "Promotion at hospitals...",
    "Sponsorship for health workers...",
    "Gifts for women/families",
    "Called or visited directly by sales",
    "Gifts for health workers",
    "Giving free product samples"
];

const platforms = ["WhatsApp", "Instagram", "Facebook", "Telegram", "Twitter", "TikTok", "Website", "TV", "Direct"];
const statuses = ["verified", "unverified", "rejected"];
const genders = ["female", "male"];

// Province Center Coordinates (Approximate)
const provinceCoordinates = {
    "Aceh": { lat: 4.6951, lng: 96.7494 },
    "Sumatera Utara": { lat: 2.1154, lng: 99.5451 },
    "Sumatera Barat": { lat: -0.7399, lng: 100.8000 },
    "Riau": { lat: 0.5071, lng: 101.4478 },
    "Jambi": { lat: -1.6101, lng: 103.6131 },
    "Sumatera Selatan": { lat: -3.3194, lng: 104.9145 },
    "Bengkulu": { lat: -3.8004, lng: 102.2655 },
    "Lampung": { lat: -4.5586, lng: 105.4068 },
    "Kepulauan Bangka Belitung": { lat: -2.7411, lng: 106.4406 },
    "Kepulauan Riau": { lat: 3.9457, lng: 108.1429 },
    "Dki Jakarta": { lat: -6.2088, lng: 106.8456 },
    "Jawa Barat": { lat: -6.9175, lng: 107.6191 },
    "Jawa Tengah": { lat: -7.1510, lng: 110.1403 },
    "Di Yogyakarta": { lat: -7.7956, lng: 110.3695 },
    "Jawa Timur": { lat: -7.5361, lng: 112.2384 },
    "Banten": { lat: -6.4058, lng: 106.0640 },
    "Bali": { lat: -8.4095, lng: 115.1889 },
    "Nusa Tenggara Barat": { lat: -8.6529, lng: 117.3616 },
    "Nusa Tenggara Timur": { lat: -8.6574, lng: 121.0794 },
    "Kalimantan Barat": { lat: -0.2787, lng: 111.4753 },
    "Kalimantan Tengah": { lat: -1.6815, lng: 113.3824 },
    "Kalimantan Selatan": { lat: -3.0926, lng: 115.2838 },
    "Kalimantan Timur": { lat: 0.5387, lng: 116.4194 },
    "Kalimantan Utara": { lat: 3.0731, lng: 116.0414 },
    "Sulawesi Utara": { lat: 0.6247, lng: 123.9750 },
    "Sulawesi Tengah": { lat: -1.4300, lng: 121.4456 },
    "Sulawesi Selatan": { lat: -3.6687, lng: 119.9740 },
    "Sulawesi Tenggara": { lat: -4.1449, lng: 122.1746 },
    "Gorontalo": { lat: 0.6999, lng: 122.4467 },
    "Sulawesi Barat": { lat: -2.8441, lng: 119.2321 },
    "Maluku": { lat: -3.2385, lng: 130.1453 },
    "Maluku Utara": { lat: 1.5709, lng: 127.8087 },
    "Papua Barat": { lat: -1.3361, lng: 133.1747 },
    "Papua": { lat: -4.2699, lng: 138.0804 }
};

const businessNames = [
    "Apotek K24", "Indomaret Point", "Alfamart", "Hypermart", "Transmart", "Superindo",
    "RSIA Bunda", "RS Hermina", "Klinik Bidan Mandiri", "Toko Susu Murah", "Baby Shop Jaya",
    "Puskesmas Kecamatan", "Toko Perlengkapan Bayi", "Mall Grand Indonesia", "Plaza Senayan",
    "Pasar Tradisional", "RSUD Kabupaten", "Klinik Pratama", "Apotek Kimia Farma"
];

const islandSpecifics = {
    "Sumatera": ["Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung"],
    "Jawa": ["Dki Jakarta", "Jawa Barat", "Jawa Tengah", "Di Yogyakarta", "Jawa Timur", "Banten"],
    "Kalimantan": ["Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara"],
    "Sulawesi": ["Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat"],
    "BaliNusa": ["Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur"],
    "PapuaMaluku": ["Maluku", "Maluku Utara", "Papua Barat", "Papua"]
};

// Generate 300 Dummy Reports
const generateReports = (count = 300) => {
    const reports = [];
    for (let i = 0; i < count; i++) {
        const isInternet = Math.random() > 0.4; // 60% non-internet (physical locations)
        const category = isInternet ? "internet" : "non-internet";
        const typeList = isInternet ? reportTypesInternet : reportTypesNonInternet;
        const reportType = typeList[Math.floor(Math.random() * typeList.length)];

        // Select Province
        const province = provinces[Math.floor(Math.random() * provinces.length)];
        const center = provinceCoordinates[province] || { lat: -6.2088, lng: 106.8456 };

        // Add variation (approx +/- 0.8 degrees for realistic spread)
        const lat = center.lat + (Math.random() - 0.5) * 1.6;
        const lng = center.lng + (Math.random() - 0.5) * 1.6;

        const business = businessNames[Math.floor(Math.random() * businessNames.length)];
        const age = Math.floor(Math.random() * 35) + 20; // 20-55

        let title, description;
        if (isInternet) {
            title = `${reportType} - ${platforms[Math.floor(Math.random() * platforms.length)]}`;
            description = `Ditemukan promosi pelanggaran kode etik di ${platforms[Math.floor(Math.random() * platforms.length)]} berupa ${reportType.toLowerCase()}.`;
        } else {
            title = `${reportType} di ${business}`;
            description = `Laporan pelanggaran di ${business}, daerah ${province}. ${reportType} ditemukan di lokasi.`;
        }

        reports.push({
            id: 100 + i,
            position: [lat, lng],
            title: title,
            demographics: `${genders[Math.floor(Math.random() * genders.length)] === 'female' ? 'Ibu' : 'Bapak'}, ${age} Tahun`,
            description: description,
            image: `https://placehold.co/400x300?text=Bukti+Laporan+${100 + i}`,
            originalCoords: `${lng.toFixed(4)}, ${lat.toFixed(4)}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            age: age,
            gender: genders[Math.floor(Math.random() * genders.length)],
            province: province,
            platform: isInternet ? platforms[Math.floor(Math.random() * 5)] : "Direct",
            reportType: reportType,
            category: category
        });
    }
    return reports;
};

export const mapMarkers = [...manualMarkers, ...generateReports(300)];

// Calculate stats dynamically from mapMarkers
const verifiedReports = mapMarkers.filter(m => m.status === 'verified').length;
const unverifiedReports = mapMarkers.filter(m => m.status === 'unverified').length;
const rejectedReports = mapMarkers.filter(m => m.status === 'rejected').length;

// Calculate reportTypes dynamically
// Calculate reportTypes dynamically
const internetCounts = {};
const nonInternetCounts = {};
const totalCounts = {};

mapMarkers.forEach(marker => {
    const type = marker.reportType;
    if (type) {
        // Total
        totalCounts[type] = (totalCounts[type] || 0) + 1;

        // Split by category
        if (marker.category === 'internet') {
            internetCounts[type] = (internetCounts[type] || 0) + 1;
        } else {
            nonInternetCounts[type] = (nonInternetCounts[type] || 0) + 1;
        }
    }
});

const formatStats = (counts) => Object.keys(counts)
    .map(label => ({ label, count: counts[label] }))
    .sort((a, b) => b.count - a.count);

const dynamicReportTypes = formatStats(totalCounts);
const internetReportStats = formatStats(internetCounts); // Renamed to avoid conflict
const nonInternetReportStats = formatStats(nonInternetCounts); // Renamed to avoid conflict

export const statsData = {
    verifiedReports,
    unverifiedReports,
    rejectedReports,
    ageDistribution: [
        { label: '18-20 year old', value: 1.9 },
        { label: '21-25 Year old', value: 6.8 },
        { label: '25-30 year old', value: 21.7 },
        { label: '30-40 year old', value: 27.2 },
        { label: '40-55 year old', value: 33.3 },
        { label: '>55 year old', value: 0.5 },
    ],
    genderDistribution: {
        female: 86.6,
        male: 10.0,
        na: 3.4
    },
    platformDistribution: [
        { label: 'WhatsApp', value: 86.6 },
        { label: 'Telegram', value: 5.0 },
    ],
    provinceRanking: [
        { rank: 1, name: 'Dki Jakarta', count: 59 },
        { rank: 2, name: 'Jawa Timur', count: 50 },
        { rank: 3, name: 'Jawa Barat', count: 47 },
        { rank: 4, name: 'Banten', count: 35 },
        { rank: 5, name: 'Jawa Tengah', count: 27 },
    ],
    reportTypes: dynamicReportTypes,
    reportTypesInternet: internetReportStats,
    reportTypesNonInternet: nonInternetReportStats,
    lastUpdate: '6 Des 2025' // Dynamic calculation means fresh data
};

export const articles = [
    {
        id: 1,
        title: "Pelanggaran Kode Etik Pemasaran Susu Formula Meningkat di Era Digital",
        title_en: "Violations of Formula Milk Marketing Code Increase in Digital Era",
        excerpt: "Laporan terbaru menunjukkan peningkatan signifikan dalam promosi terselubung melalui media sosial dan influencer.",
        excerpt_en: "Recent reports show a significant increase in covert promotion through social media and influencers.",
        date: "5 Desember 2025",
        image: "https://placehold.co/600x400",
        author: "Tim Redaksi"
    },
    {
        id: 2,
        title: "Mengapa ASI Eksklusif Penting untuk 6 Bulan Pertama?",
        title_en: "Why Exclusive Breastfeeding is Important for the First 6 Months?",
        excerpt: "Penjelasan medis dan psikologis mengenai manfaat ASI eksklusif bagi tumbuh kembang bayi dan kesehatan ibu.",
        excerpt_en: "Medical and psychological explanation regarding the benefits of exclusive breastfeeding for infant growth and maternal health.",
        date: "2 Desember 2025",
        image: "https://placehold.co/600x400",
        author: "Dr. Siti Aminah"
    },
    {
        id: 3,
        title: "Cara Melaporkan Pelanggaran Kode Etik di Fasilitas Kesehatan",
        title_en: "How to Report Code of Ethics Violations in Health Facilities",
        excerpt: "Panduan langkah demi langkah bagi masyarakat untuk melaporkan promosi susu formula yang tidak etis di rumah sakit dan klinik.",
        excerpt_en: "Step-by-step guide for the public to report unethical formula milk promotions in hospitals and clinics.",
        date: "28 November 2025",
        image: "https://placehold.co/600x400",
        author: "Admin"
    },
    {
        id: 4,
        title: "Dampak Iklan Susu Formula Terhadap Keputusan Ibu Menyusui",
        title_en: "Impact of Formula Milk Ads on Breastfeeding Mothers' Decisions",
        excerpt: "Studi kasus mengenai bagaimana paparan iklan mempengaruhi kepercayaan diri ibu dalam memberikan ASI eksklusif.",
        excerpt_en: "Case study on how ad exposure affects mothers' confidence in providing exclusive breastfeeding.",
        date: "25 November 2025",
        image: "https://placehold.co/600x400",
        author: "Dr. Budi Santoso"
    },
    {
        id: 5,
        title: "Peran Tenaga Kesehatan dalam Mendukung ASI Eksklusif",
        title_en: "The Role of Health Workers in Supporting Exclusive Breastfeeding",
        excerpt: "Tenaga kesehatan memiliki peran krusial dalam memberikan edukasi yang benar dan tidak bias mengenai nutrisi bayi.",
        excerpt_en: "Health workers have a crucial role in providing correct and unbiased education regarding infant nutrition.",
        date: "20 November 2025",
        image: "https://placehold.co/600x400",
        author: "Bidan Ani"
    },
    {
        id: 6,
        title: "Mengenal Kode Etik Internasional Pemasaran Pengganti ASI",
        title_en: "Getting to Know the International Code of Marketing of Breast-milk Substitutes",
        excerpt: "Sejarah dan tujuan utama dari Kode WHO yang bertujuan melindungi praktik menyusui di seluruh dunia.",
        excerpt_en: "History and main objectives of the WHO Code aimed at protecting breastfeeding practices worldwide.",
        date: "15 November 2025",
        image: "https://placehold.co/600x400",
        author: "Tim Edukasi"
    },
    {
        id: 7,
        title: "Mitos dan Fakta Seputar Susu Formula",
        title_en: "Myths and Facts Surrounding Formula Milk",
        excerpt: "Mengupas tuntas berbagai mitos yang beredar di masyarakat mengenai keunggulan susu formula dibandingkan ASI.",
        excerpt_en: "Thoroughly debunking various myths circulating in society regarding the superiority of formula milk compared to breast milk.",
        date: "10 November 2025",
        image: "https://placehold.co/600x400",
        author: "Ahli Gizi Rina"
    },
    {
        id: 8,
        title: "Dukungan Ayah dalam Keberhasilan Menyusui",
        title_en: "Father's Support in Breastfeeding Success",
        excerpt: "Bagaimana peran aktif ayah dapat meningkatkan tingkat keberhasilan dan durasi pemberian ASI.",
        excerpt_en: "How active father involvement can increase the success rate and duration of breastfeeding.",
        date: "5 November 2025",
        image: "https://placehold.co/600x400",
        author: "Komunitas Ayah ASI"
    },
    {
        id: 9,
        title: "Regulasi Pemerintah Indonesia Terkait Pemasaran Susu Formula",
        title_en: "Indonesian Government Regulations Regarding Formula Milk Marketing",
        excerpt: "Tinjauan hukum mengenai peraturan yang berlaku di Indonesia untuk mengawasi pemasaran produk pengganti ASI.",
        excerpt_en: "Legal review of regulations in force in Indonesia to supervise the marketing of breast milk substitute products.",
        date: "1 November 2025",
        image: "https://placehold.co/600x400",
        author: "LBH Kesehatan"
    },
    {
        id: 10,
        title: "Nutrisi Penting dalam ASI yang Tidak Ada di Susu Formula",
        title_en: "Essential Nutrients in Breast Milk Not Found in Formula Milk",
        excerpt: "Penjelasan mendalam mengenai komponen bioaktif dalam ASI yang tidak dapat ditiru oleh produk buatan manusia.",
        excerpt_en: "In-depth explanation of bioactive components in breast milk that cannot be replicated by man-made products.",
        date: "28 Oktober 2025",
        image: "https://placehold.co/600x400",
        author: "Dr. Citra Sp.A"
    },
    {
        id: 11,
        title: "Strategi Menghadapi Tekanan Pemasaran Susu Formula",
        title_en: "Strategies to Face Formula Milk Marketing Pressure",
        excerpt: "Tips bagi orang tua baru untuk tetap teguh memberikan ASI di tengah gempuran promosi produk pengganti ASI.",
        excerpt_en: "Tips for new parents to remain firm in providing breast milk amidst the onslaught of breast milk substitute product promotions.",
        date: "25 Oktober 2025",
        image: "https://placehold.co/600x400",
        author: "Konselor Laktasi"
    },
    {
        id: 12,
        title: "Pentingnya Inisiasi Menyusu Dini (IMD)",
        title_en: "The Importance of Early Initiation of Breastfeeding (IMD)",
        excerpt: "Manfaat jangka panjang dari kontak kulit-ke-kulit segera setelah lahir bagi ibu dan bayi.",
        excerpt_en: "Long-term benefits of skin-to-skin contact immediately after birth for mother and baby.",
        date: "20 Oktober 2025",
        image: "https://placehold.co/600x400",
        author: "Bidan Sari"
    }
];
