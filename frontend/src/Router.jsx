import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import ErrorPage from './pages/ErrorPage';
import OnBoadingPage from './pages/sender/OnBoadingPage';
import HomePage from './pages/sender/Homepage';
import SelectThemePage from './pages/sender/SelectThemePage';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RecoilRoot>
        <Suspense>
          <Routes>
            {/* sender */}
            <Route path="/" element={<OnBoadingPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/theme" element={<SelectThemePage />} />

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
