import React, { useState, useEffect } from 'react';
import { statsData, mapMarkers } from '../data/mockData';
import { Save, Edit, Trash2, Plus, MapPin, X, RefreshCw, CheckCircle, AlertCircle, XCircle, RotateCcw } from 'lucide-react';
import Map from '../components/Map';
import { supabase } from '../lib/supabase';
import ContentEditor from '../components/dashboard/ContentEditor';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('stats');

    // Initialize Stats from LocalStorage or Mock Data
    const [stats, setStats] = useState(() => {
        const savedStats = localStorage.getItem('dashboard_stats');
        return savedStats ? JSON.parse(savedStats) : {
            ...statsData,
            reportTypesInternet: [],
            reportTypesNonInternet: []
        };
    });

    // Initialize Reports from LocalStorage or Mock Data
    const [reports, setReports] = useState(() => {
        const savedReports = localStorage.getItem('dashboard_reports');
        return savedReports ? JSON.parse(savedReports) : mapMarkers;
    });

    const [isEditingReport, setIsEditingReport] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);
    const [uploading, setUploading] = useState(false);

    // Filter & Pagination State
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Adjusted for card layout

    // Persist Stats to LocalStorage
    useEffect(() => {
        localStorage.setItem('dashboard_stats', JSON.stringify(stats));
    }, [stats]);

    // Persist Reports to LocalStorage
    useEffect(() => {
        localStorage.setItem('dashboard_reports', JSON.stringify(reports));
    }, [reports]);

    const handleResetData = () => {
        if (window.confirm('Are you sure you want to reset all data (Reports & Statistics) to default? This cannot be undone.')) {
            localStorage.removeItem('dashboard_stats');
            localStorage.removeItem('dashboard_reports');
            window.location.reload();
        }
    };

    const handleStatChange = (key, value) => {
        setStats({ ...stats, [key]: value });
    };

    const handleAgeDistChange = (index, newValue) => {
        const newAgeDist = [...stats.ageDistribution];
        newAgeDist[index].value = newValue;
        setStats({ ...stats, ageDistribution: newAgeDist });
    };

    const handleSyncStats = () => {
        // 1. Status Counts
        const verified = reports.filter(r => r.status === 'verified').length;
        const unverified = reports.filter(r => r.status === 'unverified').length;
        const rejected = reports.filter(r => r.status === 'rejected').length;

        // 2. Age Distribution
        const ageGroups = {
            '18-20 year old': 0,
            '21-25 Year old': 0,
            '25-30 year old': 0,
            '30-40 year old': 0,
            '40-55 year old': 0,
            '>55 year old': 0
        };

        let totalAges = 0;
        reports.forEach(r => {
            if (r.age) {
                totalAges++;
                if (r.age >= 18 && r.age <= 20) ageGroups['18-20 year old']++;
                else if (r.age >= 21 && r.age <= 25) ageGroups['21-25 Year old']++;
                else if (r.age >= 26 && r.age <= 30) ageGroups['25-30 year old']++;
                else if (r.age >= 31 && r.age <= 40) ageGroups['30-40 year old']++;
                else if (r.age >= 41 && r.age <= 55) ageGroups['40-55 year old']++;
                else if (r.age > 55) ageGroups['>55 year old']++;
            }
        });

        const newAgeDist = Object.keys(ageGroups).map(label => ({
            label,
            value: totalAges > 0 ? parseFloat(((ageGroups[label] / totalAges) * 100).toFixed(1)) : 0
        }));

        // 3. Gender Distribution
        let male = 0, female = 0, na = 0;
        reports.forEach(r => {
            if (r.gender === 'male') male++;
            else if (r.gender === 'female') female++;
            else na++;
        });
        const totalGender = male + female + na;
        const newGenderDist = {
            male: totalGender > 0 ? parseFloat(((male / totalGender) * 100).toFixed(1)) : 0,
            female: totalGender > 0 ? parseFloat(((female / totalGender) * 100).toFixed(1)) : 0,
            na: totalGender > 0 ? parseFloat(((na / totalGender) * 100).toFixed(1)) : 0
        };

        // 4. Province Ranking
        const provinceCounts = {};
        reports.forEach(r => {
            if (r.province) {
                provinceCounts[r.province] = (provinceCounts[r.province] || 0) + 1;
            }
        });
        const newProvinceRanking = Object.keys(provinceCounts)
            .map(name => ({ name, count: provinceCounts[name] }))
            .sort((a, b) => b.count - a.count)
            .map((item, index) => ({ ...item, rank: index + 1 }))
            .slice(0, 5); // Top 5

        // 5. Report Types (Split)
        const typeCountsInternet = {};
        const typeCountsNonInternet = {};

        reports.forEach(r => {
            if (r.reportType) {
                if (r.category === 'internet') {
                    typeCountsInternet[r.reportType] = (typeCountsInternet[r.reportType] || 0) + 1;
                } else {
                    typeCountsNonInternet[r.reportType] = (typeCountsNonInternet[r.reportType] || 0) + 1;
                }
            }
        });

        const newReportTypesInternet = Object.keys(typeCountsInternet).map(label => ({
            label,
            count: typeCountsInternet[label]
        })).sort((a, b) => b.count - a.count);

        const newReportTypesNonInternet = Object.keys(typeCountsNonInternet).map(label => ({
            label,
            count: typeCountsNonInternet[label]
        })).sort((a, b) => b.count - a.count);

        // 6. Platform Distribution
        const platformCounts = {};
        reports.forEach(r => {
            if (r.platform) {
                platformCounts[r.platform] = (platformCounts[r.platform] || 0) + 1;
            }
        });
        const totalPlatforms = Object.values(platformCounts).reduce((a, b) => a + b, 0);
        const newPlatformDist = Object.keys(platformCounts).map(label => ({
            label,
            value: totalPlatforms > 0 ? parseFloat(((platformCounts[label] / totalPlatforms) * 100).toFixed(1)) : 0
        }));

        setStats({
            ...stats,
            verifiedReports: verified,
            unverifiedReports: unverified,
            rejectedReports: rejected,
            ageDistribution: newAgeDist,
            genderDistribution: newGenderDist,
            provinceRanking: newProvinceRanking,
            reportTypesInternet: newReportTypesInternet,
            reportTypesNonInternet: newReportTypesNonInternet,
            platformDistribution: newPlatformDist
        });
        alert('All statistics synced with current reports data!');
    };

    // Report Handlers
    const handleEditReport = (report) => {
        setCurrentReport(report);
        setIsEditingReport(true);
    };

    const handleAddReport = () => {
        setCurrentReport({
            id: Date.now(),
            title: '',
            demographics: '',
            description: '',
            position: [-6.200000, 106.816666], // Default Jakarta
            originalCoords: '-6.200000, 106.816666',
            image: 'https://placehold.co/100x100',
            status: 'unverified',
            age: '',
            gender: 'female',
            province: '',
            platform: '',
            reportType: '',
            category: 'internet'
        });
        setIsEditingReport(true);
    };

    const handleSaveReport = () => {
        if (currentReport.id) {
            const existingIndex = reports.findIndex(r => r.id === currentReport.id);
            if (existingIndex >= 0) {
                const updatedReports = [...reports];
                updatedReports[existingIndex] = currentReport;
                setReports(updatedReports);
            } else {
                setReports([...reports, currentReport]);
            }
        }
        setIsEditingReport(false);
        setCurrentReport(null);
    };

    const handleDeleteReport = (id) => {
        if (window.confirm('Are you sure you want to delete this report?')) {
            setReports(reports.filter(r => r.id !== id));
        }
    };

    const handleReportChange = (key, value) => {
        setCurrentReport({ ...currentReport, [key]: value });
    };

    const handlePositionChange = (e) => {
        const coords = e.target.value.split(',').map(c => parseFloat(c.trim()));
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            setCurrentReport({
                ...currentReport,
                position: coords,
                originalCoords: e.target.value
            });
        } else {
            setCurrentReport({
                ...currentReport,
                originalCoords: e.target.value
            });
        }
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('evidence')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('evidence')
                .getPublicUrl(filePath);

            if (data) {
                setCurrentReport({ ...currentReport, image: data.publicUrl });
            }
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };


    // Filter Logic
    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.id.toString().includes(searchTerm) ||
            (report.province && report.province.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
    const currentReports = filteredReports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <button
                    onClick={handleResetData}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
                >
                    <RotateCcw size={18} /> Reset Data
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
                <button
                    className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'stats' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Statistics Data
                </button>
                <button
                    className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'reports' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('reports')}
                >
                    Manage Reports
                </button>
                <button
                    className={`px-6 py-3 font-medium whitespace-nowrap ${activeTab === 'content' ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('content')}
                >
                    Content Editor
                </button>
            </div>

            {/* Stats Editor */}
            {activeTab === 'stats' && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Edit Statistics</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSyncStats}
                                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition border border-blue-200"
                            >
                                <RefreshCw size={18} /> Sync from Reports
                            </button>
                            <button className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition">
                                <Save size={18} /> Save Changes
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Verified Reports</label>
                            <input
                                type="number"
                                value={stats.verifiedReports}
                                onChange={(e) => handleStatChange('verifiedReports', parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unverified Reports</label>
                            <input
                                type="number"
                                value={stats.unverifiedReports}
                                onChange={(e) => handleStatChange('unverifiedReports', parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rejected Reports</label>
                            <input
                                type="number"
                                value={stats.rejectedReports}
                                onChange={(e) => handleStatChange('rejectedReports', parseInt(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-4">Age Distribution</h3>
                        {stats.ageDistribution.map((item, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <input
                                    type="text"
                                    value={item.label}
                                    disabled
                                    className="w-1/3 p-2 bg-gray-50 border border-gray-200 rounded-lg"
                                />
                                <input
                                    type="number"
                                    value={item.value}
                                    onChange={(e) => handleAgeDistChange(index, parseFloat(e.target.value))}
                                    className="w-24 p-2 border border-gray-300 rounded-lg"
                                />
                                <span className="self-center text-gray-500">%</span>
                            </div>
                        ))}
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-700">Province Ranking</h3>
                            <button
                                onClick={() => {
                                    const newRanking = [
                                        ...stats.provinceRanking,
                                        { rank: stats.provinceRanking.length + 1, name: '', count: 0 }
                                    ];
                                    setStats({ ...stats, provinceRanking: newRanking });
                                }}
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                            >
                                <Plus size={14} /> Add Province
                            </button>
                        </div>
                        {stats.provinceRanking.map((item, index) => (
                            <div key={index} className="flex gap-4 mb-2">
                                <span className="self-center w-8 font-bold text-gray-500">{index + 1}</span>
                                <input
                                    type="text"
                                    value={item.name}
                                    onChange={(e) => {
                                        const newRanking = [...stats.provinceRanking];
                                        newRanking[index].name = e.target.value;
                                        setStats({ ...stats, provinceRanking: newRanking });
                                    }}
                                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                                    placeholder="Province Name"
                                />
                                <input
                                    type="number"
                                    value={item.count}
                                    onChange={(e) => {
                                        const newRanking = [...stats.provinceRanking];
                                        newRanking[index].count = parseInt(e.target.value);
                                        setStats({ ...stats, provinceRanking: newRanking });
                                    }}
                                    className="w-24 p-2 border border-gray-300 rounded-lg"
                                />
                                <button
                                    onClick={() => {
                                        const newRanking = stats.provinceRanking.filter((_, i) => i !== index);
                                        setStats({ ...stats, provinceRanking: newRanking });
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* Report Types - Internet */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-700">Report Types (Internet)</h3>
                                <button
                                    onClick={() => {
                                        const newTypes = [
                                            ...(stats.reportTypesInternet || []),
                                            { label: '', count: 0 }
                                        ];
                                        setStats({ ...stats, reportTypesInternet: newTypes });
                                    }}
                                    className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Type
                                </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto pr-2 border border-gray-100 rounded-lg p-2">
                                {(stats.reportTypesInternet || []).map((item, index) => (
                                    <div key={index} className="flex gap-4 mb-2">
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => {
                                                const newTypes = [...(stats.reportTypesInternet || [])];
                                                newTypes[index].label = e.target.value;
                                                setStats({ ...stats, reportTypesInternet: newTypes });
                                            }}
                                            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                                            placeholder="Type Name"
                                        />
                                        <input
                                            type="number"
                                            value={item.count}
                                            onChange={(e) => {
                                                const newTypes = [...(stats.reportTypesInternet || [])];
                                                newTypes[index].count = parseInt(e.target.value);
                                                setStats({ ...stats, reportTypesInternet: newTypes });
                                            }}
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <button
                                            onClick={() => {
                                                const newTypes = stats.reportTypesInternet.filter((_, i) => i !== index);
                                                setStats({ ...stats, reportTypesInternet: newTypes });
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {(stats.reportTypesInternet || []).length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-4">No internet report types.</p>
                                )}
                            </div>
                        </div>

                        {/* Report Types - Non-Internet */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-700">Report Types (Non-Internet)</h3>
                                <button
                                    onClick={() => {
                                        const newTypes = [
                                            ...(stats.reportTypesNonInternet || []),
                                            { label: '', count: 0 }
                                        ];
                                        setStats({ ...stats, reportTypesNonInternet: newTypes });
                                    }}
                                    className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                >
                                    <Plus size={14} /> Add Type
                                </button>
                            </div>
                            <div className="max-h-60 overflow-y-auto pr-2 border border-gray-100 rounded-lg p-2">
                                {(stats.reportTypesNonInternet || []).map((item, index) => (
                                    <div key={index} className="flex gap-4 mb-2">
                                        <input
                                            type="text"
                                            value={item.label}
                                            onChange={(e) => {
                                                const newTypes = [...(stats.reportTypesNonInternet || [])];
                                                newTypes[index].label = e.target.value;
                                                setStats({ ...stats, reportTypesNonInternet: newTypes });
                                            }}
                                            className="flex-1 p-2 border border-gray-300 rounded-lg text-sm"
                                            placeholder="Type Name"
                                        />
                                        <input
                                            type="number"
                                            value={item.count}
                                            onChange={(e) => {
                                                const newTypes = [...(stats.reportTypesNonInternet || [])];
                                                newTypes[index].count = parseInt(e.target.value);
                                                setStats({ ...stats, reportTypesNonInternet: newTypes });
                                            }}
                                            className="w-20 p-2 border border-gray-300 rounded-lg text-sm"
                                        />
                                        <button
                                            onClick={() => {
                                                const newTypes = stats.reportTypesNonInternet.filter((_, i) => i !== index);
                                                setStats({ ...stats, reportTypesNonInternet: newTypes });
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {(stats.reportTypesNonInternet || []).length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-4">No non-internet report types.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div >
            )}

            {/* Reports Manager */}
            {
                activeTab === 'reports' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* List & Form Column */}
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-bold text-gray-800">Reports List</h2>
                                        <button
                                            onClick={handleAddReport}
                                            className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                                        >
                                            <Plus size={18} /> Add Report
                                        </button>
                                    </div>

                                    {/* Search & Filter Controls */}
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="flex-1 relative">
                                            <input
                                                type="text"
                                                placeholder="Search reports..."
                                                value={searchTerm}
                                                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                            />
                                            <div className="absolute left-3 top-2.5 text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-48">
                                            <select
                                                value={filterStatus}
                                                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                                            >
                                                <option value="all">All Status</option>
                                                <option value="verified">Verified</option>
                                                <option value="unverified">Unverified</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Reports List (New Design) */}
                                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                                    {currentReports.length === 0 ? (
                                        <div className="text-center py-10 text-gray-500">
                                            No reports found matching your filters.
                                        </div>
                                    ) : (
                                        currentReports.map((report) => (
                                            <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition duration-200 group">
                                                <div className="flex gap-4">
                                                    {/* Thumbnail */}
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                        <img
                                                            src={report.image || 'https://placehold.co/100x100'}
                                                            alt="Report"
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                            onError={(e) => e.target.src = 'https://placehold.co/100x100?text=No+Img'}
                                                        />
                                                    </div>

                                                    {/* Content */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h3 className="font-bold text-gray-800 text-sm truncate pr-2" title={report.title}>
                                                                {report.title || 'Untitled Report'}
                                                            </h3>
                                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <button
                                                                    onClick={() => handleEditReport(report)}
                                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                                                    title="Edit"
                                                                >
                                                                    <Edit size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteReport(report.id)}
                                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 size={14} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                                                        ${report.status === 'verified' ? 'bg-green-100 text-green-700' :
                                                                    report.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                                                        'bg-yellow-100 text-yellow-700'}`}>
                                                                {report.status || 'unverified'}
                                                            </span>
                                                            <span className="text-xs text-gray-500 border-l border-gray-300 pl-2">
                                                                {report.category === 'internet' ? 'Internet' : 'Non-Internet'}
                                                            </span>
                                                            {report.province && (
                                                                <span className="text-xs text-gray-500 border-l border-gray-300 pl-2 flex items-center gap-1">
                                                                    <MapPin size={10} /> {report.province}
                                                                </span>
                                                            )}
                                                        </div>

                                                        <p className="text-xs text-gray-600 line-clamp-2">
                                                            {report.description || 'No description provided.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                                        <div className="text-sm text-gray-500">
                                            Page {currentPage} of {totalPages}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                                disabled={currentPage === 1}
                                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Previous
                                            </button>
                                            <button
                                                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                                disabled={currentPage === totalPages}
                                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Map & Edit Form Column */}
                        <div className="space-y-6">
                            {/* Map View */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[400px]">
                                <Map markers={reports} onMarkerClick={handleEditReport} />
                            </div>

                            {/* Edit Form */}
                            {isEditingReport && currentReport && (
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {currentReport.id ? 'Edit Report' : 'New Report'}
                                        </h2>
                                        <button
                                            onClick={() => setIsEditingReport(false)}
                                            className="text-gray-500 hover:text-gray-700"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={currentReport.title}
                                                onChange={(e) => handleReportChange('title', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Demographics</label>
                                            <input
                                                type="text"
                                                value={currentReport.demographics}
                                                onChange={(e) => handleReportChange('demographics', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                placeholder="e.g. Perempuan, 28 Tahun"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea
                                                value={currentReport.description}
                                                onChange={(e) => handleReportChange('description', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Coordinates (Lat, Lng)</label>
                                            <input
                                                type="text"
                                                value={currentReport.originalCoords}
                                                onChange={handlePositionChange}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                placeholder="-6.200000, 106.816666"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Format: Latitude, Longitude</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                value={currentReport.status || 'unverified'}
                                                onChange={(e) => handleReportChange('status', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                            >
                                                <option value="unverified">Unverified</option>
                                                <option value="verified">Verified</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                                <input
                                                    type="number"
                                                    value={currentReport.age || ''}
                                                    onChange={(e) => handleReportChange('age', parseInt(e.target.value))}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                    placeholder="e.g. 25"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                                <select
                                                    value={currentReport.gender || 'female'}
                                                    onChange={(e) => handleReportChange('gender', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                >
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                    <option value="na">N/A</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                                            <input
                                                type="text"
                                                value={currentReport.province || ''}
                                                onChange={(e) => handleReportChange('province', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-lg"
                                                placeholder="e.g. Jawa Barat"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
                                                <input
                                                    type="text"
                                                    value={currentReport.reportType || ''}
                                                    onChange={(e) => handleReportChange('reportType', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                    placeholder="e.g. Iklan di Media Sosial"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                                <select
                                                    value={currentReport.category || 'internet'}
                                                    onChange={(e) => handleReportChange('category', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                                >
                                                    <option value="internet">From Internet</option>
                                                    <option value="non-internet">Outside Internet</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Evidence Image</label>
                                            <div className="flex items-center gap-4">
                                                {currentReport.image && (
                                                    <img
                                                        src={currentReport.image}
                                                        alt="Preview"
                                                        className="w-16 h-16 object-cover rounded border border-gray-200"
                                                    />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    disabled={uploading}
                                                    className="block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-teal-50 file:text-teal-700
                                                    hover:file:bg-teal-100
                                                "
                                                />
                                            </div>
                                            {uploading && <p className="text-xs text-teal-600 mt-1">Uploading...</p>}
                                        </div>

                                        <div className="pt-4 flex justify-end gap-3">
                                            <button
                                                onClick={() => setIsEditingReport(false)}
                                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSaveReport}
                                                disabled={uploading}
                                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                                            >
                                                {uploading ? 'Uploading...' : 'Save Report'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Content Editor */}
            {
                activeTab === 'content' && (
                    <ContentEditor />
                )
            }
        </div >
    );
};

export default Dashboard;
