import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import KakaoCallback from './components/KakaoCallback';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './components/SignUp';
import ErrorPage from './pages/ErrorPage';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/sender/Homepage';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<ProtectedRoute />} />
            <Route path="/oauth/callback/kakao" element={<KakaoCallback />} />
            {/* ✅ 카카오 로그인 콜백 */}

            {/* sender */}
            {/* <Route path="/" element={<HomePage />} /> */}

            {/* dear */}

            {/* common */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
