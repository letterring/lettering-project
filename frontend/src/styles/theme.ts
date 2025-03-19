import { css, DefaultTheme } from 'styled-components';

const colors = {
  MainRed: '#B13F3E',
  Red1: '#B10C0C',
  Red2: '#CF4041',
  Navy: '#0239A6',
  SkyBlue: '#0062FF',
  Blue: '#669BBC',
  Gray0: '#191919',
  Gray1: '#3D3D3D',
  Gray2: '#CFCED3',
  Gray3: '#E8E8F4',
  Gray4: '#EEEEFA',
  Gray5: '#F3F3F3',
  Ivory1: '#FFFBEF',
  Background: '#F9F9F9',
  White: '#FFFFFF',
};

const fonts = {
  Head0: css`
    font-family: 'Pretendard';
    font-size: 4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Head1: css`
    font-family: 'Pretendard';
    font-size: 3.2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Head2: css`
    font-family: 'Pretendard';
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title1: css`
    font-family: 'Pretendard';
    font-size: 2.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title2: css`
    font-family: 'Pretendard';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title3: css`
    font-family: 'Pretendard';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title4: css`
    font-family: 'Pretendard';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title5: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title6: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title7: css`
    font-family: 'Pretendard';
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Body0: css`
    font-family: 'Pretendard';
    font-size: 2.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body1: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body2: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body3: css`
    font-family: 'Pretendard';
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body4: css`
    font-family: 'Pretendard';
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body5: css`
    font-family: 'Pretendard';
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body6: css`
    font-family: 'Pretendard';
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body7: css`
    font-family: 'Pretendard';
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body8: css`
    font-family: 'Pretendard';
    font-size: 0.7rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body9: css`
    font-family: 'Pretendard';
    font-size: 0.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
};

const theme: DefaultTheme = {
  colors,
  fonts,
};
export default theme;
