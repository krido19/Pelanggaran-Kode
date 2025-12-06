import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#004d4d] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Identity */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-teal-400 mb-6 block">
                            Pantau<br />Etika.org
                        </Link>
                        <p className="font-bold mb-4">Koalisi Kesehatan Ibu dan Anak</p>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:info@pantauetika.org" className="hover:text-white">info@pantauetika.org</a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 flex-shrink-0" />
                                <p>Jakarta, Indonesia</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a href="#" className="inline-block p-2 border border-white rounded hover:bg-white hover:text-teal-900 transition">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">{t.footer.quick_links}</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li><Link to="/about" className="hover:text-white transition">{t.nav.about}</Link></li>
                            <li><Link to="/statistics" className="hover:text-white transition">{t.nav.statistics}</Link></li>
                            <li><Link to="/articles" className="hover:text-white transition">{t.nav.articles}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Recent Articles */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">{t.nav.articles}</h3>
                        <ul className="space-y-4 text-gray-300 text-sm">
                            <li>
                                <Link to="/articles/1" className="hover:text-white transition block">
                                    Dampak Iklan Susu Formula Terhadap Kesehatan Bayi
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles/2" className="hover:text-white transition block">
                                    Memahami Kode Etik Pemasaran Internasional
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles/3" className="hover:text-white transition block">
                                    Pentingnya Dukungan Menyusui di Tempat Kerja
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-teal-800 pt-8 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} pantauetika.org {t.footer.rights}</p>
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-300 text-xs mt-2 md:mt-0 opacity-50 hover:opacity-100">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
