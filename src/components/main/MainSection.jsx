import React from "react";

const MainSection = ({ title, items, renderItem }) => {
    return (
        <div className="my-16">
            {/* title은 이미 SectionText로 넘겨졌으므로, 그대로 사용 */}
            {title}
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
