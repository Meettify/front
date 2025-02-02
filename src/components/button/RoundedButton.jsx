import React from 'react';
import "./RoundedButton.css";



// style={{ padding: '6px 14px', fontSize: '12px' }}
const RoundedButton = ({ children, onClick, className }) => {
    return (
        <button onClick={onClick}
            className={`RoundedButton ${className}`}
        >
            {children}
        </button >
    );
};

export default RoundedButton;