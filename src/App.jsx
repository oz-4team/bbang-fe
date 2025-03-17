import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

 
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> {/* ✅ 회원가입 페이지 라우트 추가 */}
        </Routes>
      </Router>
    );
}

export default App;