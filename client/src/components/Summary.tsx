import React from 'react';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { calculateSummary } from '../utils/summary';
import { useTransactionStore } from '../store/useTransactionStore';

const TransactionSummary: React.FC = () => {
    const { allTransactions } = useTransactionStore();

    const summary = calculateSummary(allTransactions);

    return (
        <div className="flex flex-row gap-4">
            {/* Monthly Totals */}
            <div className="flex-1 bg-gradient-to-br from-blue-800 to-blue-700 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-sm font-bold mb-4 text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-cyan-300" />
                    Monthly Totals
                </h2>
                <div className="space-y-2">
                    {Object.entries(summary.monthly).map(([month, total]) => (
                        <div
                            key={month}
                            className="flex justify-between items-center bg-blue-900 hover:bg-blue-800 px-3 py-2 rounded-md transition text-sm"
                        >
                            <span className="capitalize">{month}</span>
                            <span className="font-bold text-green-300">₹{total}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Yearly Totals */}
            <div className="flex-1 bg-gradient-to-br from-purple-800 to-purple-700 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-sm font-bold mb-4 text-white flex items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-pink-300" />
                    Yearly Totals
                </h2>
                <div className="space-y-2">
                    {Object.entries(summary.yearly).map(([year, total]) => (
                        <div
                            key={year}
                            className="flex justify-between items-center bg-purple-900 hover:bg-purple-800 px-3 py-2 rounded-md transition text-sm"
                        >
                            <span>{year}</span>
                            <span className="font-bold text-yellow-300">₹{total}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TransactionSummary;
