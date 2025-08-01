import React from 'react';
import {
    BanknotesIcon,
    ClockIcon,
    PencilIcon,
} from '@heroicons/react/24/outline';

interface Props {
    name: string;
    amount: number;
    transactionId: string;
    type: string;
    mode: string;
    purpose?: string;
    createdAt?: string;
}

const TransactionCard: React.FC<Props> = ({
    name,
    amount,
    transactionId,
    mode,
    purpose,
    createdAt,
    type
}) => {
    const isDebit = (type || purpose)?.toLowerCase() === 'debit';

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

                <div
                    className={`text-sm font-bold ${isDebit ? 'text-red-400' : 'text-green-400'
                        }`}
                >
                    {isDebit ? '-' : '+'}₹{amount.toLocaleString('en-IN')}
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
        </div>
    );
};

export default TransactionCard;
