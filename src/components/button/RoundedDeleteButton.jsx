import React from 'react';

const RoundedDeleteButton = ({ children, onClick, style }) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className="px-6 py-2 text-white bg-red-700 rounded-full transition-colors duration-200 hover:bg-red-600 hover:text-white"
        >
            {children}
        </button>
    );
};

export default RoundedDeleteButton;
