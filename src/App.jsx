import AppRouter from "./router/AppRouter.jsx";
import Header from "./components/header/Header.jsx";
import Category from "./components/group/Category.jsx";

function App() {
  return (
    <div>
        <Header />
      <div className="flex justify-between px-4"> {/* Flexbox로 가로로 배치 */}
        <div className="w-2/3"> {/* Category 컴포넌트의 너비를 2/3로 설정 */}
          <Category />
        </div>
      </div>
    </div>
    
  );
}

export default App;
