import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getKeyringData } from '../../../apis/keyring';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import QuantityInput from './QuantitiyInput';

const DescribeKeyring = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [details, setDetails] = useState(null);
  const { designName, imageUrl, price, description } = details || {};

  const getKeyrings = async () => {
    const { designs } = await getKeyringData();
    setDetails(designs[0]);
  };

  const handleCount = (num) => {
    setQuantity((prev) => prev + num);
    setTotal((prev) => prev + product.price * num);
  };

  useEffect(() => {
    getKeyrings();
  }, []);

  return (
    <>
      <StWrapper>
        <Header headerName="키링 구매" />
        <StContent>
          <img src={imageUrl} alt="키링 이미지" />
          <StTextWrapper>
            <StText>
              <h3>{designName}</h3>
              <QuantityWrapper>
                <QuantityInput quantity={quantity} onClick={handleCount} />
                <h3>{price}</h3>
              </QuantityWrapper>
              <h4>설명</h4>
              {description}
              <p>
                내장된 NFC 태그를 통해, 연인이나 소중한 친구에게 전하고 싶은 편지를 간편하게 공유할
                수 있습니다.
              </p>
              <p>
                키링을 스마트폰에 가볍게 태깅하는 것만으로 따뜻한 마음이 담긴 메시지를 바로 확인할
                수 있습니다.
              </p>
              <p>키링을 통해 마음을 소중한 사람에게 전해보세요.</p>
              <LongButton
                btnName="구매하기"
                onClick={() => {
                  navigate(`/mypage`);
                }}
              />
            </StText>
          </StTextWrapper>
        </StContent>
      </StWrapper>
    </>
  );
};

export default DescribeKeyring;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: relative;
  height: 100%;
`;

const StContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;

  padding-top: 7rem;
  height: 100%;

  img {
    width: 15rem;
    padding-top: 2rem;
  }
`;

const StTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.36);
  height: 100%;

  z-index: 100;
`;

const StText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  height: 100%;
  margin-top: 1.5rem;
  padding: 1.5rem 2rem;
  padding-bottom: 3rem;

  background-color: white;
  z-index: 101;

  h3 {
    ${({ theme }) => theme.fonts.Title1};
  }

  h4 {
    ${({ theme }) => theme.fonts.Title3};
  }

  p {
    ${({ theme }) => theme.fonts.Body3};
  }
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
