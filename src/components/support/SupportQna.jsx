import React from 'react';

const SupportQna = ({ question, children }) => {
    return (
        <details className="py-4 border-b">
            <summary className="cursor-pointer text-lg flex justify-between items-center">
                <span className="text-left">{question}</span>
            </summary>
            <div className="mt-2 text-left text-gray-700">
                {children}
            </div>
        </details>
    );
};

export default SupportQna;