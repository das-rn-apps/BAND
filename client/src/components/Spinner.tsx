// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC<{ message?: string }> = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center  text-white">
            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
            {message && <p className="text-sm italic opacity-80">{message}</p>}
        </div>
    );
};

export default Spinner;
