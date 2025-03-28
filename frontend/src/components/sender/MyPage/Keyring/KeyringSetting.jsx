import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  deleteKeyring,
  getKeyringList,
  toggleKeyringFavoirite,
  updateKeyringName,
} from '../../../../apis/mypage';
import { UserKeyringList } from '../../../../recoil/userInfo';
import CancelButton from '../../../common/button/CancelButton';
import ConfirmButton from '../../../common/button/ConfirmButton';
import Header from '../../../common/Header';
import ConfirmModal from '../../../common/modal/ConfirmModal';
import KeyringItem from './KeyringItem';

const KeyringSetting = () => {
  const [keyrings, setKeyrings] = useRecoilState(UserKeyringList);
  const [editingId, setEditingId] = useState(null); // 하나만 수정 가능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    const fetchKeyrings = async () => {
      const keyringList = await getKeyringList();

      const formatted = keyringList.map((k) => ({
        ...k,
        keyringName: k.nfcName,
      }));

      setKeyrings(formatted);
    };

    fetchKeyrings();
  }, []);

  const toggleFavorite = async (keyringId) => {
    const prevKeyrings = [...keyrings];

    setKeyrings((prev) =>
      prev.map((k) => (k.keyringId === keyringId ? { ...k, favorite: !k.favorite } : k)),
    );

    const result = await toggleKeyringFavoirite({ keyringId });

    if (!result) {
      setKeyrings(prevKeyrings);
    }
  };

  const handleDeleteClick = (keyringId) => {
    setDeleteTargetId(keyringId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const prevKeyrings = [...keyrings];

    setKeyrings((prev) => prev.filter((k) => k.keyringId !== deleteTargetId));
    setIsModalOpen(false);
    setDeleteTargetId(null);

    const result = await deleteKeyring({ keyringId: deleteTargetId });

    if (!result) {
      setKeyrings(prevKeyrings);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleNameChange = async (id, newName) => {
    const prevKeyrings = [...keyrings];

    setKeyrings((prev) =>
      prev.map((k) => (k.keyringId === id ? { ...k, keyringName: newName } : k)),
    );
    setEditingId(null);

    const result = await updateKeyringName({ keyringId: id, newName });

    if (!result) {
      setKeyrings(prevKeyrings);
    }
  };

  return (
    <StKeyringSettingWrapper>
      <Header headerName="마이페이지" />
      <Title>키링 설정</Title>
      {keyrings.map((keyring) => (
        <KeyringItem
          key={keyring.keyringId}
          keyring={keyring}
          isEditing={editingId === keyring.keyringId}
          onStartEdit={() => setEditingId(keyring.keyringId)}
          onToggleFavorite={toggleFavorite}
          onDelete={handleDeleteClick}
          onChangeName={handleNameChange}
        />
      ))}
      <ConfirmModal title="정말 삭제하시겠습니까?" isOpen={isModalOpen} onClose={cancelDelete}>
        <ModalButtons>
          <CancelButton onClick={cancelDelete} btnName="취소" />
          <ConfirmButton onClick={confirmDelete} btnName="삭제" />
        </ModalButtons>
      </ConfirmModal>
    </StKeyringSettingWrapper>
  );
};

export default KeyringSetting;

const StKeyringSettingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 6rem 2rem;
  gap: 1rem;
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem 2rem;
  gap: 2rem;
`;
