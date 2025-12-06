import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Calendar, User } from 'lucide-react';
import { articles, statsData } from '../data/mockData';
import Map from '../components/Map';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const showArticles = localStorage.getItem('show_articles') !== 'false';
    const showSupporters = localStorage.getItem('show_supporters') !== 'false';
    const { t, getLocalizedContent, language } = useLanguage();

    return (
        <div className="space-y-12 pb-12 bg-gray-50">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center -mt-20">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={localStorage.getItem('heroImage') || "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=2070&auto=format&fit=crop"}
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 pt-20">
                    <div className="max-w-2xl">
                        <p className="text-gray-500 text-lg mb-2 font-medium">
                            {getLocalizedContent('hero_subtitle_v2', "Portal Pemantauan Independen")}
                        </p>
                        <h1 className="text-4xl md:text-6xl font-bold text-teal-800 leading-tight mb-6"
                            dangerouslySetInnerHTML={{ __html: getLocalizedContent('hero_title_v2', "Pengawasan Etika Pemasaran<br />Produk Nutrisi Bayi") }}
                        />
                        <div className="mb-8">
                            <span className="bg-teal-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md">
                                {localStorage.getItem('hero_ver_v2') || "Edisi Terbaru 2025"}
                            </span>
                        </div>
                        <p className="text-gray-700 text-xl mb-10 leading-relaxed max-w-xl">
                            {getLocalizedContent('hero_desc_v2', "Bersama melindungi hak kesehatan ibu dan anak dari pengaruh pemasaran produk pengganti ASI yang tidak etis dan menyesatkan publik.")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/report"
                                className="bg-teal-600 text-white px-8 py-4 rounded-full font-bold hover:bg-teal-700 transition text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {getLocalizedContent('hero_btn_primary_v2', "Ajukan Laporan")}
                            </Link>
                            <Link
                                to="/about"
                                className="bg-white text-teal-600 border-2 border-teal-600 px-8 py-4 rounded-full font-bold hover:bg-teal-50 transition text-center shadow-md hover:shadow-lg"
                            >
                                {getLocalizedContent('hero_btn_secondary_v2', "Pelajari Kode Etik")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section 1: What is the Code? */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/3">
                            <img
                                src={localStorage.getItem('info1_image') || "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop"}
                                alt="Code Book"
                                className="w-full h-auto rounded-lg shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-500"
                            />
                        </div>
                        <div className="w-full md:w-2/3">
                            <h2 className="text-3xl font-bold text-teal-600 mb-6">
                                {getLocalizedContent('info1_title_v2', "Apa itu Kode Etik Pemasaran Internasional?")}
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                                {(getLocalizedContent('info1_content_v2', "Kode Etik ini adalah kerangka kerja global yang bertujuan melindungi praktik pemberian ASI dengan mengatur tata cara pemasaran produk pengganti ASI agar tidak menyesatkan publik.\n\nSetiap negara anggota WHO direkomendasikan untuk mengadopsi Kode ini ke dalam instrumen hukum nasional.\n\nIndustri makanan bayi diwajibkan untuk mematuhi standar etika ini demi kesehatan generasi mendatang.")).split('\n\n').map((paragraph, idx) => (
                                    <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info Section 2: Why it is important? */}
            <section className="py-16 bg-teal-50">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h2 className="text-2xl font-bold text-teal-700 mb-6">
                        {getLocalizedContent('info2_title_v2', "Mengapa Hal Ini Kritis?")}
                    </h2>
                    <div className="text-gray-700 leading-relaxed text-lg space-y-4">
                        {(getLocalizedContent('info2_content_v2', "Kode ini hadir sebagai respons terhadap promosi agresif yang seringkali mengabaikan fakta ilmiah tentang keunggulan ASI, membahayakan kesehatan bayi di seluruh dunia.\n\n* Kode ini berlaku bersama dengan Resolusi WHA terkait")).split('\n\n').map((paragraph, idx) => (
                            <p key={idx} className={paragraph.startsWith('*') ? "text-teal-600 font-bold text-sm mt-4" : ""}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Section 3: WHA Resolutions */}
            <section className="relative py-20 text-white">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={localStorage.getItem('info3_bg') || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                        alt="WHA Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-teal-900/90"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold mb-4">
                                {getLocalizedContent('info3_title_v2', "Resolusi WHA Terkait")}
                            </h2>
                            <p className="text-teal-100 text-lg">
                                {getLocalizedContent('info3_subtitle_v2', "Landasan Hukum Internasional untuk perlindungan nutrisi bayi dan anak.")}
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20">
                            <h3 className="font-bold text-xl mb-6 border-b border-white/20 pb-4">Daftar Resolusi Penting</h3>
                            <ul className="space-y-3 text-sm md:text-base">
                                {(getLocalizedContent('info3_list_v2', "Resolusi tentang Pemasaran Produk Pengganti ASI (1981...)\nPelarangan donasi produk ke fasilitas kesehatan\nMenghindari konflik kepentingan pada tenaga kesehatan\nRekomendasi ASI eksklusif 6 bulan dan MPASI yang aman (2001)\nStrategi Global Pemberian Makan Bayi dan Anak (2002)\nPengawasan klaim nutrisi dan kesehatan pada produk (2005)\nPenguatan monitoring dan penegakan hukum nasional (2008)\nMengakhiri promosi yang tidak pantas untuk makanan bayi hingga usia 3 tahun (2016)")).split('\n').map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="mt-1.5 w-1.5 h-1.5 bg-teal-300 rounded-full flex-shrink-0"></span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Section */}
            {showArticles && (
                <section className="container mx-auto px-4 py-16 bg-gray-50">
                    <h2 className="text-3xl font-bold text-teal-600 mb-12 text-center">{t.nav.articles}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {articles.map((article) => (
                            <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">
                                        {article.date}
                                    </div>
                                    <h3 className="text-lg font-bold text-teal-700 mb-3 line-clamp-2 leading-tight">
                                        {language === 'id' ? article.title : article.title_en}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">
                                        {language === 'id' ? article.excerpt : article.excerpt_en}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/articles"
                            className="border-2 border-teal-600 text-teal-600 px-8 py-3 rounded-full font-bold hover:bg-teal-50 transition"
                        >
                            {t.home.view_all_articles}
                        </Link>
                    </div>
                </section>
            )}

            {/* Chatbot Section */}
            <section className="relative min-h-[600px] flex items-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={localStorage.getItem('info4_image') || "https://placehold.co/1920x1080/1a202c/FFF?text=Phone+Mockup+Background"}
                        alt="Chatbot Background"
                        className="w-full h-full object-cover object-center"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-white/90 md:bg-gradient-to-r from-white via-white/90 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl py-16">
                        <p className="text-teal-600 font-medium mb-2 text-lg">
                            {getLocalizedContent('info4_subtitle_v2', "Mudah & Cepat")}
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold text-teal-800 mb-4 leading-tight">
                            {getLocalizedContent('info4_title_v2', "Laporkan Pelanggaran Kode Etik")}
                        </h2>
                        <p className="text-gray-500 mb-8 text-xl font-medium">
                            {getLocalizedContent('info4_desc_v2', "Kirim bukti foto dan lokasi melalui WhatsApp kami secara aman.")}
                        </p>

                        <a
                            href={localStorage.getItem('info4_link') || "https://wa.me/6281316548773"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                            {t.home.whatsapp_report}
                        </a>

                        <div className="mt-12 text-sm text-gray-500 max-w-md space-y-1">
                            <p className="font-bold text-teal-600">{t.home.bot_credit}</p>
                            <p className="font-medium">by SSTEKNO</p>
                            <p className="leading-relaxed opacity-80 pt-2">
                                {t.home.bot_privacy}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Preview Section */}
            <section className="relative h-[600px] bg-gray-100">
                {/* Stats Overlay */}
                <div className="absolute top-0 left-0 right-0 z-10 grid grid-cols-4 text-white">
                    <div className="bg-teal-800 p-6 text-center">
                        <h3 className="text-3xl font-bold mb-1">{statsData.verifiedReports}</h3>
                        <p className="text-sm font-medium">{t.stats.verified}</p>
                    </div>
                    <div className="bg-teal-600 p-6 text-center">
                        <h3 className="text-3xl font-bold mb-1">{statsData.unverifiedReports}</h3>
                        <p className="text-sm font-medium">{t.stats.unverified}</p>
                    </div>
                    <div className="bg-teal-500 p-6 text-center">
                        <h3 className="text-3xl font-bold mb-1">{statsData.rejectedReports}</h3>
                        <p className="text-sm font-medium">{t.stats.rejected}</p>
                    </div>
                    <div className="bg-teal-400 p-6 text-center">
                        <h3 className="text-3xl font-bold mb-1">{statsData.verifiedReports + statsData.unverifiedReports + statsData.rejectedReports}</h3>
                        <p className="text-sm font-medium">{t.stats.total}</p>
                    </div>
                </div>

                {/* Map Background */}
                <div className="h-full w-full pt-24 pb-20">
                    <Map />
                </div>

                {/* CTA Button Overlay */}
                <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
                    <Link
                        to="/statistics"
                        className="bg-teal-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-teal-800 transition shadow-lg"
                    >
                        {t.stats.cta_button}
                    </Link>
                </div>
            </section>

            {/* Supported By Section */}
            {showSupporters && (
                <section className="bg-teal-50 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-2xl font-bold text-teal-700 mb-12">
                            {getLocalizedContent('supported_title', t.home.supported_by)}
                        </h2>
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            {(() => {
                                const supportersList = JSON.parse(localStorage.getItem('supporters_list') || '[]');

                                if (supportersList.length > 0) {
                                    return supportersList.map((supporter) => (
                                        <div key={supporter.id} className="h-20 flex items-center justify-center p-2 opacity-80 hover:opacity-100 transition duration-300 cursor-pointer" title={supporter.name}>
                                            <img
                                                src={supporter.logo}
                                                alt={supporter.name}
                                                className="h-full w-auto object-contain max-w-[150px]"
                                            />
                                        </div>
                                    ));
                                }

                                return (
                                    <>
                                        {/* Default hardcoded logos if no custom ones exist */}
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <span className="text-2xl font-bold text-green-600">aimi</span>
                                        </div>
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <div className="bg-blue-400 text-white p-2 rounded-full font-bold">Ayah<br />ASI</div>
                                        </div>
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <div className="border-2 border-blue-900 rounded-full p-2 font-bold text-blue-900">IBFAN</div>
                                        </div>
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <span className="text-2xl font-bold text-red-600">GKIA</span>
                                        </div>
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <span className="text-2xl font-bold text-blue-500">unicef</span>
                                        </div>
                                        <div className="h-16 flex items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer">
                                            <span className="text-xl font-bold text-blue-600">DIKTISAINTEK<br />BERDAMPAK</span>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
