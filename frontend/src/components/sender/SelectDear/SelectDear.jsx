import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import KeyringImg from '../../../assets/images/sender/Mailbox.png';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import QuestionText from './QuestionText';
import SelectDearContent from './SelectDearContent';

const SelectDear = () => {
  const navigate = useNavigate();
  const [keyringArr, setKeyringArr] = useState([]);

  // ✅ 하드 코딩된 키링 목록 설정
  useEffect(() => {
    const hardCodedData = [
      {
        keyringId: 0,
        nfcName: '예슬',
        tagCode: 'I9J1K2L3',
        imageUrl: KeyringImg,
        favorite: true,
      },
      {
        keyringId: 1,
        nfcName: '하람',
        tagCode: 'A1B2C3D4',
        imageUrl: KeyringImg,
        favorite: false,
      },
      {
        keyringId: 2,
        nfcName: '승엽',
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
    navigate('/send-type');
  };

  return (
    <Wrapper>
      {/* ✅ 헤더 영역 */}
      <Header headerName="받는 사람 선택" />

      {/* ✅ 키링 케로셀 영역 */}
      <ContentWrapper>
        <InnerWrapper>
          <QuestionText>누구에게 보내는 편지인가요?</QuestionText>
          <SelectDearContent keyringArr={keyringArr} />
        </InnerWrapper>
      </ContentWrapper>

      {/* ✅ 버튼 영역 */}
      <ButtonSpacing>
        <LongButton btnName="전송 옵션 선택" onClick={handleSelectOption} opacity={false} />
      </ButtonSpacing>
      <ButtonSpacing>
        <LongButton btnName="즉시 전송" onClick={handleImmediateSend} opacity={false} />
      </ButtonSpacing>
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
  /* height: 100vh */
  background-color: ${({ theme }) => theme.colors.Background};
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonSpacing = styled.div`
  margin-bottom: 1.2rem;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
`;
