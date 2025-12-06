import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { statsData } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

const StatisticsSidebar = () => {
    const { language } = useLanguage();

    // Stats Labels Translation
    const t = {
        id: {
            verified_reports: 'Laporan Terverifikasi',
            total_reports: 'Total Laporan',
            unverified_reports: 'Belum Diverifikasi',
            rejected_reports: 'Ditolak',
            age: 'Usia',
            age_suffix: 'tahun',
            gender: 'Jenis Kelamin',
            gender_female: 'Perempuan',
            gender_male: 'Laki-laki',
            platform: 'Platform Pelaporan',
            province_ranking: 'Provinsi pelaporan terbanyak (non-internet)',
            report_type: 'Jenis Pelaporan',
            latest_update: 'Pembaruan Terakhir'
        },
        en: {
            verified_reports: 'Verified reports',
            total_reports: 'Total reports',
            unverified_reports: 'Has not yet verified',
            rejected_reports: 'Rejected',
            age: 'Age',
            age_suffix: 'year old',
            gender: 'Gender',
            gender_female: 'Female',
            gender_male: 'Male',
            platform: 'Platform for Reporting',
            province_ranking: 'Province with the highest non-internet report',
            report_type: 'Report type',
            latest_update: 'Latest Update'
        }
    }[language];

    // LocalStorage Data (or mock fallback)
    const verified = localStorage.getItem('stats_verified') || statsData.verifiedReports;
    const unverified = localStorage.getItem('stats_unverified') || statsData.unverifiedReports;
    const rejected = localStorage.getItem('stats_rejected') || statsData.rejectedReports;

    // Parse complex stored data or use mock
    let ageDist = statsData.ageDistribution;
    let genderDist = statsData.genderDistribution;
    let platformDist = statsData.platformDistribution;
    let provinceRanking = statsData.provinceRanking;
    let internetTypes = statsData.reportTypesInternet || [];
    let nonInternetTypes = statsData.reportTypesNonInternet || [];

    // Attempt to load from localStorage if available (simple JSON check)
    try {
        const storedStats = localStorage.getItem('dashboard_stats');
        if (storedStats) {
            const parsed = JSON.parse(storedStats);
            if (parsed.ageDistribution) ageDist = parsed.ageDistribution;
            if (parsed.genderDistribution) genderDist = parsed.genderDistribution;
            if (parsed.platformDistribution) platformDist = parsed.platformDistribution;
            if (parsed.provinceRanking) provinceRanking = parsed.provinceRanking;
            if (parsed.reportTypesInternet) internetTypes = parsed.reportTypesInternet;
            if (parsed.reportTypesNonInternet) nonInternetTypes = parsed.reportTypesNonInternet;
        }
    } catch (e) {
        // Fallback to mock
    }

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full overflow-y-auto">
            {/* Header Stats */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-teal-600 mb-1">{verified}</h2>
                <p className="text-gray-600 font-medium mb-4">{t.verified_reports}</p>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle size={16} className="text-gray-400" />
                            <span>{t.total_reports}</span>
                        </div>
                        <span className="font-bold text-teal-600">{verified}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} className="text-gray-400" />
                            <span>{t.unverified_reports}</span>
                        </div>
                        <span className="font-bold text-orange-500">{unverified}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <XCircle size={16} className="text-gray-400" />
                            <span>{t.rejected_reports}</span>
                        </div>
                        <span className="font-bold text-red-500">{rejected}</span>
                    </div>
                </div>
            </div>

            {/* Age Distribution */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">{t.age}</h3>
                <div className="space-y-4">
                    {ageDist.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">{item.label}</span>
                                <span className="font-bold">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className="bg-teal-500 h-2 rounded-full"
                                    style={{ width: `${item.value}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Gender Distribution */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">{t.gender}</h3>
                <div className="flex h-4 rounded-full overflow-hidden mb-2">
                    <div className="bg-pink-500 h-full" style={{ width: `${genderDist.female}%` }}></div>
                    <div className="bg-teal-600 h-full" style={{ width: `${genderDist.male}%` }}></div>
                    <div className="bg-gray-300 h-full" style={{ width: `${genderDist.na}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-pink-500 rounded-sm"></div> {t.gender_female}</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-teal-600 rounded-sm"></div> {t.gender_male}</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-300 rounded-sm"></div> N/A</div>
                </div>
            </div>

            {/* Platform */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">{t.platform}</h3>
                <div className="space-y-4">
                    {platformDist.map((item, index) => (
                        <div key={index}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-gray-600">{item.label}</span>
                                <span className="font-bold">{item.value}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full ${item.label === 'WhatsApp' ? 'bg-green-500' : 'bg-blue-500'}`}
                                    style={{ width: `${item.value}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Province Ranking */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">{t.province_ranking}</h3>
                <div className="space-y-3">
                    {provinceRanking.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded text-xs font-bold text-gray-600">{item.rank}</span>
                                <span className="text-gray-700">{item.name}</span>
                            </div>
                            <span className="font-bold text-gray-800">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Report Types - Internet */}
            <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-l-4 border-blue-500 pl-2">
                    {language === 'id' ? 'Pelaporan Internet' : 'Internet Reports'}
                </h3>
                <div className="space-y-2">
                    {internetTypes.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                            <span className="text-gray-600 pr-4">{item.label}</span>
                            <span className="font-bold text-blue-600 whitespace-nowrap">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Report Types - Non-Internet */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide border-l-4 border-green-500 pl-2">
                    {language === 'id' ? 'Pelaporan Luar Jaringan' : 'Non-Internet Reports'}
                </h3>
                <div className="space-y-2">
                    {nonInternetTypes.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                            <span className="text-gray-600 pr-4">{item.label}</span>
                            <span className="font-bold text-green-600 whitespace-nowrap">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                {t.latest_update}: {statsData.lastUpdate}
            </div>
        </div>
    );
};

export default StatisticsSidebar;
