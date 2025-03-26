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

  // 하드 코딩된 키링 목록
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
    navigate('/deliverytype');
  };

  const handleImmediateSend = () => {
    console.log('즉시 전송');
    navigate('/send');
  };

  return (
    <Wrapper>
      {/* 헤더 영역 */}
      <Header headerName="받는 사람 선택" />

      {/* 질문 메시지 영역 */}
      <QuestionTextWrapper>
        <QuestionText text="누구에게 보내는 편지인가요?" />
      </QuestionTextWrapper>

      {/* 키링 케로셀 영역 */}
      <ContentWrapper>
        <SelectDearContent keyringArr={keyringArr} />
      </ContentWrapper>

      {/* 버튼 영역역 */}
      <FixedButtonWrapper>
        <LongButton btnName="전송 옵션 선택" onClick={handleSelectOption} opacity={false} />
        <LongButton btnName="즉시 전송" onClick={handleImmediateSend} opacity={false} />
      </FixedButtonWrapper>
    </Wrapper>
  );
};

export default SelectDear;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
`;

const FixedButtonWrapper = styled.div`
  position: fixed;
  bottom: 3rem;
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
`;

const QuestionTextWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;
