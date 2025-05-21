import React from "react";

const MainSection = ({ title, items, renderItem }) => {
  return (
    <div className="my-16">
      {title}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="h-full">
              {renderItem(item)}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-10 w-full min-h-[150px]">
            관련된 항목이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default MainSection;
