import React from "react";

const SectionText = ({ title, subtitle }) => {
    return (
        <h2 className="text-left text-2xl font-bold mb-4">
            <span className="text-black">{title}</span> <span className="text-gray-500">{subtitle}</span>
        </h2>
    );
};

export default SectionText;