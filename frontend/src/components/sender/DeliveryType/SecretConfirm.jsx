// SecretConfirm.jsx
import React from 'react';
import styled from 'styled-components';

import CancelButton from '../../common/button/CancelButton';
import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';

export default function SecretConfirm({ question, hint, answer, onBack, onConfirm, onClose }) {
  return (
    <ConfirmModal
      isOpen={true}
      onClose={onClose}
      title={
        <Wrapper>
          <ModalTitle>확인하기</ModalTitle>
          <ModalDesc>입력한 내용이 올바른지 확인해주세요!</ModalDesc>
        </Wrapper>
      }
    >
      <ContentWrapper>
        <Label>질문</Label>
        <GrayBox>{question}</GrayBox>

        <Label>힌트</Label>
        <GrayBox>{hint}</GrayBox>

        <Label>정답</Label>
        <GrayBox>{answer}</GrayBox>
      </ContentWrapper>

      <ButtonWrapper>
        <CancelButton btnName="이전" onClick={onBack} />
        <ConfirmButton btnName="완료" onClick={onConfirm} />
      </ButtonWrapper>
    </ConfirmModal>
  );
}

// styled-components
const Wrapper = styled.div`
  text-align: center;
`;

const ModalTitle = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.Black};
  margin-bottom: 0.4rem;
`;

const ModalDesc = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
`;

const ContentWrapper = styled.div`
  margin-top: 2rem;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.SubHead2};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 0.4rem;
`;

const GrayBox = styled.div`
  background-color: ${({ theme }) => theme.colors.Gray4};
  padding: 1.2rem;
  border-radius: 999px;
  text-align: center;
  margin-bottom: 1.6rem;
  ${({ theme }) => theme.fonts.body2};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;
