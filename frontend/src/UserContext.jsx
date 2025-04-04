/* eslint-disable reactRefresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) return;

    const fetchUser = async () => {
      try {
        const res = await getUserData();
        setUser(res);
      } catch (e) {
        setUser(null);
      } finally {
        setHasFetched(true);
      }
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
