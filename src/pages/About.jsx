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
                        {getLocalizedContent('about_hero_title', "Building healthy generations")}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 mb-12 font-light italic">
                        {getLocalizedContent('about_hero_subtitle', "Collectively stop marketing that undermines breastfeeding")}
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
                    <h2 className="text-3xl font-bold text-teal-600 mb-8">{getLocalizedContent('about_us_title', "About us")}</h2>
                    <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                        <p>
                            {getLocalizedContent('about_p1', "PelanggaranKode platform is established and managed by a collective initiative that focuses on children's health and nutrition and concerns about the unethical marketing of the industry and its affiliates")}
                        </p>
                        <p>
                            {getLocalizedContent('about_p2', "PelanggaranKode is a form of civil society participation to participate in guarding the implementation of the Code and related national regulations.")}
                        </p>
                        <p>
                            {getLocalizedContent('about_p3', "PelanggaranKode was established in late 2020 and effectively launched in mid-May 2021. Code Violation is managed collectively by the Indonesian Breastfeeding Mothers Association (AIMI), and Breastfeeding Fathers and supported by UNICEF Indonesia and the Maternal and Child Health Movement (GKIA).")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-teal-600 mb-8">{getLocalizedContent('team_title', "PelanggaranKode Team")}</h2>

                    <div className="mb-8">
                        <h3 className="font-bold text-gray-800 text-xl mb-2">{getLocalizedContent('team_founder_label', "Founding father:")}</h3>
                        <p className="text-gray-600 text-lg">Irma Hidayana</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-800 text-xl mb-4">{getLocalizedContent('team_manager_label', "Manager:")}</h3>
                        <div className="space-y-2 text-gray-600 text-lg">
                            <p>Lianita Prawindarti</p>
                            <p>Fitria Rosatriani</p>
                            <p>Nia Umar</p>
                            <p>Irma Hidayana</p>
                            <p>Kusmayra Ambarwati</p>
                            <p>Rahmat Hidayat</p>
                            <p>Reza Oscar</p>
                            <p>Veby Mayfriandi</p>
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
