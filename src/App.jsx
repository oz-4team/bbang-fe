import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
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
import SignUpTestPage from "./pages/SignUpTestPage";
import SignupCompletedPage from "./pages/SignupCompletedPage"; // 추가함

import Privacy from "./components/Privacy";

import ArtistGroupDetailPage from "./pages/ArtistGroupDetailPage";
import ArtistManagementPage from "./pages/ArtistManagementPage";
import AuthCallback from "./pages/AuthCallback";
import EmailSuccess from "./pages/EmailSuccess"; //이메일 인증 완료
import ScheduleAddPage from "./pages/ScheduleAddPage";
import ScheduleEditPage from "./pages/ScheduleEditPage";
import ScheduleManagementPage from "./pages/ScheduleManagementPage";
import SignUpQuickTestPage from "./pages/SignUpQuickTestPage";
import TestSashaPage from "./pages/TestSashaPage";
import useUserStore from "./store/userStore"; //로그인 확인용

function App() {
  //로그인 확인용
  const { user } = useUserStore();

  useEffect(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    // document.documentElement.classList.add(theme);
  }, []);

  useEffect(() => {
    if (user) {
      console.log(`현재 로그인한 닉네임: ${user.nickname}`); //  로그인 상태 유지 중 닉네임 출력
    }
  }, [user]);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/artist" element={<ArtistListPage />} />
            <Route path="/artist/solo/:id" element={<ArtistDetailPage />} />
            <Route
              path="/artist/group/:id"
              element={<ArtistGroupDetailPage />}
            />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route
              path="/schedule/details/:id"
              element={<ScheduleDetailPage />}
            />
            <Route
              path="/artist-management"
              element={<ArtistManagementPage />}
            />
            <Route
              path="/schedule-management"
              element={<ScheduleManagementPage />}
            />
            <Route path="/ProfilePage" element={<ProfilePage />} />
            <Route path="/testsasha" element={<TestSashaPage />} />
          </Route>

          <Route element={<EmptyLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signup-test" element={<SignUpTestPage />} />
            <Route path="/signup-quicktest" element={<SignUpQuickTestPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/signup-completed" element={<SignupCompletedPage />} />
            <Route path="/adminrequest" element={<AdminRequestPage />} />

            <Route
              path="/admin-request-completed"
              element={<AdminRequestCompletedPage />}
            />

            <Route path="/privacy" element={<Privacy />} />

            <Route
              path="/schedule-management/add"
              element={<ScheduleAddPage />}
            />
            <Route
              path="/schedule-management/edit/:id"
              element={<ScheduleEditPage />}
            />

            <Route path="/auth/kakao/callback" element={<AuthCallback />} />
            <Route path="/auth/naver/callback" element={<AuthCallback />} />
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            <Route path="/verify-email" element={<EmailSuccess />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
