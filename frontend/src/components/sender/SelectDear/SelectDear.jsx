import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { getKeyringList } from '../../../apis/keyring';
import {
  LetterImageList,
  LetterTextList,
  PostcardImageFile,
  PostcardText,
  SelectedKeyringId,
} from '../../../recoil/atom';
import LongButton from '../../common/button/LongButton';
import Header from '../../common/Header';
import QuestionText from './QuestionText';
import SelectDearContent from './SelectDearContent';

const SelectDear = () => {
  const navigate = useNavigate();
  const [keyringArr, setKeyringArr] = useState([]);
  const selectedKeyringId = useRecoilValue(SelectedKeyringId);
  const postcardImageFile = useRecoilValue(PostcardImageFile);
  const postcardText = useRecoilValue(PostcardText);
  const letterImageList = useRecoilValue(LetterImageList);
  const letterTextList = useRecoilValue(LetterTextList);

  // 키링 목록 API 호출
  useEffect(() => {
    const fetchKeyrings = async () => {
      try {
        const data = await getKeyringList();
        setKeyringArr(data);
      } catch (error) {
        console.error('키링 목록 불러오기 실패:', error);
      }
    };

    fetchKeyrings();
  }, []);

  const handleSelectOption = () => {
    console.log('전송 옵션 선택');
    console.log('📦 Selected Keyring ID:', selectedKeyringId);
    console.log('🖼️ Postcard Image File:', postcardImageFile);
    console.log('📝 Postcard Text:', postcardText);
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

      {/* 키링 캐러셀 영역 */}
      <ContentWrapper>
        <SelectDearContent keyringArr={keyringArr} />
      </ContentWrapper>

      {/* 버튼 영역 */}
      <FixedButtonWrapper>
        <LongButton btnName="다음" onClick={handleSelectOption} opacity={false} />
        {/* <LongButton btnName="즉시 전송" onClick={handleImmediateSend} opacity={false} /> */}
      </FixedButtonWrapper>
    </Wrapper>
  );
};

export default SelectDear;

// 스타일 정의
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding-bottom: 14rem;
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
