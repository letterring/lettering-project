import React from 'react';
import styled from 'styled-components';

const OnBoadingContent = ({ title, description, img }) => {
  return (
    <>
      <StOnBoadingWrapper>
        <h2>{title}</h2>
        <p>{description[0]}</p>
        <p>{description[1]}</p>
        <StImageWrapper>
          <img src={img} alt="onboading image" />
        </StImageWrapper>
      </StOnBoadingWrapper>
    </>
  );
};

export default OnBoadingContent;

const StOnBoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  height: 50rem;
  padding: 0 3rem;

  h2 {
    color: ${({ theme }) => theme.colors.Gray2};
    ${({ theme }) => theme.fonts.Title1};

    margin-bottom: 2rem;
  }

  p {
    color: ${({ theme }) => theme.colors.Gray2};
    ${({ theme }) => theme.fonts.Body2};
  }
`;

const StImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;

  img {
    width: 100%;
    max-height: 32rem;
    flex-grow: 1;

    padding-top: 4rem;
    padding-left: 2rem;
    padding-bottom: 4rem;
  }
`;
