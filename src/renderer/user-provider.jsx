import { createContext, useEffect, useState } from 'react';
import { getDefaultServer } from '../util';
import { SERVERS } from '../config';
import { getMyData } from './api';
import useUserData from './use-user-data';

export const UserContext = createContext({
  user: null,
  notifyUserDataChange: () => {},
  message: '',
  updateMessage: () => {},
  defaultServer: SERVERS[0],
});

export default function UserProvider({ children }) {
  const [message, setMessage] = useState('');
  const [defaultServer, setDefaultServer] = useState(SERVERS[0]);
  const [user, setUser] = useUserData();

  useEffect(() => {
    setDefaultServer(getDefaultServer());
  }, []);

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
    message: message,
    updateMessage: setMessage,
    defaultServer: defaultServer,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
