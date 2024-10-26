import { createContext, useEffect, useState } from 'react';
import { getDefaultServer } from '../util';
import { getMyData } from './api';
import useMySession from './use-my-session';
import useErrorHandler from './use-error-handle';

export const UserContext = createContext({
  user: null,
  notifyUserDataChange: () => {},
});

export default function UserProvider({ children }) {
  const session = useMySession();
  const [user, setUser] = useState();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    if (!session) {
      return;
    }

    getMyData(session)
      .then(({ data }) => setUser(data))
      .catch(errorHandler);
  }, [session, errorHandler]);

  const handleUserDataChange = (event) => {
    if (event && event.clean) {
      setUser(null);
      return;
    }

    getMyData(session)
      .then(({ data }) => setUser(data))
      .catch(errorHandler);
  };

  const value = {
    user: user,
    notifyUserDataChange: handleUserDataChange,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
