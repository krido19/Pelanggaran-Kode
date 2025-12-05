import React, { useState } from 'react';
import { articles } from '../data/mockData';

const Articles = () => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6); // Default to 6 for grid layout
    const [goToPage, setGoToPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(articles.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentArticles = articles.slice(indexOfFirstItem, indexOfLastItem);

    // Handlers
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            setGoToPage(pageNumber);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleGoToPage = () => {
        const pageNumber = parseInt(goToPage);
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            handlePageChange(pageNumber);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-teal-700 mb-4">Articles</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Latest news, updates, and educational resources about the International Code of Marketing of Breastmilk Substitutes.
                    </p>
                </div>

                {/* Search/Filter Mock */}
                <div className="max-w-md mx-auto mb-12">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                        />
                        <button className="absolute right-3 top-3 text-gray-400 hover:text-teal-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {currentArticles.map((article) => (
                        <div key={article.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-xs text-gray-500 mb-2 uppercase font-semibold tracking-wider">
                                    {article.date}
                                </div>
                                <h3 className="text-xl font-bold text-teal-700 mb-3 leading-tight hover:text-teal-800 transition">
                                    <a href="#">{article.title}</a>
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3 text-sm flex-1">
                                    {article.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center text-sm text-gray-500">
                                    <span>By {article.author}</span>
                                    <a href="#" className="text-teal-600 font-medium hover:underline">Read More →</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 pt-8">
                    {/* Show Items Per Page */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Show</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="border border-teal-500 text-teal-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                            <option value={6}>6</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    {/* Page Navigation */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center rounded border border-teal-200 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`w-8 h-8 flex items-center justify-center rounded font-medium transition ${currentPage === page
                                        ? 'bg-teal-600 text-white'
                                        : 'text-teal-600 hover:bg-teal-50'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 flex items-center justify-center rounded border border-teal-200 text-teal-600 hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            &gt;
                        </button>
                    </div>

                    {/* Go To Page */}
                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Go to page:</span>
                        <input
                            type="number"
                            min="1"
                            max={totalPages}
                            value={goToPage}
                            onChange={(e) => setGoToPage(e.target.value)}
                            className="w-16 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                        <button
                            onClick={handleGoToPage}
                            className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 transition"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Articles;
