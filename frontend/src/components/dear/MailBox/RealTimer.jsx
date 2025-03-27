import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getCountdown } from '../../../util/getTimer';

const RealTimer = ({ msg }) => {
  const [countdown, setCountdown] = useState(getCountdown(msg.conditionTime));

  useEffect(() => {
    const target = new Date(msg.conditionTime).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (now >= target) {
        clearInterval(interval);
        return;
      }
      setCountdown(getCountdown(msg.conditionTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [msg.conditionTime]);

  return <TimerText>{countdown}</TimerText>;
};

export default RealTimer;

const TimerText = styled.p`
  ${({ theme }) => theme.fonts.EduBody0};
  color: white;
  text-align: center;
`;
