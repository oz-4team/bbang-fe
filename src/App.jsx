import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import EmptyLayout from "./layouts/EmptyLayout";
import MainLayout from "./layouts/MainLayout";
import AdminRequestCompletedPage from "./pages/AdminRequestCompletedPage";
import AdminRequestPage from "./pages/AdminRequestPage";
import ArtistDetailPage from "./pages/ArtistDetailPage";
import ArtistListPage from "./pages/ArtistListPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // ✅ 추가됨
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

import SignUpPage from "./pages/SignUpPage";
import SignupCompletePage from "./pages/SignupCompletedPage"; // 추가함
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // ✅ 추가됨
import ResetPasswordPage from "./pages/ResetPasswordPage"; // ✅ 수정됨
import AdminRequestPage from "./pages/AdminRequestPage";
import AdminRequestCompletedPage from "./pages/AdminRequestCompletedPage";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/artist" element={<ArtistListPage />} />
            <Route path="/artist/details" element={<ArtistDetailPage />} />
          </Route>

          <Route element={<EmptyLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/signup-complete" element={<SignupCompletePage />} />
            <Route path="/adminrequest" element={<AdminRequestPage />} />
            <Route path="/admin-request-completed" element={<AdminRequestCompletedPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
