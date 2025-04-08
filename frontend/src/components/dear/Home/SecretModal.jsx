import React, { useState } from 'react';
import styled from 'styled-components';

import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';

export default function SecretModal({ question, hint, correctAnswer, onSuccess }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  const handleCheckAnswer = () => {
    if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
      setError('');
      onSuccess(); // 🔐 정답 맞춤 처리 (isUnlocked = true)
    } else {
      setError('정답이 아닙니다! 다시 입력해주세요.');
    }
  };

  return (
    <ConfirmModal
      isOpen={true}
      onClose={() => {}} // ❌ 닫기 불가능
      title={
        <ModalTitleBox>
          <ModalTitle>비밀 편지 퀴즈</ModalTitle>
          <ModalDesc>질문에 대한 정답을 맞춰야 편지를 열 수 있어요.</ModalDesc>
        </ModalTitleBox>
      }
    >
      <QuizContent>
        <Label>Q.</Label>
        <Question>{question}</Question>

        {hint && (
          <>
            <HintLabel>💡 힌트</HintLabel>
            <HintBox>{hint}</HintBox>
          </>
        )}

        <AnswerInput
          placeholder="정답을 입력해주세요"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
        {error && <ErrorText>{error}</ErrorText>}
        <ButtonBox>
          <ConfirmButton btnName="확인" onClick={handleCheckAnswer} />
        </ButtonBox>
      </QuizContent>
    </ConfirmModal>
  );
}

const ModalTitleBox = styled.div`
  text-align: center;
`;

const ModalTitle = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 0.4rem;
`;

const ModalDesc = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
  font-size: 1.3rem;
`;

const QuizContent = styled.div`
  margin-top: 1.6rem;
`;

const Label = styled.div`
  ${({ theme }) => theme.fonts.Saeum3};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.Gray5};
`;

const Question = styled.div`
  ${({ theme }) => theme.fonts.Saeum3};
  color: ${({ theme }) => theme.colors.Black};
  background-color: ${({ theme }) => theme.colors.Gray7};
  padding: 1rem 1.4rem;
  border-radius: 1.2rem;
  margin-bottom: 2rem;
`;

const HintLabel = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray4};
  margin-bottom: 0.4rem;
`;

const HintBox = styled.div`
  ${({ theme }) => theme.fonts.body2};
  background-color: ${({ theme }) => theme.colors.Gray7};
  padding: 1rem 1.4rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.Gray2};
`;

const AnswerInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  border-radius: 2rem;
  border: none;
  background-color: ${({ theme }) => theme.colors.Gray7};
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray1};
  margin-bottom: 1rem;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.caption};
  margin-bottom: 1rem;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
