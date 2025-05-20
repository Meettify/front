import React from "react";

const MainSection = ({ title, items, renderItem }) => {
  return (
    <div className="my-16">
      {title}
      <div className="overflow-x-auto no-scrollbar pb-4">
        <div className="flex flex-wrap gap-6">
          {items.length > 0 ? (
            items.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-auto">
                {renderItem(item)}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-10 w-full min-h-[150px]">
              관련된 항목이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainSection;
