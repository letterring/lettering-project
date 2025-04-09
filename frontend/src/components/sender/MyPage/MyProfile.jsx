import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserInfo, toggleKeyringFavoirite, updateNickname } from '../../../apis/mypage';
import { IcArrowRight, IcCheckCircle, IcPen, IcSetting } from '../../../assets/icons';
import { UserFont, UserKeyringList, UserNickname } from '../../../recoil/atom';
import { getFontName, getFontStyle } from '../../../util/getFont';
import Header from '../../common/Header';
import KeyringList from './Keyring/KeyringList';
import NickNameSetting from './NickNameSetting';

const MyProfile = () => {
  const [nickname, setNickname] = useRecoilState(UserNickname);
  const [font, setFont] = useRecoilState(UserFont);
  const [keyringList, setKeyringList] = useRecoilState(UserKeyringList);

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const fontStyle = getFontStyle(font);
  const fontName = getFontName(font);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setNickname(data.nickname);
      setFont(data.font);
      setKeyringList(data.keyrings);
    };

    fetchUserInfo();
  }, []);

  const handleEditNickname = async (newName) => {
    const data = await updateNickname(newName);
    setNickname(newName);
    setIsEditing(false);
  };

  const handleChangeFont = () => {
    navigate('font');
  };

  const handleKeyringSetting = () => {
    navigate('keyring');
  };

  const handleToggleFavorite = async (keyringId) => {
    // optimistic UI
    setKeyringList((prevList) =>
      prevList.map((k) => (k.keyringId === keyringId ? { ...k, favorite: !k.favorite } : k)),
    );

    const result = await toggleKeyringFavoirite(keyringId);

    if (!result) {
      setKeyringList((prevList) =>
        prevList.map((k) => (k.keyringId === keyringId ? { ...k, favorite: !k.favorite } : k)),
      );
    }
    // else {
    //   const updated = await getUserInfo();
    //   setKeyringList(updated.keyrings);
    // }
  };

  return (
    <>
      <StWrapper>
        <Header headerName="마이페이지" />
        {/* <br /> */}
        <StMyWrapper>
          <Title>닉네임</Title>
          <NickNameSetting
            value={nickname}
            isEditing={isEditing}
            icon={isEditing ? IcCheckCircle : IcPen}
            onStartEdit={() => setIsEditing(true)}
            onIconClick={handleEditNickname}
          />
          <Title>폰트</Title>
          <FontPreviewBox $fontKey={fontStyle}>
            {fontName}
            <IcArrowRight style={{ cursor: 'pointer' }} onClick={handleChangeFont} />
          </FontPreviewBox>
          <br />
          <Title>
            키링
            <IcSetting style={{ cursor: 'pointer' }} onClick={handleKeyringSetting} />
          </Title>
          <KeyringList keyringList={keyringList} toggleFavorite={handleToggleFavorite} />
        </StMyWrapper>
      </StWrapper>
    </>
  );
};

export default MyProfile;

const StWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const StMyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 6rem 2rem;
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
  ${({ theme, $fontKey }) => theme.fonts[$fontKey]};
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
