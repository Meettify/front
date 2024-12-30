import React from 'react';

const SupportQna = ({ question, children }) => {
    return (
        <details className="py-3.5 border-b text-gray-800">
            <summary className="cursor-pointer text-gray-800 text-[14px] flex justify-between items-center"> {/* 텍스트 굵게 설정 */}
                <span className="text-left">{question}</span>
            </summary>
            <div className="mt-5 text-left">
                {children}
            </div>
        </details>
    );
};

export default SupportQna;
