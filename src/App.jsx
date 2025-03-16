import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import useUserStore from "./store/userStore";
import LoginPage from "./pages/LoginPage";

function App() {
  const { user, logout } = useUserStore();

  return (
    <Router>
      <nav>
        <Link to="/">홈</Link>
        {!user ? <Link to="/login">로그인</Link> : <button onClick={logout}>로그아웃</button>}
      </nav>

      <Routes>
        <Route path="/" element={<h1>홈 화면</h1>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <div>
      {user ? (
        <p>
          🔓 로그인됨: {user.email}{" "}
          {user.isAdmin ? <span>(관리자)</span> : <span>(일반 사용자)</span>}
        </p>
      ) : (
        <p>🔒 로그아웃 상태</p>
      )}
    </div>
    </Router>
  );
}

export default App;