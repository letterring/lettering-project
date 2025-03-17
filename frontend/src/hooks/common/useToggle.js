//훅 사용 잘 모르겠다면 물어보기!!

import { useState } from 'react';

const useToggle = (initialValue) => {
  const [toggle, setToggle] = useState(initialValue);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return { toggle, setToggle, handleToggle };
};

export default useToggle;
