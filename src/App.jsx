import React, { useEffect } from "react";
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
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage"; // ✅ 수정됨
import ScheduleDetailPage from "./pages/ScheduleDetailPage";
import SchedulePage from "./pages/SchedulePage";
import SignUpPage from "./pages/SignUpPage";
import SignupCompletedPage from "./pages/SignupCompletedPage"; // 추가함

import Privacy from "./components/Privacy";

import ArtistManagementPage from "./pages/ArtistManagementPage";
import AuthCallback from "./pages/AuthCallback";
import EmailSuccess from "./pages/EmailSuccess"; //이메일 인증 완료
import ScheduleAddPage from "./pages/ScheduleAddPage";
import ScheduleEditPage from "./pages/ScheduleEditPage";
import ScheduleManagementPage from "./pages/ScheduleManagementPage";
import TestSashaPage from "./pages/TestSashaPage";

import useUserStore from "./store/userStore";
import { setupAxiosInterceptors } from "./api/axiosInterceptors";
import {
  shouldAutoLogout,
  initInactivityLogoutTimer,
  removeToken,
} from "./utils/authUtils"; // ✅ 자동 로그아웃 관련 유틸 추가

function App() {
  const { user } = useUserStore();

  // ✅ Axios 인터셉터 설정
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  // ✅ 마지막 활동 기준 자동 로그아웃 + 비활동 감지 타이머
  useEffect(() => {
    if (shouldAutoLogout()) {
      console.log("🕒 마지막 활동 이후 30분 경과 → 자동 로그아웃");
      useUserStore.getState().logout();
      removeToken();
    }

    const cleanup = initInactivityLogoutTimer(); // 사용자 비활동 감지 시작
    return () => cleanup(); // 언마운트 시 정리
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }, []);

  useEffect(() => {
    if (user) {
      console.log(`현재 로그인한 닉네임: ${user.nickname}`);
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/artist" element={<ArtistListPage />} />
          <Route path="/artist/details" element={<ArtistDetailPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/schedule/details" element={<ScheduleDetailPage />} />
          <Route path="/artist-management" element={<ArtistManagementPage />} />
          <Route path="/schedule-management" element={<ScheduleManagementPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/testsasha" element={<TestSashaPage />} />
        </Route>

        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/signup-completed" element={<SignupCompletedPage />} />
          <Route path="/adminrequest" element={<AdminRequestPage />} />
          <Route path="/admin-request-completed" element={<AdminRequestCompletedPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/schedule-management/add" element={<ScheduleAddPage />} />
          <Route path="/schedule-management/edit" element={<ScheduleEditPage />} />
          <Route path="/auth/kakao/callback" element={<AuthCallback />} />
          <Route path="/auth/naver/callback" element={<AuthCallback />} />
          <Route path="/auth/google/callback" element={<AuthCallback />} />
          <Route path="/verify-email" element={<EmailSuccess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;