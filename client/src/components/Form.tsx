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
        const upiId = '9128753899@ybl'; // Your UPI ID
        const name = 'Deepak Das'; // Your name
        const amount = form.amount || 50;
        const currency = 'INR';
        const note = form.purpose || 'Donation for Band Fund';
        const transactionRef = `TXN${Date.now()}`; // Unique transaction ref

        const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&tn=${encodeURIComponent(note)}&am=${amount}&cu=${currency}&tr=${transactionRef}`;

        window.alert("You will be redirected to your UPI app. After payment, come back here and enter the Transaction ID.");
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
                onChange={(e) => {
                    setForm({ ...form, amount: Number(e.target.value) })
                }}

                className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
            />
            {
                hasPaid &&
                <input
                    required
                    type="text"
                    placeholder="Transaction Id"
                    value={form.transactionId}
                    onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
                    className="bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded px-3 py-2"
                />
            }
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
                    Save details
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
