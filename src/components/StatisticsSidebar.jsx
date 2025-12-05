import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { statsData } from '../data/mockData';

const StatisticsSidebar = () => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full overflow-y-auto">
            {/* Header Stats */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-teal-600 mb-1">{statsData.verifiedReports}</h2>
                <p className="text-gray-600 font-medium mb-4">Verified reports</p>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <CheckCircle size={16} className="text-gray-400" />
                            <span>Total reports</span>
                        </div>
                        <span className="font-bold text-teal-600">{statsData.verifiedReports}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Clock size={16} className="text-gray-400" />
                            <span>Has not yet verified</span>
                        </div>
                        <span className="font-bold text-orange-500">{statsData.unverifiedReports}</span>
                    </div>
                    <div className="border-b border-gray-100"></div>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <XCircle size={16} className="text-gray-400" />
                            <span>Rejected</span>
                        </div>
                        <span className="font-bold text-red-500">{statsData.rejectedReports}</span>
                    </div>
                </div>
            </div>

            {/* Age Distribution */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Age</h3>
                <div className="space-y-4">
                    {statsData.ageDistribution.map((item, index) => (
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
                <h3 className="font-bold text-gray-800 mb-4">Gender</h3>
                <div className="flex h-4 rounded-full overflow-hidden mb-2">
                    <div className="bg-pink-500 h-full" style={{ width: '86.6%' }}></div>
                    <div className="bg-teal-600 h-full" style={{ width: '10%' }}></div>
                    <div className="bg-gray-300 h-full" style={{ width: '3.4%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-pink-500 rounded-sm"></div> Female</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-teal-600 rounded-sm"></div> Male</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 bg-gray-300 rounded-sm"></div> N/A</div>
                </div>
            </div>

            {/* Platform */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Platform for Reporting</h3>
                <div className="space-y-4">
                    {statsData.platformDistribution.map((item, index) => (
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
                <h3 className="font-bold text-gray-800 mb-4">Province with the highest non-internet report</h3>
                <div className="space-y-3">
                    {statsData.provinceRanking.map((item, index) => (
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

            {/* Report Types */}
            <div className="mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Report type</h3>
                <div className="space-y-3">
                    {statsData.reportTypes.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                            <span className="text-gray-600 pr-4">{item.label}</span>
                            <span className="font-bold text-teal-600 whitespace-nowrap">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-xs text-gray-400 pt-4 border-t border-gray-100">
                Latest Update: {statsData.lastUpdate}
            </div>
        </div>
    );
};

export default StatisticsSidebar;
