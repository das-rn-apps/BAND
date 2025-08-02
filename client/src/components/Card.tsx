import React from 'react';
import {
    BanknotesIcon,
    CheckCircleIcon,
    ClockIcon,
    ExclamationCircleIcon,
    PencilIcon,
} from '@heroicons/react/24/outline';
import { useAdminAuth } from '../store/useAdminAuth';
import { useTransactionStore } from '../store/useTransactionStore';
import type { TransanctionFormData } from '../types';


const TransactionCard: React.FC<TransanctionFormData> = ({
    _id,
    name,
    amount,
    transactionId,
    mode,
    purpose,
    createdAt,
    type,
    isVerified
}) => {
    const isDebit = (type || purpose)?.toLowerCase() === 'debit';
    const { isAdmin } = useAdminAuth();

    const { verifyTransaction, loading } = useTransactionStore();

    const handleVerifyToggle = () => {
        if (!_id) {
            console.warn("Transaction ID is missing");
            return;
        }

        const formattedAmount = `₹${amount.toLocaleString("en-IN")}`;

        const confirmMsg = isVerified
            ? `Are you sure you want to mark ${name}'s payment of ${formattedAmount} as Unverified?`
            : `Are you sure you want to mark ${name}'s payment of ${formattedAmount} as Verified?`;

        const confirmed = window.confirm(confirmMsg);
        if (!confirmed) return;

        verifyTransaction(_id, !isVerified);
    };


    return (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/80 px-3 py-2 rounded-md border border-gray-700 shadow-sm hover:shadow-md transition">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white truncate max-w-[120px]">{name}</span>
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                        <BanknotesIcon className="w-4 h-4" />
                        <span>{mode}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">

                    <div className="flex items-center gap-1 text-xs">
                        {isVerified ? (
                            <>
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    Verified
                                </span>
                            </>
                        ) : (
                            <>
                                <ExclamationCircleIcon className="w-4 h-4 text-yellow-500" />
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                    Pending
                                </span>
                            </>
                        )}
                    </div>


                    <div
                        className={`text-sm font-bold ${isDebit ? 'text-red-400' : 'text-green-400'
                            }`}
                    >
                        {isDebit ? '-' : '+'}₹{amount.toLocaleString('en-IN')}
                    </div>
                    {isAdmin && (
                        <button
                            onClick={handleVerifyToggle}
                            disabled={loading}
                            className={`ml-2 px-2 py-0.5 rounded text-xs font-medium transition ${isVerified
                                ? "bg-red-100 text-red-600 hover:bg-red-200"
                                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                }`}
                        >
                            {loading ? "Saving..." : isVerified ? "Unverify" : "Verify"}
                        </button>
                    )}
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300 mt-1">
                <div className="flex items-center gap-1">
                    <span className="text-gray-400">ID:</span>
                    <span className="truncate max-w-[100px] font-mono">{transactionId}</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="text-gray-400">Type:</span>
                    <span className="capitalize">{type}</span>
                </div>

                {createdAt && (
                    <div className="flex items-center gap-1 text-gray-400">
                        <ClockIcon className="w-4 h-4 text-yellow-300" />
                        <span>{new Date(createdAt).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                        })}</span>
                    </div>
                )}

                {purpose && (
                    <div className="flex items-center gap-1">
                        <PencilIcon className="w-4 h-4 text-purple-300" />
                        <span className="capitalize">{purpose}</span>
                    </div>
                )}
            </div>
        </div >
    );
};

export default TransactionCard;
