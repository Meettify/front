// DetailDescription.jsx
const DetailDescription = ({ description }) => {
    return (
      <div className="col-span-8">
        <p className="text-gray-700 bg-gray-100 p-4 rounded-lg mb-4"> {/* 여백 추가 */}
          {description}
        </p>
      </div>
    );
  };
  
  export default DetailDescription;
  