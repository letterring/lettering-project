import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getKeyringData, getKeyringsData } from '../../../apis/keyring';
import { TotalPrice, TotalQuantity } from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import QuantityInput from './QuantitiyInput';

const DescribeKeyring = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useRecoilState(TotalQuantity);
  const [details, setDetails] = useState(null);
  const [total, setTotal] = useRecoilState(TotalPrice);
  const { id, designName, imageUrl, price, description, availableStock } = details || {};

  /**
   * 지금은 키링 종류가 하나라 1로 적어둠
   * 키링 목록 페이지를 만든다면 거기서
   * getKeyringsData 로 키링 종류를 받고
   * 그 중 선택한 키링의 id를 받아서
   * getKeyringData(id) 로 정보 불러오기
   */
  const getKeyrings = async () => {
    const data = await getKeyringData(1);
    setDetails(data);
    setTotal(data.price);
  };

  const handleCount = (num) => {
    setQuantity((prev) => prev + num);
    setTotal((prev) => prev + price * num);
  };

  useEffect(() => {
    const res = getKeyrings();
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
                <QuantityInput quantity={quantity} handleCount={handleCount} />
                <h3>{total}</h3>
              </QuantityWrapper>
              <h4>설명</h4>
              {description?.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              남은 키링 개수 : {availableStock}
              <LongButton
                btnName="구매하기"
                onClick={() => {
                  navigate(`/purchase/checkout`);
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
