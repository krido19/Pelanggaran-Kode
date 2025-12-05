import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app_language') || 'id';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
    };

    // Dictionary of static UI text
    const translations = {
        id: {
            nav: {
                home: 'BERANDA',
                statistics: 'STATISTIK',
                articles: 'ARTIKEL',
                about: 'TENTANG KAMI',
                dashboard: 'DASHBOARD'
            },
            home: {
                report_btn: 'Laporkan Pelanggaran',
                learn_more_btn: 'Pelajari Selengkapnya',
                view_all_articles: 'Lihat Semua Artikel',
                supported_by: 'Didukung oleh',
                whatsapp_report: 'Whatsapp',
                bot_credit: 'BOT 2024 by SSTEKNO',
                bot_privacy: 'Laporan Anda akan diverifikasi lalu didokumentasikan. Kami akan meneruskan laporan anda ke pemerintah daerah serta menyampaikannya ke WHA tahunan untuk tindak lanjut lebih jauh. Semua informasi yang anda berikan dijaga kerahasiaannya.'
            },
            stats: {
                verified: 'Laporan Terverifikasi',
                unverified: 'Belum Diverifikasi',
                rejected: 'Laporan Ditolak',
                total: 'Total Laporan Masuk',
                cta_button: 'Lihat Halaman Statistik'
            },
            footer: {
                quick_links: 'Tautan Cepat',
                contact: 'Hubungi Kami',
                privacy: 'Kebijakan Privasi',
                terms: 'Syarat & Ketentuan',
                rights: 'Hak Cipta Dilindungi.'
            }
        },
        en: {
            nav: {
                home: 'HOME',
                statistics: 'STATISTICS',
                articles: 'ARTICLES',
                about: 'ABOUT US',
                dashboard: 'DASHBOARD'
            },
            home: {
                report_btn: 'Report Violation',
                learn_more_btn: 'Learn More',
                view_all_articles: 'View All Articles',
                supported_by: 'Supported by',
                whatsapp_report: 'Whatsapp',
                bot_credit: 'BOT 2024 by SSTEKNO',
                bot_privacy: 'Your report will be verified then documented. We will forward your report to local government as well as submit it to the annual WHA for further follow up. All information you provided is kept confidential.'
            },
            stats: {
                verified: 'Verified Reports',
                unverified: 'Unverified',
                rejected: 'Rejected Reports',
                total: 'Total Reports Received',
                cta_button: 'View Statistics Page'
            },
            footer: {
                quick_links: 'Quick Links',
                contact: 'Contact Us',
                privacy: 'Privacy Policy',
                terms: 'Terms & Conditions',
                rights: 'All Rights Reserved.'
            }
        }
    };

    // Helper to get localized content from localStorage
    // Falls back to Indonesian if specific language key is missing
    const getLocalizedContent = (key, defaultText = '') => {
        // Construct keys for specific language: e.g., 'hero_title_en' vs 'hero_title' (which implies id)
        const storageKey = language === 'en' ? `${key}_en` : key;
        const fallbackKey = key; // usually the ID version is the base key

        return localStorage.getItem(storageKey) || localStorage.getItem(fallbackKey) || defaultText;
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, getLocalizedContent }}>
            {children}
        </LanguageContext.Provider>
    );
};
