import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OBJViewer from './OBJViewer';

const Landing = () => {
  const navigate = useNavigate();

  const [newLetter, setNewLetter] = useState(true);

  const handleNewLetterClick = () => {
    navigate('/dear/postcard');
  };

  const handleMissedClick = () => {
    navigate('/dear/home');
  };

  return (
    <StHomeWrapper>
      <div>
        <OBJViewer
          objPath="/src/assets/models/postbox.obj"
          mtlPath="/src/assets/models/postbox.mtl"
          envelopeObjPath="/src/assets/models/envelope.obj"
          envelopeMtlPath="/src/assets/models/envelope.mtl"
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
