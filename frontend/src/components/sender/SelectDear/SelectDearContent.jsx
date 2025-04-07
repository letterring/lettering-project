import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { SelectedKeyringId } from '../../../recoil/atom';
import OptionCard from './OptionCard';

const SelectDearContent = ({ keyringArr }) => {
  const setSelectedKeyringId = useSetRecoilState(SelectedKeyringId);

  useEffect(() => {
    if (keyringArr.length > 0) {
      const centerIndex = 0;
      const defaultKeyring = keyringArr[centerIndex];
      if (defaultKeyring) {
        setSelectedKeyringId(defaultKeyring.keyringId);
      }
    }
  }, [keyringArr]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: '5%',
    afterChange: (index) => {
      const target = keyringArr[index];
      if (target) {
        setSelectedKeyringId(target.keyringId);
      }
    },
  };

  return (
    <StKeyringListWrapper>
      <StyledSlider {...settings}>
        {keyringArr.map((keyring) => (
          <OptionCard key={keyring.keyringId} keyring={keyring} />
        ))}
      </StyledSlider>
    </StKeyringListWrapper>
  );
};

export default SelectDearContent;

const StKeyringListWrapper = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  width: 100%;

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
`;
