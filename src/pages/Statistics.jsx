import React from 'react';
import Map from '../components/Map';
import StatisticsSidebar from '../components/StatisticsSidebar';

const Statistics = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 h-[calc(100vh-100px)] min-h-[800px]">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Data & Statistik</h1>
                    <p className="text-gray-600">Pantau sebaran dan data pelanggaran kode etik pemasaran produk pengganti ASI.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-8">
                    {/* Map Section - Takes up 2 columns */}
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-800">Peta Sebaran</h2>
                            <div className="flex gap-2">
                                <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-teal-600"></div> Verified</span>
                                <span className="flex items-center gap-1 text-xs text-gray-500"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Unverified</span>
                            </div>
                        </div>
                        <div className="flex-grow relative">
                            <Map />
                        </div>
                    </div>

                    {/* Statistics Sidebar - Takes up 1 column */}
                    <div className="lg:col-span-1 h-full overflow-hidden">
                        <StatisticsSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
