import React, { useState } from 'react';
import styled from 'styled-components';

import CancelButton from '../../common/button/CancelButton';
import ConfirmButton from '../../common/button/ConfirmButton';
import ConfirmModal from '../../common/modal/ConfirmModal';
import SecretConfirm from './SecretConfirm';

const stepTitles = {
  1: '질문 작성',
  2: '힌트 및 정답 작성',
  3: '확인하기',
};

const stepDescriptions = {
  1: '질문을 작성해주세요.',
  2: '힌트와 정답을 작성해주세요.',
  3: '입력한 내용이 올바른지 확인해주세요!',
};

export default function SecretOption({ onClose, onConfirm }) {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [hint, setHint] = useState('');
  const [answer, setAnswer] = useState('');

  const handleConfirm = () => {
    if (!question || !answer) {
      alert('질문과 정답은 필수 입력 항목입니다!');
      return;
    }

    const secretData = { question, hint, answer };
    onConfirm(secretData);
  };

  return (
    <ConfirmModal
      isOpen={true}
      onClose={onClose}
      title={
        <HeaderBox>
          <ModalTitle>{stepTitles[step]}</ModalTitle>
          <ModalDesc>{stepDescriptions[step]}</ModalDesc>
        </HeaderBox>
      }
    >
      {step === 1 && (
        <InputBox>
          <Input
            placeholder="ex. 제일 좋아하는 간식은?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </InputBox>
      )}

      {step === 2 && (
        <>
         <QuestionPreview>
          <Label>Q.</Label>
          <QuestionBox>{question}</QuestionBox>
        </QuestionPreview>

        <InputBox>
          <Input
            placeholder="힌트를 입력해주세요 (선택)"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
          <Input
            placeholder="정답을 입력해주세요"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </InputBox>
        </>
      )}

      {step === 3 && (
        <SecretConfirm
          question={question}
          hint={hint}
          answer={answer}
          onBack={() => setStep(2)}
          onConfirm={handleConfirm}
          onClose={onClose}
        />
      )}

      {step < 3 && (
        <ModalButtons>
          {step > 1 && <CancelButton onClick={() => setStep(step - 1)} btnName="이전" />}
          <ConfirmButton onClick={() => setStep(step + 1)} btnName="다음" />
        </ModalButtons>
      )}
    </ConfirmModal>
  );
}

// styled-components
const HeaderBox = styled.div`
  padding: 0 2rem;
`;

const ModalTitle = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 0.4rem;
  text-align: center;
`;

const ModalDesc = styled.div`
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
  white-space: pre-line;
  text-align: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  // margin-top: 2rem;
`;

const Input = styled.input`
  padding: 1.2rem;
  padding-right: 2rem;
  padding-left: 2rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.Gray7};
  border: none;
  ${({ theme }) => theme.fonts.body2};
  color: ${({ theme }) => theme.colors.Gray2};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 2.4rem;
`;
const QuestionPreview = styled.div`
  // margin-top: 2rem;
`;

const QuestionBox = styled.div`
  padding: 1.2rem;
  border-radius: 1.2rem;
  ${({ theme }) => theme.fonts.Saeum3};
  color: ${({ theme }) => theme.colors.MainRed};
  margin-bottom: 2rem;
`;

const Label = styled.div`
  font-size: 3 rem;
  ${({ theme }) => theme.fonts.Saeum3};
  color: ${({ theme }) => theme.colors.Gray5};
`;
