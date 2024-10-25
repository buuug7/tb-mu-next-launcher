import { createContext, useEffect, useMemo, useState } from 'react';
import { getDefaultServer } from '../util';
import { SERVERS } from '../config';
import { getMyData } from './api';
import useMySession from './use-my-session';
import useErrorHandler from './use-error-handle';

export const UserContext = createContext({
  user: null,
  notifyUserDataChange: () => {},
  defaultServer: SERVERS[0],
});

export default function UserProvider({ children }) {
  const session = useMySession();
  const [defaultServer, setDefaultServer] = useState(SERVERS[0]);
  const [user, setUser] = useState();
  const errorHandler = useErrorHandler();

  useEffect(() => {
    setDefaultServer(getDefaultServer());
  }, []);

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

    getMyData().then(({ data }) => {
      setUser(data);
    });
  };

  const value = {
    user: user,
    notifyUserDataChange: handleUserDataChange,
    defaultServer: defaultServer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
