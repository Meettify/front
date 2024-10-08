import React from 'react';

// style={{ padding: '6px 14px', fontSize: '12px' }}
const RoundedButton = ({ children, onClick, style }) => {
    return (
        <button onClick={onClick}
            style={style}
            className="px-6 py-2 border border-gray-500 text-gray-500 rounded-full text-md transition-colors duration-200 hover:bg-blue-500 hover:text-white hover:border-blue-500"
        >
            {children}
        </button >
    );
};

export default RoundedButton;