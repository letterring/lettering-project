import { css, DefaultTheme } from 'styled-components';

const colors = {
  MainRed: '#B13F3E',
  Red1: '#B10C0C',
  Red2: '#CF4041',
  Pink1: '#F3E2E3',
  Pink2: '#F8ECEC',
  KakaoBG: '#FEE500',
  Orange1: '#D9B4A7',
  Ivory0: '#EFEBE3',
  Ivory1: '#F4F4F1',
  Background: '#F9F9F9',
  White: '#FFFFFF',
  Gray0: '#191919',
  Gray1: '#3D3D3D',
  Gray2: '#525252',
  Gray3: '#626262',
  Gray4: '#A0A0A0',
  Gray5: '#C4C4C4',
  Gray6: '#ECECEC',
  Gray7: '#F0F0F0',
};

const fonts = {
  TitleLogo: css`
    font-family: 'Alkatra';
    font-size: 4rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: 2px;
  `,
  MenuLogo: css`
    font-family: 'Pretendard';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  EduTitle1: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  EduTitle2: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title0: css`
    font-family: 'Pretendard';
    font-size: 3rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title1: css`
    font-family: 'Pretendard';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title2: css`
    font-family: 'Pretendard';
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title3: css`
    font-family: 'Pretendard';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title4: css`
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title5: css`
    font-family: 'Pretendard';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
  `,
  Title6: css`
    font-family: 'Pretendard';
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
  `,
  Saeum0: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 4.8rem;
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
  `,
  Saeum1: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 4rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  Saeum2: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 3.2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
  `,
  Saeum3: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 2.4rem;
    font-style: normal;
    font-weight: normal;
    line-height: 100%;
  `,
  Saeum4: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 2.2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  Saeum5: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  Saeum6: css`
    font-family: 'GangwonEduSaeeum_OTFMediumA';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  Gomsin1: css`
    font-family: 'Gomsin';
    font-size: 2rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  Gomsin2: css`
    font-family: 'Gomsin';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: normal;
    line-height: 130%;
  `,
  EduBody0: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  EduBody1: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  EduBody2: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  EduBody3: css`
    font-family: 'GangwonEdu_OTFBoldA';
    font-size: 1rem;
    font-style: normal;
    font-weight: 300;
    line-height: 130%;
  `,
  Body0: css`
    font-family: 'Pretendard';
    font-size: 1.7rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body1: css`
    font-family: 'Pretendard';
    font-size: 1.5rem;
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
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
  `,
  Body4: css`
    font-family: 'Pretendard';
    font-size: 1.1rem;
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
    font-size: 0.8rem;
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
