import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#004d4d] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Column 1: Identity */}
                    <div>
                        <Link to="/" className="text-2xl font-bold text-teal-400 mb-6 block">
                            Pelanggaran<br />Kode.org
                        </Link>
                        <p className="font-bold mb-4">Koalisi Warga untuk Kesehatan Anak</p>

                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Mail size={16} />
                                <a href="mailto:pelanggarankode@gmail.com" className="hover:text-white">pelanggarankode@gmail.com</a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1 flex-shrink-0" />
                                <p>Bona Indah Plaza, Lebak Bulus, DKI Jakarta, INDONESIA</p>
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
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Pelanggaran Kode</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                            <li><Link to="/statistics" className="hover:text-white transition">Statistics</Link></li>
                            <li><Link to="/articles" className="hover:text-white transition">Articles</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Recent Articles */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">Artikel</h3>
                        <ul className="space-y-4 text-gray-300 text-sm">
                            <li>
                                <Link to="/articles/1" className="hover:text-white transition block">
                                    Zig-Zag Susu Formula di Tengah Pandemi
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles/2" className="hover:text-white transition block">
                                    Produsen Susu Formula Tidak Takut pada Kode Etik Internasional
                                </Link>
                            </li>
                            <li>
                                <Link to="/articles/3" className="hover:text-white transition block">
                                    Milking It – Bagaimana Perusahaan Susu Formula Menempatkan Keuntungan Sebelum Sains
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-teal-800 pt-8 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} pelanggarankode.org All rights reserved</p>
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-300 text-xs mt-2 md:mt-0 opacity-50 hover:opacity-100">Admin Login</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
