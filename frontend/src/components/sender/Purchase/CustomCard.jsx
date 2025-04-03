import React from 'react';
import styled from 'styled-components';

const InputField = ({ title, description, value, onChange, maxLength }) => {
  return (
    <StInputFieldWrapper>
      <TitleText>{title}</TitleText>
      <DescriptionText>{description}</DescriptionText>
      <InputBox value={value} onChange={onChange} maxLength={maxLength} />
      {maxLength && (
        <CharCount>
          {value ? value.length : 0}/{maxLength}
        </CharCount>
      )}
    </StInputFieldWrapper>
  );
};

const CustomCard = ({ index, nickname, message, onChange }) => {
  return (
    <StCardWrapper>
      <InputField
        title="키링 닉네임"
        description="편지에 적혀질 상대의 애칭을 설정해주세요."
        value={nickname ?? '우체통이름'}
        onChange={(e) => onChange(index, 'nfcName', e.target.value)}
        maxLength={5}
      />
      <InputField
        title="나만의 메세지"
        description="받는 사람이 처음으로 보게 될 메세지를 설정해주세요."
        value={message ?? '새로운 편지가 도착했어요!'}
        onChange={(e) => onChange(index, 'customMessage', e.target.value)}
        maxLength={14}
      />
    </StCardWrapper>
  );
};

export default CustomCard;

const StCardWrapper = styled.div`
  width: 25rem;
  height: 25rem;
  box-sizing: border-box;
`;

const StInputFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TitleText = styled.div`
  ${({ theme }) => theme.fonts.Title2};
  color: ${({ theme }) => theme.colors.MainRed};
`;

const DescriptionText = styled.div`
  ${({ theme }) => theme.fonts.Saeum6};
  color: ${({ theme }) => theme.colors.Gray4};
`;

const CharCount = styled.div`
  display: flex;
  justify-content: flex-end;

  ${({ theme }) => theme.fonts.Body5};
  color: ${({ theme }) => theme.colors.Gray5};
`;

const InputBox = styled.input`
  width: 100%;
  height: 4rem;
  padding-left: 1rem;
  border: none;
  border-radius: 0.675rem;
  background-color: ${({ theme }) => theme.colors.White};

  ${({ theme }) => theme.fonts.Saeum3}
  color: ${({ theme }) => theme.colors.Gray2}
`;
