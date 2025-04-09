import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { getUserInfo, toggleKeyringFavoirite, updateNickname } from '../../../apis/mypage';
import { IcArrowRight, IcCheckCircle, IcPen, IcSetting } from '../../../assets/icons';
import BirdImg from '../../../assets/images/bird_coin.png';
import { UserFont, UserKeyringList, UserNickname } from '../../../recoil/atom';
import { getFontName, getFontStyle } from '../../../util/getFont';
import LongButtom from '../../common/button/LongButton';
import Header from '../../common/Header';
import KeyringList from './Keyring/KeyringList';
import NickNameSetting from './NickNameSetting';

const MyProfile = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useRecoilState(UserNickname);
  const [font, setFont] = useRecoilState(UserFont);
  const [keyringList, setKeyringList] = useRecoilState(UserKeyringList);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fontStyle = getFontStyle(font);
  const fontName = getFontName(font);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setNickname(data.nickname);
      setFont(data.font);
      setKeyringList(data.keyrings);
      setIsLoading(false);
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

  const BuyKeyringCard = () => {
    return (
      <StBuyCard>
        <h2>아직 키링이 없어요! </h2>
        <StImageWrapper src={BirdImg} />
        <LongButtom btnName="키링 사러가기" onClick={handleGoBuyKeyring} />
      </StBuyCard>
    );
  };

  const handleGoBuyKeyring = () => {
    navigate('/purchase');
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
            <IcArrowRight
              style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={handleChangeFont}
            />
          </FontPreviewBox>
          <br />
          <Title>
            키링
            <IcSetting
              style={{
                position: 'absolute',
                right: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
              }}
              onClick={handleKeyringSetting}
            />
          </Title>
          {isLoading ? null : keyringList && keyringList.length > 0 ? (
            <KeyringList keyringList={keyringList} toggleFavorite={handleToggleFavorite} />
          ) : (
            <BuyKeyringCard />
          )}
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
  position: relative;
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
  position: relative;
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

const StBuyCard = styled.div`
  width: 90%;
  height: 40rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h2 {
    color: ${({ theme }) => theme.colors.MainRed};
    ${({ theme }) => theme.fonts.Title2};
  }

  p {
    color: ${({ theme }) => theme.colors.Gray2};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StImageWrapper = styled.img`
  width: 20rem;
  padding: 2rem;
`;
