import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import DearHomePage from './pages/dear/Homepage';
import DearLandingPage from './pages/dear/LandingPage';
import DearPostDetailPage from './pages/dear/PostcardDetailPage';
import DearPostcardPage from './pages/dear/PostcardPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/sender/Homepage';

const Router = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
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
          </AnimatePresence>
        </Suspense>
      </RecoilRoot>
    </>
  );
};

export default Router;
