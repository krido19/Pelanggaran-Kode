import React, { useState } from 'react';
import { Upload, MapPin } from 'lucide-react';

const Report = () => {
    const [formData, setFormData] = useState({
        violationType: '',
        description: '',
        location: '',
        evidence: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Terima kasih! Laporan Anda akan kami proses.');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Lapor Pelanggaran</h1>
                <p className="text-gray-600 mb-8">
                    Silakan isi formulir di bawah ini untuk melaporkan dugaan pelanggaran kode etik pemasaran produk pengganti ASI. Identitas Anda akan kami rahasiakan.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jenis Pelanggaran
                        </label>
                        <select
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={formData.violationType}
                            onChange={(e) => setFormData({ ...formData, violationType: e.target.value })}
                            required
                        >
                            <option value="">Pilih jenis pelanggaran...</option>
                            <option value="promotion_health_facility">Promosi di Fasilitas Kesehatan</option>
                            <option value="free_samples">Pemberian Sampel Gratis</option>
                            <option value="gifts_health_workers">Hadiah untuk Tenaga Kesehatan</option>
                            <option value="misleading_claims">Klaim Menyesatkan pada Label</option>
                            <option value="social_media_ad">Iklan di Media Sosial</option>
                            <option value="other">Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lokasi Kejadian
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Nama RS, Toko, atau Platform Online"
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Deskripsi Kejadian
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Jelaskan detail pelanggaran yang Anda temukan..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bukti Foto/Screenshot
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition cursor-pointer">
                            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                            <p className="text-sm text-gray-500">
                                Klik untuk unggah atau seret file ke sini
                            </p>
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => setFormData({ ...formData, evidence: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition"
                    >
                        Kirim Laporan
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Report;
