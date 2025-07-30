import React, { useState } from 'react';
import type { TransanctionFormData } from '../types';

interface Props {
    form: TransanctionFormData;
    setForm: React.Dispatch<React.SetStateAction<TransanctionFormData>>;
    handleSubmit: (e: React.FormEvent) => void;
}

const TransactionForm: React.FC<Props> = ({ form, setForm, handleSubmit }) => {
    const [hasPaid, setHasPaid] = useState(false);

    const handleUPIPayment = () => {
        const upiId = form.upiId || '9128753899@ybl';
        const payeeName = form.name || 'Deepak Das';
        const amount = form.amount || 50;
        const currency = 'INR';
        const transactionId = `TXN-${Date.now()}`;
        const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
            payeeName
        )}&am=${amount}&cu=${currency}&tr=${transactionId}`;

        window.location.href = upiLink;
        setHasPaid(true);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-800 p-4 rounded-xl shadow-md"
        >
            <input
                required
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
            />
            <input
                required
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
            />
            <input
                type="text"
                placeholder="UPI ID (optional)"
                value={form.upiId}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
            />
            <input
                type="text"
                placeholder="Purpose (optional)"
                value={form.purpose}
                onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
            />

            {/* Conditionally show either Pay or Save button */}
            {hasPaid ? (
                <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-md px-4 py-2 mt-1 hover:bg-blue-700 transition"
                >
                    Save
                </button>
            ) : (
                <button
                    type="button"
                    onClick={handleUPIPayment}
                    className="bg-green-600 text-white rounded-md px-4 py-2 mt-1 hover:bg-green-700 transition"
                >
                    Pay via UPI
                </button>
            )}
        </form>
    );
};

export default TransactionForm;
