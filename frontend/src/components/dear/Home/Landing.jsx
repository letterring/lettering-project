import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getUnreadMessage } from '/src/apis/dear';
import { getHighImage } from '/src/apis/dear';

import { getCustomMessage } from '../../../apis/dear';
import OBJViewer from './OBJViewer';

const Landing = () => {
  const navigate = useNavigate();
  const [newLetter, setNewLetter] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(''); //편지 메인 사진(봉투 애니메이션용)

  useEffect(() => {
    const fetchData = async () => {
      await fetchCustomMessage();
      await fetchUnreadMessage();
    };

    fetchData();
  }, []);

  const fetchUnreadMessage = async () => {
    const data = await getUnreadMessage();
    if (data?.exist) {
      setNewLetter(true);
      setMessageInfo(data);
    }
  };

  const fetchCustomMessage = async () => {
    const data = await getCustomMessage();
    setText(data.customMessage ?? '새로운 메세지가 도착했어요!');
    setIsLoading(false);
  };

  const handleNewLetterClick = () => {
    if (!messageInfo) return;

    const { messageId, designType, sealingWaxId } = messageInfo;

    if (sealingWaxId === 1) {
      navigate(`/dear/postcard/${messageId}`, {
        state: { imageUrl },
      });
    } else if (sealingWaxId === 2) {
      navigate(`/dear/letter/${messageId}`, {
        state: { imageUrl },
      });
    } else if (sealingWaxId === 3) {
      navigate(`/dear/letter/congrats/${messageId}`, {
        state: { imageUrl },
      });
    } else {
      navigate('/dear/home'); // fallback
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      if (!messageInfo?.messageId) return;
      const data = await getHighImage(messageInfo.messageId);
      if (data?.imageHighUrl) {
        setImageUrl(data.imageHighUrl);
      }
    };

    fetchImage();
  }, [messageInfo]);

  const handleMissedClick = () => {
    navigate('/dear/home');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <StHomeWrapper>
      <div>
        <OBJViewer
          objPath="/models/postbox.obj"
          mtlPath="/models/postbox.mtl"
          envelopeObjPath="/models/envelope.obj"
          envelopeMtlPath="/models/envelope.mtl"
          newLetter={newLetter}
          onMissedClick={newLetter ? handleNewLetterClick : handleMissedClick}
          text={text}
        />
      </div>
    </StHomeWrapper>
  );
};

export default Landing;

const StHomeWrapper = styled.div`
  background-color: white;
`;
