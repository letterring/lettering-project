import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/sender/Homepage';
import OnBoadingPage from './pages/sender/OnBoadingPage';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense>
          <Routes>
            {/* sender */}
            <Route path="/" element={<OnBoadingPage />} />
            <Route path="/home" element={<HomePage />} />

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
