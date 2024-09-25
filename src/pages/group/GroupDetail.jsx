import emotionImage from '../../assets/emotion1.png';

const GroupDetail = () => {
  return (
    <div className="container mx-auto p-4">
      {/* 상단 검색 바 */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Meetify</h1>
        <input
          type="text"
          placeholder="모임 이름이나 장소를 입력하세요"
          className="border rounded-lg px-4 py-2 w-1/2"
        />
        <div className="icon flex">
          {/* 아이콘 예시 */}
          <i className="fas fa-search"></i>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 이미지 및 태그 섹션 */}
        <div className="col-span-8">
        <img src={emotionImage} alt="Emotion" className="w-full h-80 rounded-lg mb-4 object-contain" />

          <div className="flex space-x-2 mb-4">
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">운동</div>
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">서울</div>
            <div className="bg-gray-200 text-gray-700 rounded-full px-4 py-1">맴버80</div>
          </div>
          <div>
            <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">종로 정겨운 러닝 모임</p>
          </div>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="col-span-4">
          <div className="bg-gray-200 h-96 mb-4 rounded-lg">광고</div>
          <button className="bg-gray-100 h-8 w-full rounded-lg text-center flex items-center justify-center">
          가  입  신  청
          </button>
        </div>
      </div>

      {/* 설명 및 게시판 */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-8">
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h2 className="text-lg font-semibold">러닝모임</h2>
            <p>종로 정겨운 러닝모임은 20시~22시 운동을 목표로 하고 있습니다.</p>
          </div>
        </div>
        <div className="col-span-8">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">게시판</h2>
            <ul>
              <li>공지 모임 운영 수칙</li>
              <li>공지 모임 운영 방침</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
