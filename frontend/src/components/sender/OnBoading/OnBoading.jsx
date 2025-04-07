import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';

import KeyringImg from '/src/assets/images/keyring.png';
import OnBoadingImg1 from '/src/assets/images/onBoading1.png';
import OnBoadingImg2 from '/src/assets/images/onBoading2.png';

import { getUserData } from '../../../apis/user';
import LongButton from '../../common/button/LongButton';
import OnBoadingWrapper from './OnBoadingContent';

const OnBoading = () => {
  const pageInfo = [
    {
      title: '적어서',
      description: ['다양한 테마의 편지지를 고르고', '사진과 글을 통해 나의 마음을 담아보세요.'],
      img: OnBoadingImg1,
    },
    {
      title: '보내고',
      description: ['타임캡슐, 타이머, 퀴즈를 통해 ', '편지를 더욱 특별하게 보내보세요.'],
      img: OnBoadingImg2,
    },
    {
      title: '선물해요 🎁',
      description: ['당신의 마음을 담은 우체통 키링을 통해', '상대에게 편지를 전해보세요.'],
      img: KeyringImg,
    },
  ];

  const [buttonText, setButtonText] = useState('옆으로 넘겨주세요');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    swipe: true,
    afterChange: (current) => {
      setCurrentSlide(current);
      setButtonText(current === pageInfo.length - 1 ? '시작하기' : '옆으로 넘겨주세요');
    },
  };

  const handleSkip = () => {
    navigate(`/login`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserData();

        if (data) {
          navigate('/home');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) return null;

  return (
    <>
      <StOnBoadingWrapper>
        <SkipButton onClick={handleSkip}>건너뛰기</SkipButton>
        <StyledSlider ref={sliderRef} {...settings}>
          {pageInfo.map((item, id) => (
            <OnBoadingWrapper
              key={id}
              title={item.title}
              description={item.description}
              img={item.img}
            />
          ))}
        </StyledSlider>
        <StBtnWrapper>
          <LongButton
            btnName={buttonText}
            disabled={buttonText === '옆으로 넘겨주세요'}
            onClick={() => {
              navigate(`/login`);
            }}
          />
        </StBtnWrapper>
      </StOnBoadingWrapper>
    </>
  );
};

export default OnBoading;

const StOnBoadingWrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  padding: 3rem 0;
  box-sizing: border-box;

  height: 100%;
`;

const SkipButton = styled.button`
  position: absolute;
  right: 3rem;
  top: 4rem;

  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Body3};
  text-decoration: underline;

  z-index: 3;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  padding-top: 5rem;

  .slick-list {
    overflow: hidden;
    height: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const StBtnWrapper = styled.div`
  position: relative;
  width: 80%;
  padding: 0 2rem;
`;
