import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

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

  const toggleFavorite = (id) => {
    setKeyrings((prev) =>
      prev.map((k) => (k.keyringId === id ? { ...k, favorite: !k.favorite } : k)),
    );

    // TODO: 즐겨찾기 상태 서버에 반영
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setKeyrings((prev) => prev.filter((k) => k.keyringId !== deleteTargetId));
    setIsModalOpen(false);
    setDeleteTargetId(null);

    // TODO: 키링 삭제 요청
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleNameChange = (id, newName) => {
    setKeyrings((prev) =>
      prev.map((k) => (k.keyringId === id ? { ...k, keyringName: newName } : k)),
    );
    setEditingId(null);

    // TODO: 이름 변경 요청 (body에 newName 포함)
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
  padding: 5rem;
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
