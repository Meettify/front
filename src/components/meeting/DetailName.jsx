// DetailDescription.jsx
const DetailDescription = ({ description }) => {
    return (
      <p className="text-gray-700 bg-gray-100 p-4 rounded-lg mb-4"> {/* 여백 추가 */}
        {description}
      </p>
    );
  };
  
  export default DetailDescription;
  