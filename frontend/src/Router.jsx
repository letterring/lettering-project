import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import ScrollToTop from './components/common/ScrollToTop';
import DearHomePage from './pages/dear/Homepage';
import DearLandingPage from './pages/dear/LandingPage';
import DearLetterDetailPage from './pages/dear/LetterDetailPage';
import DearLetterPage from './pages/dear/LetterPage';
import DearMailBoxPage from './pages/dear/MailBoxPage';
import DearPostDetailPage from './pages/dear/PostcardDetailPage';
import DearPostcardPage from './pages/dear/PostcardPage';
import ErrorPage from './pages/ErrorPage';
import LoginPage from './pages/LoginPage';
import CompletePage from './pages/sender/CompletePage';
import DeliveryTypePage from './pages/sender/DeliveryTypePage';
import DescribeKeyringPage from './pages/sender/DescribeKeyringPage';
import FontSettingPage from './pages/sender/FontSettingPage';
import HomePage from './pages/sender/Homepage';
import KeyringSettingPage from './pages/sender/KeyringSettingPage';
import MailBoxPage from './pages/sender/MailBoxPage';
import MyPage from './pages/sender/MyPage';
import OnBoadingPage from './pages/sender/OnBoadingPage';
import PostcardPreviewPage from './pages/sender/PostcardPreviewPage';
import PostcardWritingPage from './pages/sender/PostcardWritingPage';
import SelectDearPage from './pages/sender/SelectDearPage';
import SelectThemePage from './pages/sender/SelectThemePage';
import SignUpPage from './pages/SignUpPage';

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
              <Route path="/" element={<OnBoadingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/theme" element={<SelectThemePage />} />
              <Route path="/mailbox" element={<MailBoxPage />} />
              <Route path="/postcard/writing" element={<PostcardWritingPage />} />
              <Route path="/postcard/preview" element={<PostcardPreviewPage />} />
              <Route path="/selectdear" element={<SelectDearPage />} />
              <Route path="/complete" element={<CompletePage />} />
              <Route path="/deliverytype" element={<DeliveryTypePage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mypage/font" element={<FontSettingPage />} />
              <Route path="/mypage/keyring" element={<KeyringSettingPage />} />
              <Route path="/keyring" element={<DescribeKeyringPage />} />

              {/* dear */}
              <Route path="/dear" element={<DearLandingPage />} />
              <Route path="/dear/home" element={<DearHomePage />} />
              <Route path="/dear/postcard" element={<DearPostcardPage />} />
              <Route path="/dear/postcard/detail" element={<DearPostDetailPage />} />
              <Route path="/dear/letter" element={<DearLetterPage />} />
              <Route path="/dear/letter/detail" element={<DearLetterDetailPage />} />
              <Route path="/dear/mailbox" element={<DearMailBoxPage />} />

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
