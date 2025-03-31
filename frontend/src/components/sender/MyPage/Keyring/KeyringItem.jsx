import React, { useState } from 'react';
import styled from 'styled-components';

import { IcCheckCircle, IcPen, IcStar, IcTrash } from '../../../../assets/icons';

const KeyringItem = ({
  keyring,
  isEditing,
  onStartEdit,
  onToggleFavorite,
  onDelete,
  onChangeName,
}) => {
  const { tagCode, favorite, keyringId, keyringName } = keyring;
  const [newName, setNewName] = useState(keyringName);
  const [showWarning, setShowWarning] = useState(false);

  const handleSave = () => {
    onChangeName(keyringId, newName);
    setShowWarning(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const length = [...value].length;

    if (length <= 5) {
      setNewName(value);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <StItemWrapper $isEditing={isEditing}>
      <IdText>키링 ID : {tagCode}</IdText>
      <SettingBox>
        <IcStar
          style={{ color: favorite ? '#FFD600' : '#D3D3D3' }}
          onClick={() => onToggleFavorite(keyringId)}
        />
        {isEditing ? (
          <div style={{ flex: 1 }}>
            <NameInput value={newName} onChange={handleChange} />
            {showWarning && <WarningText>최대 5글자까지만 입력할 수 있어요</WarningText>}
          </div>
        ) : (
          <NameText>{keyringName}</NameText>
        )}
        <IconWrapper>
          {isEditing ? (
            <IcCheckCircle onClick={handleSave} style={{ cursor: 'pointer' }} />
          ) : (
            <IcPen onClick={onStartEdit} style={{ cursor: 'pointer' }} />
          )}
          <IcTrash onClick={() => onDelete(keyringId)} style={{ cursor: 'pointer' }} />
        </IconWrapper>
      </SettingBox>
    </StItemWrapper>
  );
};

export default KeyringItem;

const StItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray3};
  width: 100%;
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
  ${({ theme }) => theme.fonts.Saeum2};
  width: 100%;
`;

const NameInput = styled.input`
  flex: 1;
  outline: none;
  background: transparent;
  ${({ theme }) => theme.fonts.Saeum2};
  width: 100%;
  border: none;
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const WarningText = styled.div`
  color: ${({ theme }) => theme.colors.Red1};
  ${({ theme }) => theme.fonts.Body2};
  margin-top: 0.25rem;
  padding-left: 0.25rem;
`;
