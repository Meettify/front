
const Header = () => {
  return (
    <div className="flex items-center space-x-4 p-4 text-gray-700"> 
      {/* flex: 가로로 나열, items-center: 수직 가운데 정렬, space-x-4: 항목 사이의 간격, text-gray-700: 공통 텍스트 색상 */}
      <img alt="logo" className="w-8 h-8" />
      <span>메인</span>
      <span>모임</span>
      <span>커뮤니티</span>
      <span>쇼핑</span>
      <span>고객센터</span>
      <img alt="search" className="w-6 h-6" />
      <img alt="profile" className="w-6 h-6" />
    </div>
  );
}

export default Header;
