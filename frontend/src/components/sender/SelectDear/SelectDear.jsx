import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import KeyringImg from '../../../assets/images/keyring.png';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import SelectDearContent from './SelectDearContent';

const SelectDear = () => {
  const navigate = useNavigate();
  const [keyringArr, setKeyringArr] = useState([]);

  // ✅ 하드 코딩된 키링 목록 설정
  useEffect(() => {
    const hardCodedData = [
      {
        keyringId: 0,
        nfcName: '세번째 키링',
        tagCode: 'I9J1K2L3',
        imageUrl: KeyringImg,
        favorite: true,
      },
      {
        keyringId: 1,
        nfcName: '나의 첫번째 키링',
        tagCode: 'A1B2C3D4',
        imageUrl: KeyringImg,
        favorite: false,
      },
      {
        keyringId: 2,
        nfcName: '두번째 키링',
        tagCode: 'E5F6G7H8',
        imageUrl: KeyringImg,
        favorite: true,
      },
    ];
    setKeyringArr(hardCodedData);
  }, []);

  const handleSelectOption = () => {
    console.log('전송 옵션 선택');
    navigate('/send-type');
  };

  const handleImmediateSend = () => {
    console.log('즉시 전송');
  };

  return (
    <Wrapper>
      {/* ✅ 헤더 영역 */}
      <Header headerName="받는 사람 선택" />

      {/* ✅ 키링 케로셀 영역 */}
      <ContentWrapper>
        <SelectDearContent keyringArr={keyringArr} />
      </ContentWrapper>

      {/* ✅ 버튼 영역 */}
      <ButtonWrapper>
        <LongButton btnName="전송 옵션 선택" onClick={handleSelectOption} opacity={false} />
        <LongButton btnName="즉시 전송" onClick={handleImmediateSend} opacity={false} />
      </ButtonWrapper>
    </Wrapper>
  );
};

export default SelectDear;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Background};
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  margin-bottom: 2rem;
`;
