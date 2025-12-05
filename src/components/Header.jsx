import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClass = isHome && !isScrolled
        ? "fixed top-0 w-full z-50 transition-all duration-300 bg-transparent"
        : "sticky top-0 w-full z-50 transition-all duration-300 bg-white shadow-sm";

    const textColorClass = isHome && !isScrolled ? "text-white" : "text-teal-600";
    const logoTextClass = isHome && !isScrolled ? "text-white" : "text-teal-500";
    const logoSuffixClass = isHome && !isScrolled ? "text-teal-100" : "text-gray-700";
    const navLinkClass = isHome && !isScrolled
        ? "text-white font-bold text-sm tracking-wide hover:text-teal-200"
        : "text-teal-600 font-bold text-sm tracking-wide hover:text-teal-800";

    return (
        <header className={headerClass}>
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link to="/" className="flex flex-col leading-tight">
                    <span className={`text-2xl font-bold ${logoTextClass}`}>Pelanggaran</span>
                    <span className={`text-2xl font-bold ${logoSuffixClass}`}>Kode.org</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={navLinkClass}>{t.nav.home}</Link>
                    <Link to="/statistics" className={navLinkClass}>{t.nav.statistics}</Link>
                    <Link to="/articles" className={navLinkClass}>{t.nav.articles}</Link>
                    <Link to="/about" className={navLinkClass}>{t.nav.about}</Link>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        title={language === 'id' ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
                    >
                        <img
                            src={language === 'id'
                                ? "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"}
                            alt={language === 'id' ? "Indonesia" : "English"}
                            className="h-4 w-6 shadow-sm object-cover rounded-sm"
                        />
                        <span className={`text-xs font-bold ${isHome && !isScrolled ? 'text-white' : 'text-gray-600'}`}>
                            {language === 'id' ? 'ID' : 'EN'}
                        </span>
                    </button>
                    {/* Dashboard Link for easy access */}
                    <Link to="/dashboard" className={`bg-teal-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-teal-700 transition shadow-md`}>
                        {t.nav.dashboard}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden p-2 ${isHome && !isScrolled ? 'text-white' : 'text-gray-600'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 flex flex-col space-y-4 shadow-lg">
                    <Link to="/" className="text-teal-600 font-bold text-sm" onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
                    <Link to="/statistics" className="text-teal-600 font-bold text-sm" onClick={() => setIsOpen(false)}>{t.nav.statistics}</Link>
                    <Link to="/articles" className="text-teal-600 font-bold text-sm" onClick={() => setIsOpen(false)}>{t.nav.articles}</Link>
                    <Link to="/about" className="text-teal-600 font-bold text-sm" onClick={() => setIsOpen(false)}>{t.nav.about}</Link>
                    <button
                        onClick={() => { toggleLanguage(); setIsOpen(false); }}
                        className="flex items-center gap-2 text-teal-600 font-bold text-sm"
                    >
                        <img
                            src={language === 'id'
                                ? "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg"
                                : "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"}
                            alt={language === 'id' ? "Indonesia" : "English"}
                            className="h-4 w-6 shadow-sm object-cover rounded-sm"
                        />
                        {language === 'id' ? 'Bahasa Indonesia' : 'English'}
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
