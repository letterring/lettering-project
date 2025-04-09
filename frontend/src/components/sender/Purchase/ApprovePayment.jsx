import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { approvePayment } from '/src/apis/purchase.js';

import FailBirdImg from '../../../assets/images/bird_sorry.svg';
import { KeyringCustomList, OrderNumber } from '../../../recoil/atom';
import AlertModal from '../../common/modal/AlertModal';

const ApprovePayment = () => {
  const [searchParams] = useSearchParams();
  const pgToken = searchParams.get('pg_token');
  const orderNumber = searchParams.get('orderNumber');
  const navigate = useNavigate();
  const setCustomlist = useSetRecoilState(KeyringCustomList);
  const setOrderNum = useSetRecoilState(OrderNumber);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: '',
    message: '',
    image: null,
    onClose: null,
  });

  const showAlert = ({ title, message, onClose, image }) => {
    setAlertState({
      isOpen: true,
      title,
      message,
      image,
      onClose: onClose || (() => setAlertState((prev) => ({ ...prev, isOpen: false }))),
    });
  };

  useEffect(() => {
    const handleApprove = async () => {
      try {
        const { keyringIds } = await approvePayment({ pgToken, orderNumber });
        const initList = keyringIds.map((id) => ({
          keyringId: id,
          nickname: '우체통이름',
          message: '새로운 편지가 도착했어요!',
        }));

        setCustomlist(initList);
        setOrderNum(orderNumber);
        navigate('/purchase/customize');
      } catch (err) {
        showAlert({
          title: '키링 구매에 실패했어요',
          message: err.message,
          image: FailBirdImg,
          onClose: () => {
            setAlertState((prev) => ({ ...prev, isOpen: false }));
            navigate('/home');
          },
        });
      }
    };

    if (pgToken && orderNumber) handleApprove();
  }, [pgToken, orderNumber]);

  return (
    <>
      <div>결제를 승인 중입니다...</div>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={alertState.onClose}
        title={alertState.title}
        imgSrc={alertState.image}
      >
        {alertState.message}
      </AlertModal>
    </>
  );
};

export default ApprovePayment;
