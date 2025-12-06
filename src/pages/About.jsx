import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { getLocalizedContent } = useLanguage();

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Pattern Background */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d9488' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-teal-600 mb-4 italic">
                        {getLocalizedContent('about_hero_title', "Membangun Generasi Emas")}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 mb-12 font-light italic">
                        {getLocalizedContent('about_hero_subtitle', "Bersama mengawasi etika pemasaran produk nutrisi anak")}
                    </p>

                    <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={localStorage.getItem('about_hero_image') || "/images/about-hero.jpg"}
                            alt="Children playing in nature"
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* About Us Text Section */}
            <section className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8">{getLocalizedContent('about_us_title', "Tentang Kami")}</h2>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                        <p>
                            {getLocalizedContent('about_p1', "Inisiatif ini dibentuk oleh koalisi masyarakat sipil yang peduli terhadap kesehatan ibu dan anak, khususnya dalam aspek perlindungan pemberian ASI eksklusif dari pengaruh pemasaran yang tidak etis.")}
                        </p>
                        <p>
                            {getLocalizedContent('about_p2', "Kami berfungsi sebagai wadah partisipasi publik untuk memantau implementasi Kode Etik Internasional dan regulasi nasional terkait pemasaran produk pengganti ASI di Indonesia.")}
                        </p>
                        <p>
                            {getLocalizedContent('about_p3', "Didirikan pada tahun 2021, platform ini dikelola secara kolaboratif oleh berbagai organisasi kesehatan dan didukung oleh mitra internasional untuk memastikan setiap anak mendapatkan hak nutrisi terbaiknya.")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8">{getLocalizedContent('team_title', "Tim Kami")}</h2>

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">{getLocalizedContent('team_founder_label', "Koordinator Utama:")}</h3>
                        <p className="text-gray-600 text-lg">Dr. I. Hidayana</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 text-xl mb-4">{getLocalizedContent('team_manager_label', "Tim Pengelola:")}</h3>
                        <div className="space-y-2 text-gray-600 text-lg">
                            <p>L. Prawindarti</p>
                            <p>F. Rosatriani</p>
                            <p>N. Umar</p>
                            <p>Tim Advokasi & Riset</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Diagram Section */}
            <section className="container mx-auto px-4 py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <img
                        src="/images/about-process.png"
                        alt="PelanggaranKode Process Flow"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </section>
        </div>
    );
};

export default About;
