import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OBJViewer from './OBJViewer';

const Landing = () => {
  const navigate = useNavigate();
  const messageId = 10;

  const [newLetter, setNewLetter] = useState(true);

  const handleNewLetterClick = () => {
    navigate(`/dear/postcard/${messageId}`);
  };

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
        />
      </div>
    </StHomeWrapper>
  );
};

export default Landing;

const StHomeWrapper = styled.div`
  background-color: white;
`;
