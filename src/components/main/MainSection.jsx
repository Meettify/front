import React from "react";

const MainSection = ({ title, subtitle, items, renderItem }) => {
    return (
        <div className="my-16">
            <h2 className="text-left text-2xl font-bold mb-4">
                <span className="text-black">{title}</span> <span className="text-gray-500">{subtitle}</span>
            </h2>
            <div className="overflow-x-auto no-scrollbar pb-4">
                <div className="flex space-x-10">
                    {items.map((item, index) => (
                        <div key={index} className="flex-shrink-0">
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainSection;