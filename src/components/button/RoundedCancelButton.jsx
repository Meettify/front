import React from 'react';

const RoundedCancelButton = ({ children, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className="px-6 py-2 text-white bg-gray-500 rounded-full transition-colors duration-200 hover:bg-gray-700 hover:text-white"
        >
            {children}
        </button>
    );
};

export default RoundedCancelButton;
