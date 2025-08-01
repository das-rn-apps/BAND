// components/Modal.tsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50  flex justify-center">
            <div className="bg-gradient-to-br from-yellow-500 to-red-500 w-full  p-4 rounded shadow-lg animate-fadeIn m-6 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center  pb-2 mb-3">
                    <h2 className="text-lg font-bold text-green-600">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-whit"
                        aria-label="Close modal"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Table Content */}
                <div className="max-h-72 overflow-y-auto">
                    <table className="w-full text-sm text-left text-white">
                        <thead className="sticky top-0 bg-red-400 text-xs uppercase ">
                            <tr>
                                <th scope="col" className="px-4 py-2">Date</th>
                                <th scope="col" className="px-4 py-2 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-red-600">
                            {children}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Modal;
