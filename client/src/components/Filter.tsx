import React from 'react';
import { FunnelIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

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
}) => (
    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-xl p-2 shadow-lg text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            {/* Date Inputs in One Row */}
            <div className="flex items-center w-full gap-1">
                <div className="flex flex-col text-sm">
                    <label className="mb-1 text-gray-400">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
                <div className="flex flex-col text-sm">
                    <label className="mb-1 text-gray-400">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleFilter}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                    <FunnelIcon className="w-4 h-4" />
                    Filter
                </button>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                    Download Report
                </button>
            </div>
        </div>
    </div>
);

export default TransactionFilter;
