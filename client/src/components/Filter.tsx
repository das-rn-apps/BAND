import React, { useState } from 'react';
import { FunnelIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Props {
    startDate: string;
    endDate: string;
    setStartDate: (v: string) => void;
    setEndDate: (v: string) => void;
    handleFilter: () => void;
    handleExport: () => void;
}

const TransactionFilter: React.FC<Props> = ({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handleFilter,
    handleExport,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleApplyFilter = () => {
        handleFilter();
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-2 shadow-xl text-white transition-all">
                <div className="flex flexrow items-center justify-between">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition"
                    >
                        <FunnelIcon className="w-5 h-5" />
                        Filter
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition"
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        Download Report
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6 w-full max-w-md text-white relative shadow-lg animate-fade-in">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-300 hover:text-white"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <h2 className="text-lg font-semibold mb-4">Filter Transactions</h2>

                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="text-sm text-gray-300 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500 transition"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApplyFilter}
                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionFilter;
