import React, { useState } from 'react';
import { CalendarIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { calculateSummary } from '../utils/summary';
import { useTransactionStore } from '../store/useTransactionStore';
import Spinner from './Spinner';
import Modal from './Modal';

const TransactionSummary: React.FC = () => {
    const { allTransactions, loading } = useTransactionStore();
    const summary = calculateSummary(allTransactions);

    const [showMonths, setShowMonths] = useState(false);
    const [showYears, setShowYears] = useState(false);

    const sortedMonths = Object.entries(summary.monthly).sort(
        ([a], [b]) => new Date(b).getTime() - new Date(a).getTime()
    );
    const sortedYears = Object.entries(summary.yearly).sort(
        ([a], [b]) => Number(b) - Number(a)
    );

    const latestMonth = sortedMonths[0];
    const latestYear = sortedYears[0];

    return (
        <div className="flex flex-row gap-2">
            {/* Monthly Totals */}
            <div
                className="flex-1 bg-gradient-to-br from-blue-800 to-blue-700 py-3 px-2 rounded-lg shadow-md hover:shadow-lg transition text-center cursor-pointer"
                onClick={() => setShowMonths(true)}
            >
                <h2 className="text-sm font-bold mb-3 text-white flex justify-center items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-cyan-300" />
                    Monthly
                </h2>
                <p className="text-xs text-gray-300 mb-1">Month: {latestMonth?.[0]}</p>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="bg-blue-900 p-1 rounded-md transition text-lg">
                            <span className="font-bold text-green-300">
                                ₹{Number(latestMonth?.[1] || 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </>
                )}
            </div>


            {/* Yearly Totals */}
            <div
                className="flex-1 bg-gradient-to-br from-purple-800 to-purple-700 py-3 px-2 rounded-lg shadow-md hover:shadow-lg transition text-center cursor-pointer"
                onClick={() => setShowYears(true)}
            >
                <h2 className="text-sm font-bold mb-3 text-white flex justify-center items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-pink-300" />
                    Yearly
                </h2>
                <p className="text-xs text-gray-300 mb-1">Year: {latestYear?.[0]}</p>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="bg-purple-900 p-1 rounded-md transition text-lg">
                            <span className="font-bold text-yellow-300">
                                ₹{Number(latestYear?.[1] || 0).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </>
                )}
            </div>


            {/* All Time Total */}
            <div className="flex-1 bg-gradient-to-br from-green-800 to-green-500 py-3 px-2 rounded-lg shadow-md hover:shadow-lg transition text-center">
                <h2 className="text-sm font-bold mb-3 text-white flex justify-center items-center gap-2">
                    <ChartBarIcon className="w-5 h-5 text-pink-300" />
                    All Time Total
                </h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="space-y-2">
                        <p className="text-xs text-gray-300 mb-1">
                            From:{' '}
                            {allTransactions.length > 0 && allTransactions[0]?.createdAt
                                ? new Date(allTransactions[0].createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                })
                                : 'N/A'}
                        </p>
                        <div className="bg-green-900 hover:bg-green-800 p-1 rounded-md transition text-lg">
                            <span className="font-bold text-yellow-300">
                                ₹{Number(summary.total).toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal for all months */}
            {showMonths && (
                <Modal title="All Monthly Totals" onClose={() => setShowMonths(false)}>
                    {sortedMonths.map(([month, total]) => (
                        <tr key={month}>
                            <td className="px-4 py-2">{month}</td>
                            <td className="px-4 py-2 text-right">₹{Number(total).toLocaleString('en-IN')}</td>
                        </tr>
                    ))}
                </Modal>

            )}

            {/* Modal for all years */}
            {showYears && (
                <Modal title="All Yearly Totals" onClose={() => setShowYears(false)}>
                    {sortedYears.map(([year, total]) => (
                        <tr key={year}>
                            <td className="px-4 py-2">{year}</td>
                            <td className="px-4 py-2 text-right">₹{Number(total).toLocaleString('en-IN')}</td>
                        </tr>

                    ))}
                </Modal>
            )}
        </div>
    );
};

export default TransactionSummary;
