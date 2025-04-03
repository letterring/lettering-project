import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getUnreadMessage } from '/src/apis/dear';
import { getHighImage } from '/src/apis/dear';

import OBJViewer from './OBJViewer';

const Landing = () => {
  const navigate = useNavigate();
  const [newLetter, setNewLetter] = useState(false);
  const [messageInfo, setMessageInfo] = useState(null);
  // const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState(''); //편지 메인 사진(봉투 애니메이션용용)

  useEffect(() => {
    const fetchUnreadMessage = async () => {
      const data = await getUnreadMessage();
      if (data?.exist) {
        setNewLetter(true);
        setMessageInfo(data);
      }
    };

    fetchUnreadMessage();
  }, []);

  const handleNewLetterClick = () => {
    if (!messageInfo) return;

    const { messageId, designType } = messageInfo;

    if (designType === 'POSTCARD') {
      navigate(`/dear/postcard/${messageId}`, {
        state: { imageUrl },
      });
    } else if (designType === 'LETTER') {
      navigate(`/dear/letter/${messageId}`);
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
          text="새로운 메세지가 도착했어요!"
        />
      </div>
    </StHomeWrapper>
  );
};

export default Landing;

const StHomeWrapper = styled.div`
  background-color: white;
`;
