import React, { useState } from 'react';
import styled from 'styled-components';

import { IcCheckCircle, IcPen, IcStar, IcTrash } from '../../../assets/icons';

const KeyringItem = ({
  keyring,
  isEditing,
  onStartEdit,
  onToggleFavorite,
  onDelete,
  onChangeName,
}) => {
  const [newName, setNewName] = useState(keyring.name);

  const handleSave = () => {
    onChangeName(keyring.id, newName);
  };

  return (
    <StItemWrapper $isEditing={isEditing}>
      <IdText>키링 ID : {keyring.id}</IdText>
      <SettingBox>
        <IcStar
          style={{ color: keyring.isFaivorite ? '#FFD600' : '#D3D3D3' }}
          onClick={() => onToggleFavorite(keyring.id)}
        />
        {isEditing ? (
          <NameInput value={newName} onChange={(e) => setNewName(e.target.value)} />
        ) : (
          <NameText>{keyring.name}</NameText>
        )}
        <IconWrapper>
          {isEditing ? (
            <IcCheckCircle onClick={handleSave} style={{ cursor: 'pointer' }} />
          ) : (
            <IcPen onClick={onStartEdit} style={{ cursor: 'pointer' }} />
          )}
          <IcTrash onClick={() => onDelete(keyring.id)} style={{ cursor: 'pointer' }} />
        </IconWrapper>
      </SettingBox>
    </StItemWrapper>
  );
};

export default KeyringItem;

const StItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray3};
  width: auto;
  height: auto;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
  border: ${({ $isEditing, theme }) => ($isEditing ? `1.5px solid ${theme.colors.Red1}` : 'none')};
`;
const IdText = styled.div`
  color: ${({ theme }) => theme.colors.Gray3};
  ${({ theme }) => theme.fonts.Body2};
`;

const SettingBox = styled.div`
  color: ${({ theme }) => theme.colors.Gray0};
  ${({ theme }) => theme.fonts.Saeum2};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
`;

const NameText = styled.span`
  flex: 1;
  font: inherit;
  width: 100%;
`;

const NameInput = styled.input`
  flex: 1;
  outline: none;
  background: transparent;
  font: inherit;
  width: 100%;
  border: none;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
