import React, { useState } from 'react';
import styled from 'styled-components';

import ConfirmModal from '../../common/modal/ConfirmModal';
import KeyringItem from './KeyringItem';

const keyringList = [
  {
    id: 1,
    name: '우체통1',
    lastDate: 1,
    sentMailCount: 3,
    sentTimerMailCount: 2,
    sentAlarmMailCount: 1,
    setSecretMailCount: 1,
    isFaivorite: true,
  },
  {
    id: 2,
    name: '우체통2',
    lastDate: 2,
    sentMailCount: 33,
    sentTimerMailCount: 21,
    sentAlarmMailCount: 13,
    setSecretMailCount: 12,
    isFaivorite: false,
  },
];

const KeyringSetting = () => {
  const [keyrings, setKeyrings] = useState(keyringList);
  const [editingId, setEditingId] = useState(null); // ✔ 하나만 수정 가능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const toggleFavorite = (id) => {
    setKeyrings((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isFaivorite: !k.isFaivorite } : k)),
    );
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setKeyrings((prev) => prev.filter((k) => k.id !== deleteTargetId));
    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleNameChange = (id, newName) => {
    setKeyrings((prev) => prev.map((k) => (k.id === id ? { ...k, name: newName } : k)));
    setEditingId(null); // 수정 완료하면 종료
  };

  return (
    <StKeyringSettingWrapper>
      <Title>키링 설정</Title>
      {keyrings.map((keyring) => (
        <KeyringItem
          key={keyring.id}
          keyring={keyring}
          isEditing={editingId === keyring.id}
          onStartEdit={() => setEditingId(keyring.id)}
          onToggleFavorite={toggleFavorite}
          onDelete={handleDeleteClick}
          onChangeName={handleNameChange}
        />
      ))}
      <ConfirmModal title="정말 삭제하시겠습니까?" isOpen={isModalOpen} onClose={cancelDelete}>
        <ModalButtons>
          <CancelButton onClick={cancelDelete}>취소</CancelButton>
          <ConfirmButton onClick={confirmDelete}>삭제</ConfirmButton>
        </ModalButtons>
      </ConfirmModal>
    </StKeyringSettingWrapper>
  );
};

export default KeyringSetting;

const StKeyringSettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 1rem 0 2rem;
  gap: 2rem;
`;

const ConfirmButton = styled.button`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Red2};
  ${({ theme }) => theme.fonts.Title4};
  color: ${({ theme }) => theme.colors.White};
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.Gray6};
  color: ${({ theme }) => theme.colors.Gray2};
  ${({ theme }) => theme.fonts.Title4};
  border: none;
  cursor: pointer;
`;
