import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserInfo } from '../../../apis/mypage';
import { IcArrowRight, IcCheckCircle, IcPen, IcSetting } from '../../../assets/icons';
import { UserFont, UserKeyringList, UserNickname } from '../../../recoil/userInfo';
import Header from '../../common/Header';
import KeyringList from './KeyringList';
import NickNameSetting from './NickNameSetting';

const My = () => {
  const setNickname = useSetRecoilState(UserNickname);
  const setFont = useSetRecoilState(UserFont);
  const setKeyringList = useSetRecoilState(UserKeyringList);

  const nickname = useRecoilValue(UserNickname);
  const font = useRecoilValue(UserFont);
  const keyringList = useRecoilValue(UserKeyringList);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await getUserInfo();
        const data = res.data;

        console.log(res);

        setNickname(data.nickname);
        setFont(data.font);
        setKeyringList(data.keyrings);
      } catch (error) {
        console.error('유저 정보 가져오기 실패', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEditNickname = (newName) => {
    setNickname(newName);
    setIsEditing(false);
    console.log('닉네임 수정됨 : ', newName);
  };

  const handleChangeFont = () => {
    console.log('폰트 변경 페이지로 이동');
    navigate('font');
  };

  const handleKeyringSetting = () => {
    console.log('키링 설정 페이지로 이동');
    navigate('keyring');
  };

  return (
    <StMyWrapper>
      <Header headerName="마이페이지" />
      <br />
      <Title>닉네임</Title>
      <NickNameSetting
        value={nickname}
        isEditing={isEditing}
        icon={isEditing ? IcCheckCircle : IcPen}
        onStartEdit={() => setIsEditing(true)}
        onIconClick={handleEditNickname}
      />
      <Title>폰트</Title>
      <FontPreviewBox>
        {font}
        <IcArrowRight style={{ cursor: 'pointer' }} onClick={handleChangeFont} />
      </FontPreviewBox>
      <br />
      <Title>
        키링
        <IcSetting style={{ cursor: 'pointer' }} onClick={handleKeyringSetting} />
      </Title>
      <KeyringList keyringList={keyringList} />
    </StMyWrapper>
  );
};

export default My;

const StMyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 5rem;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.MainRed};
  ${({ theme }) => theme.fonts.Title2};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 3rem;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const FontPreviewBox = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Saeum3};
  background-color: ${({ theme }) => theme.colors.White};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding: 1rem 3rem 0.75rem 3rem;
  border-radius: 1rem;
  box-sizing: border-box;
`;
