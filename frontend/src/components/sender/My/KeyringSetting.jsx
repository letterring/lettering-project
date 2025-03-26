import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { UserKeyringList } from '../../../recoil/userInfo';
import Header from '../../common/Header';
import ConfirmModal from '../../common/modal/ConfirmModal';
import KeyringItem from './KeyringItem';

const KeyringSetting = () => {
  const [keyrings, setKeyrings] = useRecoilState(UserKeyringList);
  const [editingId, setEditingId] = useState(null); // 하나만 수정 가능
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const toggleFavorite = (id) => {
    console.log(`[즐겨찾기 토글] keyringId: ${id}`);

    setKeyrings((prev) =>
      prev.map((k) => (k.keyringId === id ? { ...k, favorite: !k.favorite } : k)),
    );

    // TODO: 즐겨찾기 상태 서버에 반영
  };

  const handleDeleteClick = (id) => {
    console.log(`[삭제 클릭] keyringId: ${id}`);

    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`[삭제 확정] keyringId: ${deleteTargetId}`);

    setKeyrings((prev) => prev.filter((k) => k.keyringId !== deleteTargetId));
    setIsModalOpen(false);
    setDeleteTargetId(null);

    // TODO: 키링 삭제 요청
  };

  const cancelDelete = () => {
    console.log('[삭제 취소]');

    setIsModalOpen(false);
    setDeleteTargetId(null);
  };

  const handleNameChange = (id, newName) => {
    console.log(`[이름 수정] keyringId: ${id}, 새 이름: ${newName}`);

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
          <CancelButton onClick={cancelDelete}>취소</CancelButton>
          <ConfirmButton onClick={confirmDelete}>삭제</ConfirmButton>
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
