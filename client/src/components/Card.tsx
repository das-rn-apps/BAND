import React from 'react';
import {
    BanknotesIcon,
    ClockIcon,
    PencilIcon,
} from '@heroicons/react/24/outline';

interface Props {
    name: string;
    amount: number;
    upiId?: string;
    mode: string;
    purpose?: string;
    createdAt?: string;
}

const TransactionCard: React.FC<Props> = ({
    name,
    amount,
    upiId,
    mode,
    purpose,
    createdAt,
}) => {
    return (
        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 px-2 py-1 rounded-xs border border-gray-700">
            {/* Top Row */}
            <div className="flex items-center justify-between mb-1">
                <div className="text-green-500 font-semibold truncate">{name}</div>

                <div
                    className={`text-sm font-bold whitespace-nowrap ${purpose?.toLowerCase() === 'debit' ? 'text-red-400' : 'text-green-400'
                        }`}
                >
                    ₹{amount}

                </div>
            </div>


            {/* Details Row */}
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-300 items-center">
                <div className="flex items-center gap-1">
                    <BanknotesIcon className="w-4 h-4 text-blue-400" />
                    <span>{mode}</span>
                </div>

                {upiId && (
                    <div className="flex items-center gap-1">
                        <span className="text-blue-300 font-mono text-xs">UPI:</span>
                        <span className="truncate max-w-[120px]">{upiId}</span>
                    </div>
                )}

                {purpose && (
                    <div className="flex items-center gap-1">
                        <PencilIcon className="w-4 h-4 text-purple-400" />
                        <span className="truncate max-w-[100px]">{purpose}</span>
                    </div>
                )}

                {createdAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                        <ClockIcon className="w-4 h-4 text-yellow-400" />
                        <span>{new Date(createdAt).toLocaleString()}</span>
                    </div>
                )}
            </div>
        </div >
    );
};

export default TransactionCard;
