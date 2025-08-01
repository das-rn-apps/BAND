import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    BanknotesIcon,
    PlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

import { useTransactionStore } from '../store/useTransactionStore';
import type { TransanctionFormData } from '../types';

import TransactionCard from '../components/Card';
import TransactionFilter from '../components/Filter';
import TransactionForm from '../components/Form';
import TransactionSummary from '../components/Summary';
import Spinner from '../components/Spinner';

const Home: React.FC = () => {
    const {
        filteredTransactions,
        fetchAllTransactions,
        filterByDateRange,
        resetFilter,
        addTransaction,
        loading,
    } = useTransactionStore();

    const [form, setForm] = useState<TransanctionFormData>({
        name: '',
        amount: 0,
        transactionId: '',
        mode: 'UPI',
        purpose: '',
        type: "Credit"
    });

    const [showForm, setShowForm] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchAllTransactions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTransaction({
            ...form,
            amount: +form.amount,
            mode: form.mode as 'UPI' | 'Cash' | 'Card',
            type: form.type,
            transactionId: form.transactionId
        });
        setForm({ name: '', amount: 0, transactionId: '', mode: 'UPI', purpose: '', type: "Credit" });
        setShowForm(false);
    };

    const handleFilter = async () => {
        if (!startDate || !endDate) {
            resetFilter();
            return;
        }
        const from = new Date(startDate);
        const to = new Date(endDate);

        if (from > to) {
            alert("Start date must be before end date.");
            return;
        }
        await filterByDateRange(startDate, endDate);
    };


    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('BAND Fund Transaction Report', 14, 20);
        autoTable(doc, {
            startY: 30,
            head: [['Name', 'Amount(in Rs)', 'Mode', 'Transaction Id', 'Purpose', 'Date']],
            body: filteredTransactions.map(tx => [
                tx.name,
                tx.amount,
                tx.mode,
                tx.transactionId || '-',
                tx.purpose || '-',
                new Date(tx.createdAt!).toLocaleString(),
            ]),
        });
        doc.save('Transactions_Report.pdf');
    };

    return (
        <div className="mx-auto p-3 space-y-5 bg-gray-900 text-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BanknotesIcon className="w-7 h-7 text-green-400" />
                    <h1 className="text-2xl sm:text-3xl font-bold">BAND Fund</h1>
                </div>
                <button
                    onClick={() => setShowForm(prev => !prev)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition text-white ${showForm
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {showForm ? (
                        <>
                            <XMarkIcon className="w-5 h-5" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <PlusIcon className="w-5 h-5" />
                            Donate
                        </>
                    )}
                </button>
            </div>

            {/* Transaction Form */}
            {showForm && (
                <TransactionForm
                    form={form}
                    setForm={setForm}
                    handleSubmit={handleSubmit}
                />
            )}

            {/* Summary Section */}
            <TransactionSummary />

            {/* Filter Bar */}
            <TransactionFilter
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                handleFilter={handleFilter}
                handleExport={downloadPDF}
            />

            {/* Transaction Count */}
            <p className="text-sm text-gray-400">
                Showing <span className="text-white font-medium">{filteredTransactions.length}</span>{' '}
                transaction{filteredTransactions.length !== 1 && 's'}
            </p>

            {/* Transaction List */}
            <div className="grid gap-2">
                {loading ? <Spinner message='Please wait until we prepare data for you' /> : filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                        <TransactionCard key={tx._id} {...tx} />
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500 italic">
                        No transactions found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
