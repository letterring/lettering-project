import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import DearHomePage from './pages/dear/Homepage';
import DearLandingPage from './pages/dear/LandingPage';
import DearPostDetailPage from './pages/dear/PostcardDetailPage';
import DearPostcardPage from './pages/dear/PostcardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/sender/Homepage';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense>
          <Routes>
            {/* sender */}
            <Route path="/" element={<HomePage />} />

            {/* dear */}
            <Route path="/dear" element={<DearLandingPage />} />
            <Route path="/dear/home" element={<DearHomePage />} />
            <Route path="/dear/postcard" element={<DearPostcardPage />} />
            <Route path="/dear/postdetail" element={<DearPostDetailPage />} />

            {/* common */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default Router;
