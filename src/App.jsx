import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import GroupDetail from "./pages/group/GroupDetail.jsx";

function App() {
  return (
    <Router>
      {/* 라우터에 따른 다른 페이지 렌더링 */}
      <Routes>
        {/* Home 경로 */}
        <Route
          path="/"
          element={
            <div className="container mx-auto p-4">
              <div className="text-4xl font-bold text-blue-400">
                Hello, Tailwind CSS!
              </div>
              <Link to="/groupdetail">
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Go to Group Detail
                </button>
              </Link>
            </div>
          }
        />
        {/* GroupDetail 경로 */}
        <Route path="/groupdetail" element={<GroupDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
